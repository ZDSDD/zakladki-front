import { Link, useNavigate } from "react-router";
import { useAuthStore } from "@/store/authStore";
import UserDropdown from "./UserDropdown";

const Navbar = () => {
    const navigate = useNavigate();
    const user = useAuthStore(state => state.user);
    const logout = useAuthStore(state => state.logOut);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="top-0 z-50 mt-3 px-14">
            <div className="flex flex-col md:flex-row text-nowrap h-12 items-center justify-between">
                {/* Left side links: About and Dziennik Nudziary */}
                <div className="flex justify-center md:justify-start">
                    <Link
                        className="text-2xl font-bold text-slate-900"
                        to="/"
                    >
                        Dziennik Nudziary
                    </Link>
                </div>

                {/* Right side login/welcome with dropdown */}
                <div className="flex justify-center md:justify-end">
                    {user ? (
                        <UserDropdown
                            user={user}
                            handleLogout={handleLogout}
                        />
                    ) : (
                        <Link
                            to="/login"
                            className="hover: cursor-pointer"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;