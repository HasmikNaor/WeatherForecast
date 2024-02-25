import { Link } from "react-router-dom";
import weather from "../../images/weather.png";
import { useDispatch, useSelector } from "react-redux";
import appSlice from "../App/appState";
import { IStore } from "../utils/Interfaces";
import ThemeModeCheckbox from "../ThemeModeCheckbox/ThemeModeCheckbox";

const Header = () => {
  const dispatch = useDispatch();

  const temperatureUnit = useSelector(
    (state: IStore) => state.app.temperUnits[state.app.currTempUnitIndex]
  );
  const currPage = useSelector((state: IStore) => state.app.currPage);
  const themeMode = useSelector((state: IStore) => state.app.themeMode);

  return (
    <header className={`header header_${themeMode}`}>
      <img src={weather} alt="my weather" className="header__img" />
      <ul className="header__list">
        <li className="header__list-item">
          <button
            className={`header__unit-btn header__unit-btn_${themeMode}`}
            type="button"
            onClick={() => dispatch(appSlice.actions.toggleUnitIndex())}
          >
            {temperatureUnit}
          </button>
        </li>
        <li className="header__list-item">
          <ThemeModeCheckbox />
        </li>
        <li className={`header__list-item `}>
          <Link
            to="/"
            className={`header__link ${
              currPage === "/" ? "header__link_curr" : ""
            } header__link_${themeMode}`}
          >
            Home
          </Link>
        </li>
        <li className={`header__list-item `}>
          <Link
            className={`header__link ${
              currPage === "/favourites" ? "header__link_curr" : ""
            } header__link_${themeMode}`}
            to="/favourites"
          >
            Favourites
          </Link>
        </li>
      </ul>
    </header>
  );
};
export default Header;
