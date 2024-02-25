import { useSelector } from "react-redux";
import { IStore } from "../utils/Interfaces";

interface IFavouriteCityCard {
  cityName: string;
  unit: "C" | "F";
  value: number;
  tempDescription: string;
  className?: string;
  cityKey: string;
  onRemove: (key: string) => void;
  onAddToMain: (key: string) => void;
}
const FavouriteCityCard = ({
  cityName,
  unit,
  value,
  tempDescription,
  className,
  cityKey,
  onRemove,
  onAddToMain,
}: IFavouriteCityCard) => {
  const themeMode = useSelector((state: IStore) => state.app.themeMode);
  return (
    <section
      className={`card card__${themeMode} ${className}`}
      onClick={() => onAddToMain(cityKey)}
    >
      <h2 className="card__title">{cityName}</h2>
      <span className="card__desc">
        {value}
        {unit}
      </span>
      <p className="card__subtitle">{tempDescription}</p>
      <button
        className="favourite-city-card__btn"
        type="button"
        onClick={(e) => {
          onRemove(cityKey);
          e.stopPropagation();
        }}
      >
        remove
      </button>
    </section>
  );
};

export default FavouriteCityCard;
