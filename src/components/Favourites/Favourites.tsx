import { useLocation, useNavigate } from "react-router-dom";
import FavouriteCityCard from "../FavouriteCityCard/FavouriteCityCard";
import appSlice from "../App/appState";
import { useDispatch, useSelector } from "react-redux";
import { IStore } from "../utils/Interfaces";
import { fetchNameAndKeyFromLink } from "../utils/functions";
import { useEffect } from "react";

const Favourites = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;

  useEffect(() => {
    dispatch(appSlice.actions.setCurrPage(pathName as "/" | "/favourites"));
  }, [pathName]);

  const favouriteCities = useSelector(
    (state: IStore) => state.app.favouriteCities
  );
  const currTemperatureUnit = useSelector(
    (state: IStore) => state.app.temperUnits[state.app.currTempUnitIndex]
  );

  const favouriteCityKeys = Object.keys(favouriteCities);

  const handleRemove = (cityKey: string) => {
    dispatch(appSlice.actions.deleteFromFavourites(cityKey));
  };

  const GetCityData = (cityKey: string) => {
    return [favouriteCities[cityKey].currWeatherData];
  };

  const GetFiveForecasts = (cityKey: string) => {
    return favouriteCities[cityKey].fiveWeatherForecast;
  };

  const AddToMainWeather = (cityKey: string, cityName: string) => {
    const mainCityWeather = GetCityData(cityKey);
    const fiveDailyForecast = GetFiveForecasts(cityKey);
    dispatch(appSlice.actions.setCurrCityName(cityName));
    dispatch(appSlice.actions.setCurrCityKey(cityKey));
    dispatch(appSlice.actions.setIsFavouriteClicked(true));

    dispatch(appSlice.actions.setCurrCity(mainCityWeather));
    dispatch(appSlice.actions.setDailyForecasts(fiveDailyForecast));

    navigate("/");
  };

  const renderFavouriteCities = () => {
    return favouriteCityKeys.map((favouriteCityKey) => {
      const link = favouriteCities[favouriteCityKey].currWeatherData.Link;
      const currTemperature =
        favouriteCities[favouriteCityKey].currWeatherData.Temperature[
          currTemperatureUnit
        ];

      const description =
        favouriteCities[favouriteCityKey].currWeatherData.WeatherText;

      const { cityKey, cityName } = fetchNameAndKeyFromLink(link);

      return (
        <FavouriteCityCard
          cityName={cityName}
          unit={currTemperature.Unit}
          tempDescription={description}
          value={currTemperature.Value}
          key={cityKey}
          cityKey={cityKey}
          onRemove={handleRemove}
          onAddToMain={() => AddToMainWeather(cityKey, cityName)}
        />
      );
    });
  };

  return (
    <section className="cards-container favourites">
      {renderFavouriteCities()}
    </section>
  );
};

export default Favourites;
