import { Route, Routes } from "react-router-dom";
import "./App.css";
import Welcome from "./components/Welcome";
import NavBar from "./components/NavBar";
import Champions from "./components/Champions";
import SingleChampion from "./components/SingleChampion";
import SummonerInfo from "./components/SummonerInfo";
import { useDispatch } from "react-redux";
import { getPatchVersion } from "./redux/actions";
import { useEffect } from "react";
import Leaderboard from "./components/leaderboard/Leaderboard";
import NotFound from "./components/NoutFound";
import Items from "./components/Items";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPatchVersion());
  }, [dispatch]);

  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Welcome/>}/>
          <Route index={false} path="leaderboard" element={<Leaderboard/>} />
          <Route index={false} path="items" element={<Items/>} />
          <Route index={false} path="champions" element={<Champions/>} />
          <Route index={false} path="summoner/:name/:region" element={<SummonerInfo/>} />
          <Route path="champions/:id" element={<SingleChampion/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;
