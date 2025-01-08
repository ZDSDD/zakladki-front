import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";  // Import the RootState type from your store
import "./navbar.css";

const Navbar = () => {
    const user = useSelector((state: RootState) => state.auth.user);  // Access user from authSlice

    return (
        <nav className="shadow-md sticky top-0 z-50 w-full border-b border-green-500 bg-background/30 backdrop:blur supports-[backdrop-filter]:bg-background/80">
            <div className="w-full px-4 grid h-12 items-center grid-cols-[auto_auto_1fr]">
                {/* Left side links: About and Dziennik Nudziary */}
                <div className="flex items-center space-x-5">
                    <Link className="text-2xl font-bold text-slate-900" to="/">
                        Dziennik Nudziary
                    </Link>
                    <Link className="hover:text-green-600 transition-colors duration-500" to="/about">
                        About
                    </Link>
                </div>
                {/* Centered (optional) */}
                <div className="flex justify-center items-center">
                    {/* Optional Center Content */}
                </div>
                {/* Right side login/welcome */}
                <div className="flex justify-end items-center">
                    {user ? (
                        <span className="hover:text-green-600 transition-colors duration-500">Hello, {user.name}</span>
                    ) : (
                        <Link to="/login" className="hover:text-green-600 transition-colors duration-500 ml-5">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
