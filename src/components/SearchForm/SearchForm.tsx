import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAutoCompleteCities } from "../../apis/api";
import { IAutoCompleteCity } from "../utils/Interfaces";
import appSlice from "../App/appState";
import { toast } from "react-toastify";

type SearchFormProps = {
  fetchCityWeatherInfo: (selectedCityKey: string) => void;
};

const SearchForm = ({ fetchCityWeatherInfo }: SearchFormProps) => {
  const [locationInput, setLocationInput] = useState<string>("");
  const dispatch = useDispatch();
  const [autoCompleteCities, setAutoCompleteCities] = useState<
    IAutoCompleteCity[]
  >([]);
  const [isSearchBtnDisabled, setIsSearchBtnDisabled] = useState(true);
  const [chosenCity, setChosenCity] = useState("");
  const [chosenCityKey, setChosenCityKey] = useState("");

  const handleSubmit = () => {
    if (autoCompleteCities.length === 1) {
      fetchCityWeatherInfo(autoCompleteCities[0].Key);
    }
    if (autoCompleteCities.length > 1) {
      //Todo print more than one option to choose
    }
  };
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.validity.valid) {
      setLocationInput(e.currentTarget.value);
    }
  };

  const getAutoCities = (cityName: string) => {
    getAutoCompleteCities(cityName)
      .then((res: IAutoCompleteCity[]) => {
        if (res) {
          setAutoCompleteCities(res);
        } else {
          setAutoCompleteCities([]);
        }
      })
      .catch((err) => {
        setAutoCompleteCities([]);
        toast.error(`Error: ${err.message}`);
        console.log(err);
      });
  };

  useEffect(() => {
    // getAutoCities(locationInput);
  }, [locationInput]);

  useEffect(() => {
    if (autoCompleteCities?.length !== 0) {
      setIsSearchBtnDisabled(false);
    } else {
      setIsSearchBtnDisabled(true);
    }
  }, [autoCompleteCities]);

  const handleCitySelect = (key: string, city: string, country: string) => {
    setChosenCity(city + " " + country);
    setChosenCityKey(key);
    setAutoCompleteCities([]);
    dispatch(appSlice.actions.setCurrCityName(city));
  };

  useEffect(() => {
    if (chosenCityKey) {
      fetchCityWeatherInfo(chosenCityKey);
    }
  }, [chosenCityKey]);

  const renderAutocompleteCities = () => {
    return autoCompleteCities.map((city: IAutoCompleteCity) => (
      <p
        key={city.Key}
        className="search-form__city"
        onClick={() =>
          handleCitySelect(
            city.Key,
            city.LocalizedName,
            city.Country.LocalizedName
          )
        }
      >
        {`${city.LocalizedName} (${city.Country.LocalizedName}, ${city.AdministrativeArea.LocalizedName})`}
      </p>
    ));
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="serach-form__input-wrapper">
        <input
          className="search-form__input"
          placeholder="Enter Location"
          onChange={handleChange}
          value={chosenCity || locationInput}
          type="text"
          pattern="^[a-zA-Z ]+$"
        />
        <div className="search-form__cities">
          {autoCompleteCities && renderAutocompleteCities()}
        </div>
      </div>
      <button className="search-form__button" disabled={isSearchBtnDisabled}>
        Search
      </button>
    </form>
  );
};

export default SearchForm;
