const { supabase } = require("../supabaseClient");

exports.addVisitedCountry = async (userId, countryCode) => {
  const { data, error } = await supabase
    .from("visited_countries")
    .insert([{ user_id: userId, country_code: countryCode }]);

  if (error) throw error;
  return data;
};

exports.getVisitedCountries = async (userId) => {
  const { data, error } = await supabase
    .from("visited_countries")
    .select("country_code")
    .eq("user_id", userId);

  if (error) throw error;
  return data;
};

exports.removeVisitedCountry = async (userId, countryCode) => {
  const { data, error } = await supabase
    .from("visited_countries")
    .delete()
    .eq("user_id", userId)
    .eq("country_code", countryCode);

  if (error) throw error;
  return data;
};
