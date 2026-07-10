import { supabase } from "./supabaseClient";

export const fetchTasks = () => {
  return supabase
    .from("tasks")
    .select("*")
    .order("created_at", { ascending: true });
};

export const insertTask = (text) => {
  return supabase
    .from("tasks")
    .insert([{ text, done: false }])
    .select();
};

export const updateTaskDone = (id, done) => {
  return supabase.from("tasks").update({ done }).eq("id", id);
};

export const removeTask = (id) => {
  return supabase.from("tasks").delete().eq("id", id);
};
