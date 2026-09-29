create extension if not exists pgcrypto;

create table if not exists categories (
  id bigserial primary key,
  name varchar(150) not null unique,
  description text,
  image_url text,
  created_at timestamptz default now()
);

create table if not exists products (
  id bigserial primary key,
  name varchar(255) not null,
  sku varchar(100) not null unique,
  brand varchar(100),
  category_id bigint references categories(id) on delete set null,
  price numeric(15,2) not null default 0,
  old_price numeric(15,2) default 0,
  stock int not null default 0,
  image_url text,
  description text,
  cpu varchar(255),
  ram varchar(255),
  storage varchar(255),
  gpu varchar(255),
  screen varchar(255),
  battery varchar(255),
  weight varchar(100),
  os varchar(255),
  status varchar(30) default 'active',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists customers (
  id bigserial primary key,
  full_name varchar(150) not null,
  phone varchar(30),
  email varchar(150) not null unique,
  password_hash text not null,
  address text,
  role varchar(30) default 'customer',
  status varchar(30) default 'active',
  created_at timestamptz default now()
);

create table if not exists orders (
  id bigserial primary key,
  order_code varchar(50) not null unique,
  customer_id bigint references customers(id) on delete set null,
  total_amount numeric(15,2) not null default 0,
  shipping_fee numeric(15,2) default 0,
  discount numeric(15,2) default 0,
  payment_method varchar(50) not null default 'COD',
  payment_status varchar(50) not null default 'pending',
  order_status varchar(50) not null default 'processing',
  receiver_name varchar(150) not null,
  receiver_phone varchar(30) not null,
  receiver_address text not null,
  note text,
  created_at timestamptz default now()
);

create table if not exists order_items (
  id bigserial primary key,
  order_id bigint not null references orders(id) on delete cascade,
  product_id bigint not null references products(id),
  quantity int not null check (quantity > 0),
  price numeric(15,2) not null
);

create table if not exists vouchers (
  id bigserial primary key,
  code varchar(50) not null unique,
  discount_type varchar(30) not null default 'fixed',
  discount_value numeric(15,2) not null default 0,
  min_order numeric(15,2) default 0,
  usage_limit int default 0,
  used_count int default 0,
  start_date timestamptz default now(),
  end_date timestamptz,
  status varchar(30) default 'active',
  created_at timestamptz default now()
);

insert into categories(name,description) values
('Laptop Gaming','Laptop gaming hiệu năng cao'),
('Văn phòng / Sinh viên','Laptop mỏng nhẹ cho học tập và văn phòng'),
('Mỏng nhẹ cao cấp','Ultrabook cao cấp'),
('Đồ họa Kỹ thuật','Laptop cho thiết kế và đồ họa'),
('Workstation Chuyên nghiệp','Máy trạm chuyên nghiệp'),
('Laptop 2-in-1 cảm ứng','Laptop xoay gập cảm ứng')
on conflict(name) do nothing;

insert into products
(name,sku,brand,category_id,price,old_price,stock,image_url,cpu,ram,storage,gpu,screen,battery,weight,os)
values
('Laptop Gaming ASUS ROG Strix G16 G614JV-N3110W','ROG-G614JV','ASUS',
 (select id from categories where name='Laptop Gaming'),34490000,38990000,14,
 'https://images.unsplash.com/photo-1593642702749-b7d2a804fbcf?auto=format&fit=crop&w=700&q=80',
 'Intel Core i7-13650HX (14 Nhân, 20 Luồng)','16GB DDR5 4800MHz','512GB SSD M.2 PCIe Gen4',
 'NVIDIA GeForce RTX 4060 8GB GDDR6','16.0" WUXGA 1920x1200 IPS 165Hz','4-cell Li-ion, 90 Whrs','2.50 kg','Windows 11 Home'),
('Laptop Dell Inspiron 14 5430 i5-1340P','DELL-I5430','DELL',
 (select id from categories where name='Văn phòng / Sinh viên'),15990000,18490000,28,
 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=700&q=80',
 'Intel Core i5-1340P','16GB DDR5','512GB SSD','Intel Iris Xe','14.0" FHD+','54 Whrs','1.50 kg','Windows 11 Home'),
('Laptop Lenovo Legion 5 16IRX9 i7-14650HX','LEGION-16IRX9','LENOVO',
 (select id from categories where name='Laptop Gaming'),38990000,42990000,8,
 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=700&q=80',
 'Intel Core i7-14650HX','16GB DDR5','512GB SSD','NVIDIA GeForce RTX 4060 8GB','16.0" WQXGA 165Hz','80 Whrs','2.30 kg','Windows 11 Home'),
('Apple MacBook Air 13 inch M3 2024','MAC-M3-256','APPLE',
 (select id from categories where name='Mỏng nhẹ cao cấp'),24990000,27990000,0,
 'https://images.unsplash.com/photo-1517336714739-489689fd1ca8?auto=format&fit=crop&w=700&q=80',
 'Apple M3 8-core','8GB Unified Memory','256GB SSD','Integrated GPU','13.6" Liquid Retina','52.6 Whrs','1.24 kg','macOS')
on conflict(sku) do nothing;

insert into vouchers(code,discount_type,discount_value,min_order,usage_limit,status,end_date)
values('ZONE500','fixed',500000,5000000,200,'active','2026-12-31T23:59:59Z')
on conflict(code) do nothing;

insert into customers(full_name,phone,email,password_hash,role,status)
values('Trần Minh Nam','0900000000','admin@laptopzone.vn',crypt('Admin@123',gen_salt('bf')),'admin','active')
on conflict(email) do nothing;
