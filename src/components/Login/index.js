import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Login = () => {
  const [, setCookie] = useCookies(["token"]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoging, setIsLoging] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoging(true)
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        {
          username,
          password
        }
      );
      const token = response.data.token;

      if (token) {
        setCookie("token", token);
        navigate("/profile");
        setIsLoging(false);
      }
    } catch (error) {
      setIsLoging(false);
      setError(error.response.data.message || "Unknown error occurred");    }
  };

  const handleClearError = () => {
    setError(null);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-lg font-bold mb-4">Login</h2>
        {error && (
          <div className="bg-red-200 rounded-md mx-2 p-4">
            <div className="flex items-center justify-between">
              <div className="text-red-700">{error}</div>
              <button className="text-red-700" onClick={handleClearError}>
                X
              </button>
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-bold mb-2"
            >
              Username:
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-gray-400 p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Password:
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-400 p-2 w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            {isLoging ? "Login . . .":"Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
