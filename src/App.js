import { Navigate, Route, Routes } from "react-router-dom";
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
import Login from "./components/auth/Login";
import ProtectedRoute from "./helpers/ProtectedRoute";
import Register from "./components/auth/Register";
import useAuth from "./hooks/useAuth";

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getPatchVersion());
  }, [dispatch]);


  const user = useAuth();

  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Welcome/>} />
        {!user && (
          <>
            <Route index={false} path="login" element={<Login/>} />
            <Route index={false} path="register" element={<Register/>} />
          </>
        )}
        {user && (
          <>
            <Route path="login" element={<Navigate to={"/"} replace />}/>
            <Route path="register" element={<Navigate to={"/"} replace />}/>
          </>
        )}
        <Route element={<ProtectedRoute user={user} />}>
          <Route index={false} path="leaderboard" element={<Leaderboard/>} />
          <Route index={false} path="items" element={<Items/>} />
          <Route index={false} path="champions" element={<Champions/>} />
          <Route index={false} path="summoner/:name/:region" element={<SummonerInfo/>} />
          <Route path="champions/:id" element={<SingleChampion/>} />
        </Route>
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </div>
  );
}

export default App;
