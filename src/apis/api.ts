const mykey = "8MPGBweb7TMDYqjevQk1Z1ycmAF8fit6";
const autoCompleteTextUrl =
  "http://dataservice.accuweather.com/locations/v1/cities/autocomplete";
const fiveDaysForecast =
  "http://dataservice.accuweather.com/forecasts/v1/daily/5day";
const currConditionLink =
  "http://dataservice.accuweather.com/currentconditions/v1";

const defoultLocation =
  "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search";

const customFetch = (url: string) => {
  return fetch(url).then((res) => {
    return res.ok ? res.json() : Promise.reject(res.statusText);
  });
};

export const getAutoCompleteCities = (text: string) => {
  return customFetch(`${autoCompleteTextUrl}?q=${text}&apikey=${mykey}`);
};

export const getCurrentWeather = (key: string) => {
  return customFetch(`${currConditionLink}/${key}?apikey=${mykey}`);
};

export const getFiveDaysForecast = (cityKey: string) => {
  return customFetch(`${fiveDaysForecast}/${cityKey}?apikey=${mykey}`);
};

export const getMyLocation = (lat: string, lon: string) => {
  return customFetch(`${defoultLocation}?q=${lat},${lon}&apikey=${mykey}`);
};
