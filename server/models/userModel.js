const { supabase } = require("../supabaseClient");

exports.createUser = async (email, username, displayName, avatar) => {
  const { data, error } = await supabase
    .from("users")
    .insert([{ email, username, display_name: displayName, avatar }]);

    if (error) throw error;
    return data
};

