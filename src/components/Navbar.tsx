import { Link } from "react-router-dom"; // Optional: Use if you're using React Router for navigation

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">My App</div>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-blue-200">
            Home
          </Link>
          <Link to="/bookmarks" className="text-white hover:text-blue-200">
            Bookmarks
          </Link>
          <Link to="/about" className="text-white hover:text-blue-200">
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
