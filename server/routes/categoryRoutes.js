import express from "express";
import supabase from "../config/supabase.js";
import { requireAuth,requireAdmin } from "../middleware/authMiddleware.js";

const router=express.Router();

router.get("/",async(req,res)=>{
  const {data,error}=await supabase.from("categories").select("id,name,description,image_url,created_at").order("name");
  if(error)return res.status(500).json({message:error.message});
  const result=[];
  for(const c of data){
    const {count}=await supabase.from("products").select("id",{count:"exact",head:true}).eq("category_id",c.id);
    result.push({...c,product_count:count||0});
  }
  res.json(result);
});

router.post("/",requireAuth,requireAdmin,async(req,res)=>{
  const {data,error}=await supabase.from("categories").insert({name:req.body.name,description:req.body.description||""}).select("*").single();
  if(error)return res.status(400).json({message:error.message});
  res.status(201).json(data);
});

export default router;
