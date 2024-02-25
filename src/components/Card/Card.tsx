import { useSelector } from "react-redux";
import { IStore } from "../utils/Interfaces";

interface ICard {
  title: string;
  unit: "C" | "F";
  tempDescription: string;
  className: string;
  minTemp: number;
  maxTemp: number;
}

const Card = ({
  title,
  unit,
  minTemp,
  maxTemp,
  tempDescription,
  className,
}: ICard) => {
  const themeMode = useSelector((state: IStore) => state.app.themeMode);
  return (
    <section className={`card card__${themeMode} ${className}`}>
      <h2 className="card__title">{title}</h2>
      <span className="card__desc">{`${minTemp}/${maxTemp}  ` + unit}</span>
      <p className="card__subtitle">{tempDescription}</p>
    </section>
  );
};

export default Card;
