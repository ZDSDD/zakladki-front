import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { User, Settings, LogOut } from "lucide-react";

export default function UserDropdown({ user, handleLogout }: { user: { name: string } | null, handleLogout: () => void }) {
    return (
        <div className="flex justify-end items-center">
            {user ? (
                <Menu as="div" className="relative">
                    <Menu.Button className="hover:text-green-600 transition-colors duration-300 outline-none">
                        Hello, {user.name}
                    </Menu.Button>
                    <Transition
                        enter="transition-opacity duration-200"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity duration-150"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Menu.Items className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden">
                            <Menu.Item>
                                {({ active }) => (
                                    <Link
                                        to="/profile"
                                        className={`flex items-center px-4 py-2 text-sm ${active ? "bg-gray-100" : ""
                                            }`}
                                    >
                                        <User className="mr-2 h-4 w-4" />
                                        Profile
                                    </Link>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <Link
                                        to="/settings"
                                        className={`flex items-center px-4 py-2 text-sm ${active ? "bg-gray-100" : ""
                                            }`}
                                    >
                                        <Settings className="mr-2 h-4 w-4" />
                                        Settings
                                    </Link>
                                )}
                            </Menu.Item>
                            <div className="border-t border-gray-200"></div>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={handleLogout}
                                        className={`flex items-center w-full px-4 py-2 text-sm text-red-600 ${active ? "bg-gray-100" : ""
                                            }`}
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Logout
                                    </button>
                                )}
                            </Menu.Item>
                        </Menu.Items>
                    </Transition>
                </Menu>
            ) : (
                <Link
                    to="/login"
                    className="hover:text-green-600 transition-colors duration-300 ml-5"
                >
                    Login
                </Link>
            )}
        </div>
    );
}
