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

function App() {
  return (
    <div>
      {/* <AuthPage /> */}
      <PrivateRoute>
        <NavBar />
      </PrivateRoute>
      <Routes>
        <Route
          path="*"
          element={
            <PublicRoute>
              <AuthPage />
            </PublicRoute>
          }
        />
        <Route path="/home">
          <Route index={true}/>
          <Route
            index={false}
            path="profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            index={false}
            path="about"
            element={
              <PrivateRoute>
                <About />
              </PrivateRoute>
            }
          />
          <Route
            index={false}
            path="champions"
            element={
              <PrivateRoute>
                <Champions/>
              </PrivateRoute>
            }
          />
          <Route
            index={false}
            path="summoner"
            element={
              <PrivateRoute>
                <div>summoner</div>
              </PrivateRoute>
            }
          />
          <Route path="champions/:id" element={<SingleChampion/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
