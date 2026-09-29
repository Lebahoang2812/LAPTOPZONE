import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SECRET_KEY;

console.log("SUPABASE_URL:", supabaseUrl ? "OK" : "THIEU");
console.log("SUPABASE_SECRET_KEY:", supabaseKey ? "OK" : "THIEU");

if (!supabaseUrl) {
    throw new Error("Thiếu SUPABASE_URL trong server/.env");
}

if (!supabaseKey) {
    throw new Error("Thiếu SUPABASE_SECRET_KEY trong server/.env");
}

const supabase = createClient(
    supabaseUrl,
    supabaseKey
);

export default supabase;