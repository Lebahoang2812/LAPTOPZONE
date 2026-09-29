import supabase from "../config/supabase.js";

function makeCode() {
  return `LTZ-${Date.now().toString().slice(-6)}`;
}

export async function listOrders(req,res){
  let query = supabase.from("orders").select("*,customers(id,full_name,email)").order("created_at",{ascending:false});
  if(req.user.role !== "admin") query = query.eq("customer_id",req.user.id);
  const {data,error}=await query;
  if(error)return res.status(500).json({message:error.message});
  res.json(data);
}

export async function getOrder(req,res){
  let query = supabase.from("orders").select("*,order_items(*,products(name,image_url,sku,price))").eq("id",req.params.id).single();
  const {data,error}=await query;
  if(error)return res.status(404).json({message:"Không tìm thấy đơn hàng"});
  if(req.user.role !== "admin" && data.customer_id !== req.user.id) return res.status(403).json({message:"Không có quyền truy cập đơn hàng"});
  res.json(data);
}

export async function createOrder(req,res){
  const {items=[],payment_method="COD",receiver_name,receiver_phone,receiver_address,note=""}=req.body;
  if(!items.length)return res.status(400).json({message:"Giỏ hàng trống"});
  if(!receiver_name || !receiver_phone || !receiver_address)return res.status(400).json({message:"Thiếu thông tin người nhận"});

  let subtotal=0;
  const prepared=[];
  for(const item of items){
    const {data:p,error}=await supabase.from("products").select("id,name,price,stock").eq("id",item.product_id).single();
    if(error || !p)return res.status(400).json({message:`Sản phẩm ID ${item.product_id} không tồn tại`});
    const qty=Number(item.quantity);
    if(qty<1 || p.stock<qty)return res.status(400).json({message:`Sản phẩm ${p.name} không đủ tồn kho`});
    subtotal += Number(p.price)*qty;
    prepared.push({product_id:p.id,quantity:qty,price:Number(p.price)});
  }

  const discount = subtotal >= 5000000 ? 500000 : 0;
  const {data:order,error:orderError}=await supabase.from("orders").insert({
    order_code:makeCode(),
    customer_id:req.user?.id || null,
    total_amount:subtotal-discount,
    shipping_fee:0,
    discount,
    payment_method,
    payment_status:payment_method==="COD"?"pending":"pending",
    order_status:"processing",
    receiver_name,receiver_phone,receiver_address,
    note
  }).select("*").single();

  if(orderError)return res.status(500).json({message:orderError.message});

  const itemsToInsert=prepared.map(x=>({...x,order_id:order.id}));
  const {error:itemError}=await supabase.from("order_items").insert(itemsToInsert);
  if(itemError)return res.status(500).json({message:itemError.message});

  for(const item of prepared){
    const {data:p}=await supabase.from("products").select("stock").eq("id",item.product_id).single();
    if(p) await supabase.from("products").update({stock:Math.max(0,p.stock-item.quantity),updated_at:new Date().toISOString()}).eq("id",item.product_id);
  }

  res.status(201).json(order);
}

export async function updateOrderStatus(req,res){
  const allowed=["pending","processing","shipping","completed","cancelled"];
  if(!allowed.includes(req.body.status))return res.status(400).json({message:"Trạng thái không hợp lệ"});
  const {data,error}=await supabase.from("orders").update({order_status:req.body.status}).eq("id",req.params.id).select("*").single();
  if(error)return res.status(400).json({message:error.message});
  res.json(data);
}
