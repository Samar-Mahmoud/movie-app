import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Favorites from "./components/Favorites";
import MovieSearch from "./components/MovieSearch";
import Header from "./components/Header";
import SignUp from "./components/Signup";
import SignIn from "./components/Signin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/auth/signin" element={<SignIn />} />
        <Route
          path="/favorites"
          element={
            <>
              <Header />
              <Favorites />
              {/* <ProtectedRoute>
              </ProtectedRoute> */}
            </>
          }
        />
        <Route
          path="/search"
          element={
            <>
              <Header />
              <MovieSearch />
            </>
          }
        />
        <Route path="/" element={<Navigate to="/search" />} />
      </Routes>
    </Router>
  );
}

export default App;
