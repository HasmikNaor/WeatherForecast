import { TemPeratureType, dayDataType } from "../utils/Interfaces";

export const getDayName = (date: Date) => {
  const d = new Date(date);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[d.getDay()];
};

export const getDescription = (
  date: Date,
  day: dayDataType,
  night: dayDataType
) => {
  const hour = new Date(date).getHours();
  const eve = 17;
  if (hour >= eve) {
    return night.IconPhrase;
  }
  return day.IconPhrase;
};

export const fetchNameAndKeyFromLink = (link: string) => {
  const linkSeparatedData = link.split("/");
  const cityName = linkSeparatedData[5];
  const cityKey = linkSeparatedData[6];
  return {
    cityKey,
    cityName,
  };
};

export const toggleTemperature = (
  obj: TemPeratureType,
  currTemperatureUnit: "Imperial" | "Metric"
) => {
  if (obj.Unit === "F" && currTemperatureUnit === "Imperial") {
    return obj;
  }

  if (obj.Unit === "C" && currTemperatureUnit === "Metric") {
    return obj;
  }

  if (obj.Unit === "C") {
    return {
      Value: Math.round((obj.Value * 9) / 5 + 32),
      Unit: "F",
      UnitType: 18,
    };
  }
  return {
    Value: Math.round(((obj.Value - 32) * 5) / 9),
    Unit: "C",
    UnitType: 17,
  };
};
