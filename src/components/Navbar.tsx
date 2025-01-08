import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
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
                                <DropdownMenuItem className="cursor-pointer text-red-600">
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