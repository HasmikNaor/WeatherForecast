import { useDispatch, useSelector } from "react-redux";
import { IStore } from "../utils/Interfaces";
import appSlice from "../App/appState";
import moon from "../../images/Moon.svg";
import whiteMoon from "../../images/white-moon.svg";
import whiteSun from "../../images/white-sun.svg";

const ThemeModeCheckbox = () => {
  const dispatch = useDispatch();

  const themeMode = useSelector((state: IStore) => state.app.themeMode);

  const toggleTheme = () => {
    dispatch(appSlice.actions.toggleThemeMode());
  };

  return (
    <div className={`theme-mode ${themeMode}`}>
      <input
        className={`theme-mode__input `}
        type="checkbox"
        id="theme-toggle"
        onChange={toggleTheme}
        checked={themeMode === "dark"}
      />
      <label className={`theme-mode__label theme-mode__label_${themeMode}`}>
        <img
          src={themeMode === "light" ? moon : whiteMoon}
          alt="moon"
          className={`theme-mode__img theme-mode__moon-img ${
            themeMode === "dark" ? "theme-mode__img_dark" : ""
          }`}
        />
        <img src={whiteSun} alt="sun" className={`theme-mode__img }`} />
      </label>
    </div>
  );
};

export default ThemeModeCheckbox;
