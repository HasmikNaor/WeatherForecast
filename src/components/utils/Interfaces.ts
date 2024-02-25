export interface ISearchState {
  autoCompleteCities: [];
}

export interface IAutoCompleteCity {
  Version: number;
  Key: string;
  Type: string;
  Rank: number;
  LocalizedName: string;
  Country: {
    ID: string;
    LocalizedName: string;
  };
  AdministrativeArea: {
    ID: string;
    LocalizedName: string;
  };
}

export type TemPeratureType = {
  Value: number;
  Unit: "F" | "C";
  UnitType: number;
};

export interface dayDataType {
  Icon: number;
  IconPhrase: string;
  HasPrecipitation: boolean;
  PrecipitationType?: string;
  PrecipitationIntensity?: string;
}

export interface IdailyForecast {
  Date: string;
  EpochDate: number;
  Temperature: {
    Minimum: TemPeratureType;
    Maximum: TemPeratureType;
  };
  Day: dayDataType;
  Night: dayDataType;
  Sources: string[];
  MobileLink: string;
  Link: string;
}

export interface ICurrCityData {
  LocalObservationDateTime: Date | string;
  EpochTime: number;
  WeatherText: string;
  WeatherIcon: number;
  HasPrecipitation: boolean;
  PrecipitationType: string | null;
  IsDayTime: boolean;
  Temperature: {
    Metric: TemPeratureType;
    Imperial: TemPeratureType;
  };
  MobileLink: string;
  Link: string;
}

export interface IInitialAppState {
  isFavouriteClicked: boolean;
  currPage: "/" | "/favourites";
  themeMode: "light" | "dark";
  temperUnits: ["Metric", "Imperial"];
  currTempUnitIndex: number;
  favouriteCities: {
    [key: string]: {
      currWeatherData: ICurrCityData;
      fiveWeatherForecast: IdailyForecast[];
    };
  };
  dailyForecasts: IdailyForecast[];
  currCityData: ICurrCityData[];
  currCityKey: string;
  currCityName: string;
}

export interface IGeoPositionData {
  Version: number;
  Key: string;
  Type: string;
  Rank: number;
  LocalizedName: string;
  EnglishName: string;
  PrimaryPostalCode: string;
  Region: {
    ID: string;
    LocalizedName: string;
    EnglishName: string;
  };
  Country: {
    ID: string;
    LocalizedName: string;
    EnglishName: string;
  };
  AdministrativeArea: {
    ID: string;
    LocalizedName: string;
    EnglishName: string;
    Level: 1;
    LocalizedType: string;
    EnglishType: string;
    CountryID: string;
  };
  TimeZone: {
    Code: string;
    Name: string;
    GmtOffset: number;
    IsDaylightSaving: boolean;
    NextOffsetChange: string;
  };
  GeoPosition: {
    Latitude: number;
    Longitude: number;
    Elevation: {
      Metric: {
        Value: number;
        Unit: string;
        UnitType: number;
      };
      Imperial: {
        Value: number;
        Unit: string;
        UnitType: number;
      };
    };
  };
  IsAlias: boolean;
  SupplementalAdminAreas: object;
  DataSets: string[];
}
export interface IStore {
  app: IInitialAppState;
}
