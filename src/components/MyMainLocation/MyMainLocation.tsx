import { useDispatch, useSelector } from "react-redux";
import Card from "../Card/Card";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import {
  getDayName,
  getDescription,
  toggleTemperature,
} from "../utils/functions";
import {
  IdailyForecast,
  IGeoPositionData,
  IStore,
  TemPeratureType,
} from "../utils/Interfaces";
import appSlice from "../App/appState";
import { getMyLocation } from "../../apis/api";

type LocationProps = {
  fetchCityWeatherInfo: (selectedCityKey: string) => void;
};

const Location = ({ fetchCityWeatherInfo }: LocationProps) => {
  const dispatch = useDispatch();
  const [isCityFavourite, setIsCityFavourite] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");

  const currWeatherData = useSelector(
    (state: IStore) => state.app.currCityData[0]
  );

  const mainCityKey = useSelector((state: IStore) => state.app.currCityKey);
  const favouriteCities = useSelector(
    (state: IStore) => state.app.favouriteCities
  );
  const themeMode = useSelector((state: IStore) => state.app.themeMode);
  const fiveWeatherForecast = useSelector(
    (state: IStore) => state.app.dailyForecasts
  );
  const currCityName = useSelector((state: IStore) => state.app.currCityName);
  const isFavouriteCicked = useSelector(
    (state: IStore) => state.app.isFavouriteClicked
  );
  const currTemperatureUnit = useSelector(
    (state: IStore) => state.app.temperUnits[state.app.currTempUnitIndex]
  );
  const temperatureValue = toggleTemperature(
    currWeatherData.Temperature[currTemperatureUnit],
    currTemperatureUnit
  ).Value;

  const temperatureUnit = toggleTemperature(
    currWeatherData.Temperature[currTemperatureUnit],
    currTemperatureUnit
  ).Unit;

  const setCoordinates = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude.toString());
      setLon(position.coords.longitude.toString());
    });
  };

  useEffect(() => {
    setCoordinates();
    if (!isFavouriteCicked) {
      getMyLocation(lat, lon)
        .then((res: IGeoPositionData) => {
          dispatch(appSlice.actions.setCurrCityName(res.LocalizedName));
          fetchCityWeatherInfo(res.Key);
        })
        .catch((err) => {
          toast.error(`Error: ${err.message}`);
          console.log(err);
        });
    }
  }, [lat, lon]);

  const addToFavourites = () => {
    dispatch(
      appSlice.actions.addToFavourites({
        key: mainCityKey,
        val: { currWeatherData, fiveWeatherForecast },
      })
    );
    setIsCityFavourite("location__btn_saved");
  };

  const removeFromFavourites = () => {
    setIsCityFavourite("");
    dispatch(appSlice.actions.deleteFromFavourites(mainCityKey));
  };

  const toggleFavouritCity = () => {
    if (!isCityFavourite) {
      addToFavourites();
    } else {
      removeFromFavourites();
    }
  };

  const renderFiveWeatherForecast = () => {
    return fiveWeatherForecast?.map((weather: IdailyForecast, i: number) => {
      const minTemp = toggleTemperature(
        weather.Temperature.Minimum,
        currTemperatureUnit
      ).Value;
      const maxTemp = toggleTemperature(
        weather.Temperature.Maximum,
        currTemperatureUnit
      ).Value;
      const d = new Date(weather.Date);
      return (
        <Card
          key={i}
          title={getDayName(d)}
          unit={currTemperatureUnit === "Metric" ? "C" : "F"}
          minTemp={minTemp}
          maxTemp={maxTemp}
          className="location__card"
          tempDescription={getDescription(
            d,
            weather.Day,
            weather.Night
          ).toString()}
        />
      );
    });
  };

  const checkIfCityFavourite = () => {
    if (mainCityKey in favouriteCities) {
      setIsCityFavourite("location__btn_saved");
    }
  };

  useEffect(() => {
    checkIfCityFavourite();
  }, []);

  return (
    <section className="location">
      <div className="location__title-wrapper">
        <h1 className="location__title">{currCityName}</h1>
        <button
          className={`location__btn location__btn_${themeMode} ${isCityFavourite} ${isCityFavourite}_${themeMode}`}
          type="button"
          onClick={toggleFavouritCity}
        ></button>
      </div>

      <h3 className="location__subtitle">
        {temperatureValue}
        {temperatureUnit}
        <br />
        <span className="location__weather-description">
          {currWeatherData.WeatherText}
        </span>
      </h3>

      <div className="cards-container">{renderFiveWeatherForecast()}</div>
    </section>
  );
};
export default Location;
