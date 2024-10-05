import { Link } from "react-router-dom"; // Optional: Use if you're using React Router for navigation

const Navbar = () => {
  return (
    <nav className="shadow-md sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop:blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="text-slate-900 text-2xl font-bold pl-5 pr-4">
          My App
        </div>
        <div className="space-x-4">
          <Link to="/" className="hover:text-blue-200">
            Home
          </Link>
          <Link to="/bookmarks" className="hover:text-blue-200">
            Bookmarks
          </Link>
          <Link to="/about" className="hover:text-blue-200">
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
