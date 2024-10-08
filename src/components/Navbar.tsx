import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
    return (
        <nav className="shadow-md sticky top-0 z-50 w-full border-b border-green-500 bg-background/30 backdrop:blur supports-[backdrop-filter]:bg-background/80">
            <div className="w-full px-4 grid h-12 items-center grid-cols-[1fr_auto_1fr]">
                {/* Left side links */}
                <div className="flex justify-end mr-5 hover:text-green-600 transition-colors duration-500">
                    <Link to="/login">Login</Link>
                </div>
                {/* Centered title */}
                <div className="text-slate-900 text-5xl font-bold text-center">
                    <Link className="glow" to="/">
                        Dziennik Nudziary
                    </Link>
                </div>
                {/* Right side links */}
                <div className="flex justify-start ml-5 hover:text-green-600 transition-colors duration-500">
                    <Link to="/about">About</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
