import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsRegistering(true)
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/register`,
        {
          username,
          email,
          password
        }
      );
      console.log(response.data.message);
      setError(null);
      setSuccessMessage("User registered successfully!");
      setIsRegistering(false);
    } catch (error) {
      setError(error.response.data.message || "Unknown error occurred");    
      setSuccessMessage("")
      setIsRegistering(false)
    }
  
  };

   const handleClearError = () => {
    setError(null);
  };
  
  return (
    <div className="flex items-center justify-center h-screen">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
       {successMessage ?  <h2 className="text-2xl font-bold mb-4">Go back to Login</h2>:<h2 className="text-2xl font-bold mb-4">Register</h2>}
        {successMessage && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4">
            <div className="flex">
              <div className="py-1">
                <svg
                  className="fill-current h-6 w-6 text-green-500 mr-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                </svg>
              </div>
              <div>
                <p className="font-bold">{successMessage}</p>
              </div>
            </div>
          </div>
        )}
        {error && (
          <div className="bg-red-200 rounded-md my-2 p-4">
            <div className="flex items-center justify-between">
              <div className="text-red-700">{error}</div>
              <button className="text-red-700" onClick={handleClearError}>
                X
              </button>
            </div>
          </div>
        )}
        {successMessage ?( <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            
            onClick={()=>navigate('/login')}// type="submit"
          >
            Login
          </button>
        </div>) :(
          <>
           <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="username"
          >
            Username:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="password"
          >
            Password:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {isRegistering ? "Register . . ." : "Register"}
          </button>
        </div>
        </>
        )}
      </form>
    
    </div>
  );
};

export default Register;
