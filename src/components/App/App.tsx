import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Favourites from "../Favourites/Favourites";
import { useSelector } from "react-redux";
import { IStore } from "../utils/Interfaces";
import { useEffect } from "react";

function App() {
  const theme = useSelector((state: IStore) => state.app.themeMode);
  const navigate = useNavigate();

  const location = useLocation();
  const pathName = location.pathname;

  useEffect(() => {
    if (pathName !== ("/" && "/favourites")) {
      navigate("/");
    }
  }, [pathName]);

  return (
    <div className="app" id={theme}>
      <Header />

      <Routes>
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
