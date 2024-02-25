import SearchForm from "../SearchForm/SearchForm";
import Location from "../MyMainLocation/MyMainLocation";
import { useDispatch, useSelector } from "react-redux";
import appSlice from "../App/appState";
import { getCurrentWeather, getFiveDaysForecast } from "../../apis/api";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { IStore } from "../utils/Interfaces";
import { toast } from "react-toastify";

const Main = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const pathName = location.pathname;
  const cityname = useSelector((state: IStore) => state.app.currCityName);

  useEffect(() => {
    dispatch(appSlice.actions.setCurrPage(pathName as "/" | "/favourites"));
  }, [pathName]);

  const fetchCityWeatherInfo = (chosenCityKey: string) => {
    Promise.all([
      getCurrentWeather(chosenCityKey),
      getFiveDaysForecast(chosenCityKey),
    ])
      .then((values) => {
        dispatch(appSlice.actions.setCurrCity(values[0]));
        dispatch(
          appSlice.actions.setDailyForecasts(values[1]["DailyForecasts"])
        );
        dispatch(appSlice.actions.setCurrCityKey(chosenCityKey));
      })
      .catch((err) => {
        toast.error(`Error: ${err.message}`);
        console.log(err);
      });
  };

  return (
    <main className="main">
      <SearchForm fetchCityWeatherInfo={fetchCityWeatherInfo} />
      <Location fetchCityWeatherInfo={fetchCityWeatherInfo} />
    </main>
  );
};
export default Main;
