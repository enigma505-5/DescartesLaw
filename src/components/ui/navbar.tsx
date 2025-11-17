import { useState, useEffect, useRef } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { Link } from "react-router";

export default function Navbar() {
    const [lang, setLang] = useState("EN");
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const menuRef = useRef<HTMLDivElement>(null);

    const textColor = "text-white";
    const hoverBg = "hover:bg-blue-500";
    const borderColor = "bg-blue-300 border-none";
    const mobileMenuBg = "bg-gray-800";

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth >= 768) {
                setMenuOpen(false);
            }
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                menuOpen &&
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setMenuOpen(false);
            }
        }
        if (menuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuOpen]);

    useEffect(() => {
        function handleScroll() {
            setScrolled(window.scrollY > 10);
        }
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${scrolled ? "bg-slate-950/80 backdrop-blur" : ""
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                        <div className="flex items-center gap-3">
                            {" "}

                            <a href="/" className="text-2xl font-bold text-blue-400">
                                Descarte's Law Simulator
                            </a>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        <button
                            onClick={() => setLang(lang === "EN" ? "FR" : "EN")}
                            className="text-white px-3 py-1 bg-blue-500 rounded-md text-sm transition cursor-pointer"
                            aria-label="Toggle Language"
                        >
                            {lang}
                        </button>
                        <div className="h-6 w-px bg-gray-300" aria-hidden="true"></div>

                        <Link
                            to="/about"
                            className={`${textColor} ${hoverBg} transition duration-300 px-3 py-2 rounded-md text-sm font-medium`}
                        >
                            About
                        </Link>
                        <Link
                            to="/simulator"
                            className={`${textColor} ${hoverBg} transition duration-300 px-3 py-2 rounded-md text-sm font-medium`}
                        >
                            Simulator
                        </Link>
                    </div>

                    <div className="md:hidden">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className={`${textColor} focus:outline-none`}
                            aria-label="Toggle Menu"
                        >
                            {menuOpen ? (
                                <HiOutlineX size={24} />
                            ) : (
                                <HiOutlineMenu size={24} />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {menuOpen && (
                <div className="flex items-center justify-center">
                    <div
                        ref={menuRef}
                        className={`${mobileMenuBg} w-full max-w-lg py-7 space-y-2 rounded-xl p-6`}
                    >
                        <button
                            onClick={() => setLang(lang === "EN" ? "FR" : "EN")}
                            className={`${textColor} block w-full text-left px-3 py-2 border ${borderColor} rounded-md text-sm ${hoverBg} transition duration-300 cursor-pointer`}
                        >
                            Language: {lang}
                        </button>


                        <Link
                            to="/about"
                            className={`${textColor} block ${hoverBg} px-3 py-2 rounded-md text-sm font-medium transition duration-300 cursor-pointer`}
                        >
                            About
                        </Link>
                        <Link
                            to="/simulator"
                            className={`${textColor} block ${hoverBg} px-3 py-2 rounded-md text-sm font-medium transition duration-300 cursor-pointer`}
                        >
                            Simulator
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}