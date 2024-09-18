const { supabase } = require("../supabaseClient");

exports.addWantToVisitCountry = async (userId, countryCode) => {
  const { data, error } = await supabase
    .from("want_to_visit_countries")
    .insert([{ user_id: userId, country_code: countryCode }]);

  if (error) throw error;
  return data;
};

exports.getWantToVisitCountry = async (userId) => {
  const { data, error } = await supabase
    .from("want_to_visit_countries")
    .select("country_code")
    .eq("user_id", userId);

  if (error) throw error;
  return data;
};

exports.removeWantToVisitCountry = async (userId, countryCode) => {
  const { data, error } = await supabase
    .from("want_to_visit_countries")
    .delete()
    .eq("user_id", userId)
    .eq("country_code", countryCode);

  if (error) throw error;
  return data;
};
