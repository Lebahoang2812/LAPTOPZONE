import { Laptop, BriefcaseBusiness, Feather, Palette, Server, Tablet } from "lucide-react";

const icons = [Laptop, BriefcaseBusiness, Feather, Palette, Server, Tablet];

export default function CategoryCard({ category, index = 0 }) {
  const Icon = icons[index % icons.length];
  return (
    <div className="category-card">
      <div className="category-icon"><Icon size={21}/></div>
      <b>{category.name}</b>
      <small>{category.product_count ?? 0} máy</small>
    </div>
  );
}
