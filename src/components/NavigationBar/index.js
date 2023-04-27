import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <nav className="flex justify-between items-center h-16 bg-white text-black fixed top-0 left-0 right-0 z-50 shadow-lg font-mono w-full" role="navigation">
      <Link to="/profile" className="pl-8">Profile</Link>
      <Link to="/register" className="pr-8">Register</Link>
    </nav>
  );
};

export default NavigationBar;
