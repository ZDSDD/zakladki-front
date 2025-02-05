import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { logOut } from "@/reducers/authSlice"; // Updated to match your action name
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings, User, LogOut } from "lucide-react";

const Navbar = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logOut()); // Updated to match your action name
        navigate('/');
    };

    return (
        <nav className="top-0 z-50 w-full mt-3">
            <div className="w-full px-4 flex justify-between h-12 items-center">
                {/* Left side links: About and Dziennik Nudziary */}
                <div className="flex items-center space-x-5">
                    <Link className="text-2xl font-bold text-slate-900" to="/">
                        Dziennik Nudziary
                    </Link>

                </div>
                {/* Centered (optional) */}
                <div className="drop-shadow-lg gap-3 flex justify-center items-center bg-red-200 rounded-2xl pl-4 pr-4 py-2 border-1">
                    <Link className="hover:text-green-600 transition-colors duration-500" to="/about">
                        About
                    </Link>
                    <Link className="hover:text-green-600 transition-colors duration-500" to="/about">
                        My instagram
                    </Link>
                    <Link className="hover:text-green-600 transition-colors duration-500" to="/about">
                        My TikTok
                    </Link>
                </div>
                {/* Right side login/welcome with dropdown */}
                <div className="flex justify-end items-center">
                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger className="hover:text-green-600 transition-colors duration-500 outline-none">
                                <span>Hello, {user.name}</span>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-48">
                                <DropdownMenuItem className="cursor-pointer">
                                    <User className="mr-2 h-4 w-4" />
                                    <Link to="/profile">Profile</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer">
                                    <Settings className="mr-2 h-4 w-4" />
                                    <Link to="/settings">Settings</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className="cursor-pointer text-red-600"
                                    onClick={handleLogout}
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Logout</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
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