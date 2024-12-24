import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Favorites from "./components/Favorites";
import MovieSearch from "./components/MovieSearch";
import AuthForm from "./components/AuthForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth/signup" element={<AuthForm type="Sign Up" />} />
        <Route path="/auth/signin" element={<AuthForm type="Sign In" />} />
        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />
        <Route path="/search" element={<MovieSearch />} />
        <Route path="/" element={<Navigate to="/search" />} />
      </Routes>
    </Router>
  );
}

export default App;
