const { supabase } = require("../supabaseClient");

exports.createUser = async (email, username, displayName, avatar) => {
  const { data, error } = await supabase
    .from("users")
    .insert([{ email, username, display_name: displayName, avatar }]);

  if (error) throw error;
  return data;
};

exports.getUserById = async (userId) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw error;
  return data;
};

exports.updateUser = async (userId, updates) => {
  const { data, error } = await supabase
    .from("users")
    .update(updates)
    .eq("id", userId);

  if (error) throw error;
  return data;
};

exports.deleteUser = async (userId) => {
  const { data, error } = await supabase
    .from("users")
    .delete()
    .eq("id", userId);

  if (error) throw error;
  return data;
};
