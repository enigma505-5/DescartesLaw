import Navbar from "../components/ui/navbar"


export default function About() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <Navbar />

            <main className="max-w-6xl mx-auto px-6 py-16">
                <section className="grid gap-10 lg:grid-cols-2 items-center mt-10">
                    <div>
                        <p className="text-sm uppercase tracking-widest text-blue-400">About</p>
                        <h1 className="mt-4 text-4xl font-semibold">Snell–Descartes Law Simulator</h1>
                        <p className="mt-4 text-slate-300 text-lg max-w-xl">
                            An interactive educational simulator that demonstrates how light
                            refracts and reflects when passing between different media. Use the
                            simulator to experiment with refractive indices, incidence angles,
                            and observe reflection, refraction, and total internal reflection.
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <a
                                href="/simulator"
                                className="inline-block rounded-lg bg-fuchsia-600 px-5 py-3 font-medium text-white shadow hover:bg-fuchsia-700"
                            >
                                Open Simulator
                            </a>
                            <a
                                href="#features"
                                className="inline-block rounded-lg border border-slate-800 px-5 py-3 text-slate-200 hover:bg-slate-800/40"
                            >
                                Learn More
                            </a>
                        </div>
                    </div>

                    <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-slate-800 p-6 shadow-lg">
                        <div className="w-full h-64 rounded-lg bg-gradient-to-br from-[#0f172a] to-[#020617] flex items-center justify-center">
                            {/* Small illustrative SVG */}
                            <svg width="280" height="160" viewBox="0 0 280 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="280" height="160" rx="12" fill="#0b1220" />
                                <line x1="20" y1="80" x2="260" y2="80" stroke="#334155" strokeWidth="2" />
                                <line x1="140" y1="0" x2="140" y2="160" stroke="#475569" strokeWidth="1" strokeDasharray="4 4" />

                                <path d="M40 30 L140 80" stroke="#F472B6" strokeWidth="3" strokeLinecap="round" />
                                <path d="M140 80 L220 50" stroke="#34D399" strokeWidth="3" strokeLinecap="round" />
                                <path d="M140 80 L60 110" stroke="#60A5FA" strokeWidth="3" strokeLinecap="round" />

                                <circle cx="140" cy="80" r="3" fill="#fff" />
                            </svg>
                        </div>
                    </div>
                </section>

                <section id="features" className="mt-14">
                    <h2 className="text-2xl font-semibold">Features</h2>
                    <p className="mt-2 text-slate-300 max-w-3xl">
                        This project focuses on clarity and interactivity for learning optics:
                    </p>

                    <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <FeatureCard
                            title="Interactive Rays"
                            desc="Visual ray diagram that updates live with your inputs (angle, indices)."
                        />
                        <FeatureCard
                            title="Accurate Physics"
                            desc="Calculations use Snell's law and Fresnel equations for reflectance/transmittance."
                        />
                        <FeatureCard
                            title="Educational Notes"
                            desc="Shows critical angle, total internal reflection, and speed ratio between media."
                        />
                    </div>
                </section>

                <section className="mt-14 grid gap-8 lg:grid-cols-2">
                    <div>
                        <h3 className="text-xl font-semibold">How to use</h3>
                        <ol className="mt-3 list-decimal list-inside text-slate-300 space-y-2">
                            <li>Choose refractive indices for Medium 1 and Medium 2.</li>
                            <li>Adjust the incident angle using the slider or numeric input.</li>
                            <li>Observe the ray diagram and read the computed angles and percentages.</li>
                            <li>Try increasing n₁ above n₂ to see total internal reflection in action.</li>
                        </ol>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold">Contact & Contribution</h3>
                        <p className="mt-3 text-slate-300">
                            Built as an educational project. Contributions and suggestions are welcome.
                            You can open issues or PRs in the repository, or email the maintainer.
                        </p>

                        <div className="mt-4">
                            <a className="inline-block mr-3 rounded bg-slate-800 px-4 py-2 text-sm" href="mailto:you@example.com">Email</a>
                            <a className="inline-block rounded border border-slate-800 px-4 py-2 text-sm" href="#">Repo</a>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

function FeatureCard({ title, desc }: { title: string; desc: string }) {
    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
            <p className="text-sm font-semibold text-white">{title}</p>
            <p className="mt-2 text-sm text-slate-300">{desc}</p>
        </div>
    );
}