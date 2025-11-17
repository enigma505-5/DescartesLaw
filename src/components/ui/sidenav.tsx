export default function SideNav() {

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Simulator", path: "/simulator" },
        { name: "About", path: "/about" },
    ]

    return (
        <div className="fixed left-0 top-0 h-screen w-56 bg-slate-900 border border-r border-slate-800">
            <aside>
                <div className="p-6 text-white font-bold text-xl border-b border-slate-800">Snell Descartes Law Simulator</div>
                <nav className="text-center mt-8 flex flex-col space-y-4 text-slate-400">
                    {Object.values(navLinks).map((link) => (
                        <a
                            key={link.path}
                            href={link.path}>
                            {link.name}
                        </a>
                    ))}
                </nav>
            </aside>
        </div>
    )
}