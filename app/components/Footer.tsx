import { Link } from "react-router";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";

function Footer() {
    return (
        <footer className="py-3 mt-20 shadow-lg bg-sky-100/50 text-blue-950">
            <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                {/* Brand Section */}
                <div className="text-center md:text-left mb-4 md:mb-0">
                    <h2 className="text-xl font-semibold text-gray-800">Bookmark Store</h2>
                    <p className="text-gray-600 text-sm mt-1">Handmade bookmarks for every reader.</p>
                </div>

                {/* Navigation Links */}
                <nav className="flex space-x-6 text-gray-700 text-sm">
                    <Link to="/" className="hover:text-gray-900 transition">Home</Link>
                    <Link to="/bookmarks" className="hover:text-gray-900 transition">Bookmarks</Link>
                    <Link to="/about" className="hover:text-gray-900 transition">About</Link>
                    <Link to="/contact" className="hover:text-gray-900 transition">Contact</Link>
                </nav>

                {/* Social Media Links */}
                <div className="flex space-x-4 mt-4 md:mt-0">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition">
                        <BsFacebook className="text-xl" />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition">
                        <BsInstagram className="text-xl" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition">
                        <BsTwitter className="text-xl" />
                    </a>
                </div>
            </div>

            {/* Copyright */}
            <div className="text-center text-gray-600 text-sm mt-4">
                © {new Date().getFullYear()} Bookmark Store. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;
