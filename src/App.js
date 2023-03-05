import { Route, Routes } from "react-router-dom";
import "./App.css";
import About from "./components/About";
import NavBar from "./components/NavBar";
import AuthPage from "./components/AuthPage";
import PrivateRoute from "./private-route/PrivateRoute";
import PublicRoute from "./private-route/PublicRoute";
import Profile from "./components/Profile";
import Champions from "./components/Champions";
import SingleChampion from "./components/SingleChampion";
import SummonerInfo from "./components/SummonerInfo";
import NotFound from "./private-route/NotFound";

function App() {
  return (
    <div>
      <Routes>
        <Route path='*' element={<NotFound />}/>
        <Route path="/" element={<About/>}/>
        <Route path="/home" element={<NavBar/>}>
          <Route index={true}/>
          <Route
            index={false}
            path="profile"
            element={
                <Profile />
            }
          />
          <Route
            index={false}
            path="about"
            element={
                <About />
            }
          />
          <Route
            index={false}
            path="champions"
            element={
                <Champions/>
            }
          />
          <Route
            index={false}
            path="summoner"
            element={
                <SummonerInfo/>
            }
          />
          <Route
            index={false}
            path="summoner/:name"
            element={
                <SummonerInfo/>
            }
          />
          <Route path="champions/:id" element={<SingleChampion/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
