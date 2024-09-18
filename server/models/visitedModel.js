const { supabase } = require("../supabaseClient");

exports.addVisitedCountry = async (userId, countryCode) => {
  const { data, error } = await supabase
    .from("visited_countries")
    .insert([{ user_id: userId, country_code: countryCode }]);

  if (error) throw error;
  return data;
};
