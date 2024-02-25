import { IdailyForecast } from "./../utils/Interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInitialAppState, ICurrCityData } from "../utils/Interfaces";

const initialAppState: IInitialAppState = {
  isFavouriteClicked: false,
  currPage: "/",
  themeMode: "light",
  temperUnits: ["Metric", "Imperial"],
  currTempUnitIndex: 0,
  favouriteCities: {},
  dailyForecasts: [
    {
      Date: "2024-02-22T07:00:00+06:00",
      EpochDate: 1708563600,
      Temperature: {
        Minimum: {
          Value: 68,
          Unit: "F",
          UnitType: 18,
        },
        Maximum: {
          Value: 90,
          Unit: "F",
          UnitType: 18,
        },
      },
      Day: {
        Icon: 13,
        IconPhrase: "Mostly cloudy w/ showers",
        HasPrecipitation: true,
        PrecipitationType: "Rain",
        PrecipitationIntensity: "Heavy",
      },
      Night: {
        Icon: 37,
        IconPhrase: "Hazy moonlight",
        HasPrecipitation: false,
      },
      Sources: ["AccuWeather"],
      MobileLink:
        "http://www.accuweather.com/en/bd/dhaka/28143/daily-weather-forecast/28143?day=1&lang=en-us",
      Link: "http://www.accuweather.com/en/bd/dhaka/28143/daily-weather-forecast/28143?day=1&lang=en-us",
    },
    {
      Date: "2024-02-23T07:00:00+06:00",
      EpochDate: 1708650000,
      Temperature: {
        Minimum: {
          Value: 66,
          Unit: "F",
          UnitType: 18,
        },
        Maximum: {
          Value: 83,
          Unit: "F",
          UnitType: 18,
        },
      },
      Day: {
        Icon: 14,
        IconPhrase: "Partly sunny w/ showers",
        HasPrecipitation: true,
        PrecipitationType: "Rain",
        PrecipitationIntensity: "Light",
      },
      Night: {
        Icon: 39,
        IconPhrase: "Partly cloudy w/ showers",
        HasPrecipitation: true,
        PrecipitationType: "Rain",
        PrecipitationIntensity: "Light",
      },
      Sources: ["AccuWeather"],
      MobileLink:
        "http://www.accuweather.com/en/bd/dhaka/28143/daily-weather-forecast/28143?day=2&lang=en-us",
      Link: "http://www.accuweather.com/en/bd/dhaka/28143/daily-weather-forecast/28143?day=2&lang=en-us",
    },
    {
      Date: "2024-02-24T07:00:00+06:00",
      EpochDate: 1708736400,
      Temperature: {
        Minimum: {
          Value: 65,
          Unit: "F",
          UnitType: 18,
        },
        Maximum: {
          Value: 88,
          Unit: "F",
          UnitType: 18,
        },
      },
      Day: {
        Icon: 18,
        IconPhrase: "Rain",
        HasPrecipitation: true,
        PrecipitationType: "Rain",
        PrecipitationIntensity: "Moderate",
      },
      Night: {
        Icon: 39,
        IconPhrase: "Partly cloudy w/ showers",
        HasPrecipitation: true,
        PrecipitationType: "Rain",
        PrecipitationIntensity: "Moderate",
      },
      Sources: ["AccuWeather"],
      MobileLink:
        "http://www.accuweather.com/en/bd/dhaka/28143/daily-weather-forecast/28143?day=3&lang=en-us",
      Link: "http://www.accuweather.com/en/bd/dhaka/28143/daily-weather-forecast/28143?day=3&lang=en-us",
    },
    {
      Date: "2024-02-25T07:00:00+06:00",
      EpochDate: 1708822800,
      Temperature: {
        Minimum: {
          Value: 65,
          Unit: "F",
          UnitType: 18,
        },
        Maximum: {
          Value: 87,
          Unit: "F",
          UnitType: 18,
        },
      },
      Day: {
        Icon: 5,
        IconPhrase: "Hazy sunshine",
        HasPrecipitation: false,
      },
      Night: {
        Icon: 37,
        IconPhrase: "Hazy moonlight",
        HasPrecipitation: false,
      },
      Sources: ["AccuWeather"],
      MobileLink:
        "http://www.accuweather.com/en/bd/dhaka/28143/daily-weather-forecast/28143?day=4&lang=en-us",
      Link: "http://www.accuweather.com/en/bd/dhaka/28143/daily-weather-forecast/28143?day=4&lang=en-us",
    },
    {
      Date: "2024-02-26T07:00:00+06:00",
      EpochDate: 1708909200,
      Temperature: {
        Minimum: {
          Value: 68,
          Unit: "F",
          UnitType: 18,
        },
        Maximum: {
          Value: 88,
          Unit: "F",
          UnitType: 18,
        },
      },
      Day: {
        Icon: 2,
        IconPhrase: "Mostly sunny",
        HasPrecipitation: false,
      },
      Night: {
        Icon: 33,
        IconPhrase: "Clear",
        HasPrecipitation: false,
      },
      Sources: ["AccuWeather"],
      MobileLink:
        "http://www.accuweather.com/en/bd/dhaka/28143/daily-weather-forecast/28143?day=5&lang=en-us",
      Link: "http://www.accuweather.com/en/bd/dhaka/28143/daily-weather-forecast/28143?day=5&lang=en-us",
    },
  ],
  currCityName: "Tel-Aviv",
  currCityKey: "215854",
  currCityData: [
    {
      LocalObservationDateTime: "2024-02-23T16:22:00+02:00",
      EpochTime: 1708698120,
      WeatherText: "Cloudy",
      WeatherIcon: 7,
      HasPrecipitation: false,
      PrecipitationType: null,
      IsDayTime: true,
      Temperature: {
        Metric: {
          Value: 20.5,
          Unit: "C",
          UnitType: 17,
        },
        Imperial: {
          Value: 69,
          Unit: "F",
          UnitType: 18,
        },
      },
      MobileLink:
        "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
      Link: "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
    },
  ],
};

const appSlice = createSlice({
  name: "app",
  initialState: initialAppState,
  reducers: {
    addToFavourites(
      state,
      action: PayloadAction<{
        key: string;
        val: {
          currWeatherData: ICurrCityData;
          fiveWeatherForecast: IdailyForecast[];
        };
      }>
    ) {
      const isFound = action.payload.key in state.favouriteCities;

      if (!isFound) {
        state.favouriteCities[action.payload.key] = action.payload.val;
      }
    },
    setToFavourites(state, action) {
      state.favouriteCities = action.payload;
    },

    deleteFromFavourites(state, action: PayloadAction<string>) {
      delete state.favouriteCities[action.payload];
    },

    setDailyForecasts(state, action: PayloadAction<IdailyForecast[]>) {
      state.dailyForecasts = action.payload;
    },

    setCurrCity(state, action: PayloadAction<ICurrCityData[]>) {
      state.currCityData = action.payload;
    },
    setCurrCityName(state, action) {
      state.currCityName = action.payload;
    },
    setCurrCityKey(state, action: PayloadAction<string>) {
      state.currCityKey = action.payload;
    },
    toggleUnitIndex(state) {
      state.currTempUnitIndex ^= 1;
    },

    toggleThemeMode(state) {
      state.themeMode = state.themeMode === "light" ? "dark" : "light";
    },
    setCurrPage(state, action: PayloadAction<"/" | "/favourites">) {
      state.currPage = action.payload;
    },
    setIsFavouriteClicked(state, action: PayloadAction<boolean>) {
      state.isFavouriteClicked = action.payload;
    },
  },
});

export default appSlice;
