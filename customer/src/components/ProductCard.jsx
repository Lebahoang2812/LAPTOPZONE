import { ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";

function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem("laptopzone_cart") || "[]");
  const found = cart.find((x) => x.product_id === product.id);
  if (found) found.quantity += 1;
  else {
    cart.push({
      product_id: product.id,
      name: product.name,
      image_url: product.image_url,
      price: Number(product.price),
      quantity: 1
    });
  }
  localStorage.setItem("laptopzone_cart", JSON.stringify(cart));
  window.dispatchEvent(new Event("cart-updated"));
  alert("Đã thêm sản phẩm vào giỏ hàng.");
}

export default function ProductCard({ product, hot = false }) {
  const price = Number(product.price || 0);
  const oldPrice = Number(product.old_price || 0);
  const percent = oldPrice > price ? Math.round((1 - price / oldPrice) * 100) : 0;

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <div className="tag-row">
          <span className="sale-tag">{hot ? "Bán Chạy" : "Flash Sale"}</span>
          {hot && <span className="sale-tag blue">Bán Chạy</span>}
        </div>
        <Link to={`/products/${product.id}`}>
          <img src={product.image_url || "https://placehold.co/500x500?text=Laptop"} alt={product.name}/>
        </Link>
      </div>
      <div className="product-content">
        <span className="brand">{product.brand || "LAPTOP"}</span>
        <Link to={`/products/${product.id}`} className="product-name">{product.name}</Link>
        <p className="spec-line">{product.cpu || "Core i5"} | {product.ram || "16GB"} | {product.storage || "512GB"} | {product.gpu || "RTX"} ...</p>
        <div className="rating"><Star size={13} fill="#f4ad17"/><Star size={13} fill="#f4ad17"/><Star size={13} fill="#f4ad17"/><Star size={13} fill="#f4ad17"/><Star size={13} fill="#f4ad17"/> <span>(24 đánh giá)</span></div>
        {oldPrice > price && <div className="old-price">{oldPrice.toLocaleString("vi-VN")} đ <span>-{percent}%</span></div>}
        <div className="price">{price.toLocaleString("vi-VN")} đ</div>
        <button className="add-btn" onClick={() => addToCart(product)}><ShoppingCart size={16}/> Thêm giỏ hàng</button>
      </div>
    </article>
  );
}
