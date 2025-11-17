import { Link } from "react-router";
import { GiMaterialsScience } from "react-icons/gi";
import { FaArrowRightLong } from "react-icons/fa6";
import Navbar from "./navbar";

export default function LandingContent() {
    return (
        <>
            <Navbar />
            <div className="mt-10 min-h-screen flex items-center justify-center">
                <div className="w-full max-w-5xl px-4 sm:px-6 md:px-8 text-center flex flex-col items-center p-6 space-y-6">
                    <h1 className="text-white text-4xl sm:text-5xl font-semibold text-black">
                        Explore Light Refraction with Precision.
                    </h1>

                    <p className="text-white text-lg sm:text-xl text-gray-700 max-w-3xl">
                        A powerful, interactive tool for tracing ray diagrams and
                        calculating angles across different mediums using Snell-Descartes
                        Law.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
                        <Link
                            to="/simulator"
                            className="inline-flex rounded-md items-center justify-center bg-blue-500 text-blue-100 hover:bg-blue-700 gap-2 text-lg px-6 py-3 transition-all duration-300 hover:scale-105 cursor-pointer"
                        >
                            Launch Simulator{" "}
                            <span>
                                <GiMaterialsScience />
                            </span>
                        </Link>
                        <Link
                            to="/about"
                            className="inline-flex rounded-md items-center justify-center border border-blue-400 text-white text-lg px-6 py-3 transition-all duration-300 hover:scale-105 cursor-pointer"
                        >
                            Learn More{" "}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 ml-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </Link>
                    </div>
                    <div>
                        <a
                            className="
            text-white
            flex items-center gap-2 text-lg text-gray-700 underline"
                            href="/apply"
                        >
                            Become a participant{" "}
                            <span>
                                <FaArrowRightLong />
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}