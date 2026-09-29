import supabase from "../config/supabase.js";

export async function listCustomers(req,res){
  const {data,error}=await supabase.from("customers").select("id,full_name,email,phone,address,role,status,created_at").order("created_at",{ascending:false});
  if(error)return res.status(500).json({message:error.message});
  res.json(data);
}
export async function getCustomer(req,res){
  const {data,error}=await supabase.from("customers").select("id,full_name,email,phone,address,role,status,created_at").eq("id",req.params.id).single();
  if(error)return res.status(404).json({message:"Không tìm thấy khách hàng"});
  res.json(data);
}
export async function updateCustomer(req,res){
  const {data,error}=await supabase.from("customers").update(req.body).eq("id",req.params.id).select("id,full_name,email,phone,address,role,status,created_at").single();
  if(error)return res.status(400).json({message:error.message});
  res.json(data);
}
export async function deleteCustomer(req,res){
  const {error}=await supabase.from("customers").delete().eq("id",req.params.id);
  if(error)return res.status(400).json({message:error.message});
  res.json({message:"Đã xóa khách hàng"});
}
