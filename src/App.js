import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./components/NotFound";
import NavigationBar from "./components/NavigationBar";

const App = () => {
  return (
    <CookiesProvider>
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/" element={<Navigate to="/profile" />} />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      </Router>
    </CookiesProvider>
  );
};

export default App;
