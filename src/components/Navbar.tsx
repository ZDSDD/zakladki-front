import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { logOut } from "@/reducers/authSlice"; // Updated to match your action name

import "./navbar.css"
import UserDropdown from "./UserDropdown";

const Navbar = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logOut()); // Updated to match your action name
        navigate('/');
    };

    return (
        <nav className="top-0 z-50 mt-3 px-14">
            <div className="navbar flex justify-between h-12 items-center">
                {/* Left side links: About and Dziennik Nudziary */}
                <div className="flex items-center space-x-5">
                    <Link className="text-2xl font-bold text-slate-900" to="/">
                        Dziennik Nudziary
                    </Link>

                </div>
                {/* Centered (optional) */}
                {/* Right side login/welcome with dropdown */}
                <div className="flex justify-end items-center">
                    {user ? (
                        <UserDropdown user={user} handleLogout={handleLogout} />
                    ) : (
                        <Link to="/login" className="hover:text-green-600 transition-colors duration-500 ml-5">
                            Login
                        </Link>
                    )}
                </div>
            </div >
        </nav >
    );
};

export default Navbar;