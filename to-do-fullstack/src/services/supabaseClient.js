import { createClient } from "@supabase/supabase-js";

const supabaseAnonKey = import.meta.env.VITE_SUPABASE_API_KEY;
const supabaseURL = import.meta.env.VITE_SUPABASE_URL;

export const supabase = createClient(supabaseURL, supabaseAnonKey);  