import { useMemo, useState } from "react";
import Navbar from "../components/ui/navbar";
import Button from "../components/ui/button";

const MATERIALS = [
    { label: "Air (1.0003)", value: 1.0003 },
    { label: "Ice (1.31)", value: 1.31 },
    { label: "Water (1.333)", value: 1.333 },
    { label: "Ethanol (1.361)", value: 1.361 },
    { label: "Acrylic (1.49)", value: 1.49 },
    { label: "Crown Glass (1.52)", value: 1.52 },
    { label: "Flint Glass (1.62)", value: 1.62 },
    { label: "Sapphire (1.77)", value: 1.77 },
    { label: "Diamond (2.42)", value: 2.42 },
];

function radToDeg(rad: number) {
    return (rad * 180) / Math.PI;
}

function degToRad(deg: number) {
    return (deg * Math.PI) / 180;
}

export default function Simulator() {
    const [n1, setN1] = useState(1.0003);
    const [n2, setN2] = useState(1.333);
    const [incidentAngle, setIncidentAngle] = useState(30);

    const results = useMemo(() => {
        const index1 = Math.max(n1, 0.0001);
        const index2 = Math.max(n2, 0.0001);
        const theta1Rad = degToRad(incidentAngle);

        const sinTheta2 = (index1 / index2) * Math.sin(theta1Rad);
        const totalInternalReflection = Math.abs(sinTheta2) > 1;

        let theta2Deg: number | null = null;
        let reflectance = 100;
        let transmittance = 0;

        if (!totalInternalReflection) {
            const theta2Rad = Math.asin(Math.min(1, Math.max(-1, sinTheta2)));
            theta2Deg = Math.max(0, radToDeg(theta2Rad));

            const sumSin = Math.sin(theta1Rad + theta2Rad);
            const sumTan = Math.tan(theta1Rad + theta2Rad);

            if (Math.abs(sumSin) > 1e-6 && Math.abs(sumTan) > 1e-6) {
                const rs = Math.sin(theta1Rad - theta2Rad) / sumSin;
                const rp = Math.tan(theta1Rad - theta2Rad) / sumTan;
                const R = ((rs ** 2 + rp ** 2) / 2) * 100;
                reflectance = Number.isFinite(R) ? Math.min(100, Math.max(0, R)) : 0;
                transmittance = Math.max(0, 100 - reflectance);
            } else {
                reflectance = 0;
                transmittance = 100;
            }
        }

        const criticalAngle =
            index1 > index2 ? radToDeg(Math.asin(index2 / index1)) : null;

        return {
            totalInternalReflection,
            refractedAngle: theta2Deg,
            reflectionAngle: incidentAngle,
            criticalAngle,
            reflectance,
            transmittance,
            speedRatio: index2 !== 0 ? index2 / index1 : 1,
        };
    }, [incidentAngle, n1, n2]);

    const matchMaterialValue = (value: number) => {
        const match = MATERIALS.find((item) => Math.abs(item.value - value) < 1e-3);
        return match ? match.value.toString() : "custom";
    };

    const handleReset = () => {
        setN1(1.0003);
        setN2(1.333);
        setIncidentAngle(30);
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <Navbar />
            <main className="pt-28 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto space-y-10">
                    <header className="text-center space-y-3">
                        <p className="text-sm uppercase tracking-[0.35em] text-blue-400">
                            Optics Tool
                        </p>
                        <h1 className="text-4xl md:text-5xl font-semibold text-white">
                            Snell&apos;s Law Refraction Simulator
                        </h1>
                        <p className="text-base md:text-lg text-slate-300 max-w-4xl mx-auto">
                            Explore how light refracts and reflects when transitioning between
                            mediums. Adjust refractive indices and incidence angle to observe
                            changes in reflection, refraction, and critical angle.
                        </p>
                    </header>

                    <div className="grid gap-8 lg:grid-cols-[400px_minmax(0,1fr)]">
                        <section className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl shadow-slate-900/30">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-white">Parameters</h2>
                                <Button
                                    onClick={handleReset}
                                    variant="secondary"
                                    className="px-4 py-2 text-sm bg-slate-800/60 border border-slate-700 text-slate-200 hover:bg-slate-700"
                                >
                                    Reset
                                </Button>
                            </div>

                            <div className="space-y-5">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm text-slate-300">
                                        <label htmlFor="medium1">Medium 1 refractive index</label>
                                        <span className="font-mono text-slate-200">
                                            n₁ = {n1.toFixed(4)}
                                        </span>
                                    </div>
                                    <select
                                        id="medium1"
                                        value={matchMaterialValue(n1)}
                                        onChange={(event) => {
                                            if (event.target.value === "custom") return;
                                            setN1(parseFloat(event.target.value));
                                        }}
                                        className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                                    >
                                        <option value="custom">Custom value</option>
                                        {MATERIALS.map((material) => (
                                            <option key={material.label} value={material.value}>
                                                {material.label}
                                            </option>
                                        ))}
                                    </select>
                                    <input
                                        type="number"
                                        inputMode="decimal"
                                        min="0.0001"
                                        step="0.0001"
                                        value={n1}
                                        onChange={(event) =>
                                            setN1(Math.max(0.0001, Number(event.target.value)))
                                        }
                                        className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm text-slate-300">
                                        <label htmlFor="medium2">Medium 2 refractive index</label>
                                        <span className="font-mono text-slate-200">
                                            n₂ = {n2.toFixed(4)}
                                        </span>
                                    </div>
                                    <select
                                        id="medium2"
                                        value={matchMaterialValue(n2)}
                                        onChange={(event) => {
                                            if (event.target.value === "custom") return;
                                            setN2(parseFloat(event.target.value));
                                        }}
                                        className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                                    >
                                        <option value="custom">Custom value</option>
                                        {MATERIALS.map((material) => (
                                            <option key={material.label} value={material.value}>
                                                {material.label}
                                            </option>
                                        ))}
                                    </select>
                                    <input
                                        type="number"
                                        inputMode="decimal"
                                        min="0.0001"
                                        step="0.0001"
                                        value={n2}
                                        onChange={(event) =>
                                            setN2(Math.max(0.0001, Number(event.target.value)))
                                        }
                                        className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                                    />
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between text-sm text-slate-300">
                                        <label htmlFor="angle">Incident angle (θ₁)</label>
                                        <span className="font-mono text-slate-200">
                                            {incidentAngle.toFixed(1)}°
                                        </span>
                                    </div>
                                    <input
                                        id="angle"
                                        type="range"
                                        min="0"
                                        max="89.9"
                                        step="0.1"
                                        value={incidentAngle}
                                        onChange={(event) =>
                                            setIncidentAngle(Number(event.target.value))
                                        }
                                        className="w-full accent-fuchsia-500"
                                    />
                                    <input
                                        type="number"
                                        inputMode="decimal"
                                        min="0"
                                        max="89.9"
                                        step="0.1"
                                        value={incidentAngle}
                                        onChange={(event) =>
                                            setIncidentAngle(
                                                Math.min(89.9, Math.max(0, Number(event.target.value)))
                                            )
                                        }
                                        className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
                                    />
                                </div>
                            </div>
                        </section>

                        <section className="space-y-6">
                            <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-900/30 space-y-6">
                                <h2 className="text-xl font-semibold text-white">Results</h2>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <ResultCard
                                        label="Reflection angle"
                                        value={`${results.reflectionAngle.toFixed(2)}°`}
                                    />
                                    <ResultCard
                                        label="Refraction angle"
                                        value={
                                            results.totalInternalReflection ||
                                                results.refractedAngle === null
                                                ? "—"
                                                : `${results.refractedAngle.toFixed(2)}°`
                                        }
                                        highlight={results.totalInternalReflection}
                                        helper={
                                            results.totalInternalReflection
                                                ? "Total internal reflection"
                                                : undefined
                                        }
                                    />
                                    <ResultCard
                                        label="Critical angle"
                                        value={
                                            results.criticalAngle !== null
                                                ? `${results.criticalAngle.toFixed(2)}°`
                                                : "Not defined (n₁ ≤ n₂)"
                                        }
                                    />
                                    <ResultCard
                                        label="Speed ratio (v₂ / v₁)"
                                        value={results.speedRatio.toFixed(3)}
                                    />
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <ResultCard
                                        label="Reflectance"
                                        value={`${results.reflectance.toFixed(1)} %`}
                                    />
                                    <ResultCard
                                        label="Transmittance"
                                        value={`${results.transmittance.toFixed(1)} %`}
                                    />
                                </div>

                                {results.totalInternalReflection && (
                                    <div className="rounded-2xl border border-fuchsia-500/40 bg-fuchsia-500/10 p-4 text-sm text-fuchsia-200">
                                        The incident angle exceeds the critical angle. Light is
                                        fully reflected back into medium 1 and no refraction occurs.
                                    </div>
                                )}
                            </div>

                            <Diagram
                                incidentAngle={incidentAngle}
                                refractedAngle={results.refractedAngle ?? undefined}
                                totalInternalReflection={results.totalInternalReflection}
                            />
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}

type ResultCardProps = {
    label: string;
    value: string;
    helper?: string;
    highlight?: boolean;
};

function ResultCard({
    label,
    value,
    helper,
    highlight = false,
}: ResultCardProps) {
    return (
        <div
            className={`rounded-2xl border px-4 py-3 transition ${highlight
                ? "border-fuchsia-500/60 bg-fuchsia-500/10 text-fuchsia-100"
                : "border-slate-800 bg-slate-900/60"
                }`}
        >
            <p className="text-xs uppercase tracking-widest text-slate-400">
                {label}
            </p>
            <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
            {helper && <p className="mt-1 text-xs text-fuchsia-200">{helper}</p>}
        </div>
    );
}

type DiagramProps = {
    incidentAngle: number;
    refractedAngle?: number;
    totalInternalReflection: boolean;
};

function Diagram({
    incidentAngle,
    refractedAngle,
    totalInternalReflection,
}: DiagramProps) {

    const width = 800;
    const height = 360;
    const cx = width / 2;
    const cy = height / 2;
    const L = 420;

    const theta1 = (incidentAngle * Math.PI) / 180;
    const sin1 = Math.sin(theta1);
    const cos1 = Math.cos(theta1);

    const incStart = { x: cx - L * sin1, y: cy - L * cos1 };
    const intersection = { x: cx, y: cy };

    const reflEnd = { x: cx + L * sin1, y: cy - L * cos1 };

    let refrEnd: { x: number; y: number } | null = null;
    let theta2 = 0;
    if (refractedAngle !== undefined) {
        theta2 = (refractedAngle * Math.PI) / 180;
        const sin2 = Math.sin(theta2);
        const cos2 = Math.cos(theta2);

        refrEnd = { x: cx + L * sin2, y: cy + L * cos2 };
    }

    function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
        return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
    }

    function arcPath(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
        const start = polarToCartesian(cx, cy, r, startAngle);
        const end = polarToCartesian(cx, cy, r, endAngle);
        const largeArcFlag = Math.abs(endAngle - startAngle) <= Math.PI ? 0 : 1;
        const sweepFlag = endAngle > startAngle ? 1 : 0;
        return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} ${sweepFlag} ${end.x} ${end.y}`;
    }

    const incidentVecAngle = Math.atan2(incStart.y - cy, incStart.x - cx);
    const reflectedVecAngle = Math.atan2(reflEnd.y - cy, reflEnd.x - cx);
    const refractedVecAngle = refrEnd ? Math.atan2(refrEnd.y - cy, refrEnd.x - cx) : 0;

    const arcRadius = 44;

    return (
        <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-900/30">
            <h2 className="text-xl font-semibold text-white mb-4">Ray diagram</h2>
            <div className="mx-auto w-full max-w-xl">
                <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="240" preserveAspectRatio="xMidYMid meet">
                    <defs>
                        <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                            <path d="M 0 0 L 10 5 L 0 10 z" fill="#fff" />
                        </marker>
                    </defs>


                    <line x1={0} y1={cy} x2={width} y2={cy} stroke="#374151" strokeWidth={2} />

                    <line x1={cx} y1={cy - 120} x2={cx} y2={cy + 120} stroke="#9CA3AF" strokeWidth={1} strokeDasharray="4 4" />


                    <line x1={incStart.x} y1={incStart.y} x2={intersection.x} y2={intersection.y}
                        stroke="#F472B6" strokeWidth={3} strokeLinecap="round" markerEnd="url(#arrow)" />


                    <line x1={intersection.x} y1={intersection.y} x2={reflEnd.x} y2={reflEnd.y}
                        stroke="#60A5FA" strokeWidth={3} strokeLinecap="round" markerEnd="url(#arrow)" />


                    {refrEnd && !totalInternalReflection && (
                        <line x1={intersection.x} y1={intersection.y} x2={refrEnd.x} y2={refrEnd.y}
                            stroke="#34D399" strokeWidth={3} strokeLinecap="round" markerEnd="url(#arrow)" />
                    )}


                    <path d={arcPath(cx, cy, arcRadius, -Math.PI / 2, incidentVecAngle)} fill="none" stroke="#F472B6" strokeWidth={2} />
                    <text x={polarToCartesian(cx, cy, arcRadius + 14, (incidentVecAngle - Math.PI / 2) / 2 + Math.PI / 2).x}
                        y={polarToCartesian(cx, cy, arcRadius + 14, (incidentVecAngle - Math.PI / 2) / 2 + Math.PI / 2).y - 4}
                        fontSize={12} fill="#F472B6">
                        {incidentAngle.toFixed(1)}°
                    </text>


                    <path d={arcPath(cx, cy, arcRadius, -Math.PI / 2, reflectedVecAngle)} fill="none" stroke="#60A5FA" strokeWidth={2} />


                    {refrEnd && !totalInternalReflection && (
                        <>
                            <path d={arcPath(cx, cy, arcRadius, Math.PI / 2, refractedVecAngle)} fill="none" stroke="#34D399" strokeWidth={2} />
                            <text x={polarToCartesian(cx, cy, arcRadius + 14, (refractedVecAngle + Math.PI / 2) / 2 + Math.PI / 2).x}
                                y={polarToCartesian(cx, cy, arcRadius + 14, (refractedVecAngle + Math.PI / 2) / 2 + Math.PI / 2).y + 16}
                                fontSize={12} fill="#34D399">
                                {refractedAngle!.toFixed(1)}°
                            </text>
                        </>
                    )}


                    <rect x={12} y={12} rx={8} ry={8} width={110} height={28} fill="#0f172a" opacity={0.8} />
                    <text x={18} y={32} fontSize={12} fill="#cbd5e1">Medium 2</text>

                    <rect x={12} y={cy - 40} rx={8} ry={8} width={110} height={28} fill="#0f172a" opacity={0.8} />
                    <text x={18} y={cy - 20} fontSize={12} fill="#cbd5e1">Interface</text>

                    <rect x={12} y={cy + 12} rx={8} ry={8} width={110} height={28} fill="#0f172a" opacity={0.8} />
                    <text x={18} y={cy + 32} fontSize={12} fill="#cbd5e1">Medium 1</text>


                    <circle cx={cx} cy={cy} r={3} fill="#fff" />
                </svg>
            </div>
            {totalInternalReflection && (
                <div className="mt-3 rounded-md bg-fuchsia-500/10 border border-fuchsia-500/30 px-3 py-2 text-sm text-fuchsia-200">
                    Total internal reflection — no refracted ray.
                </div>
            )}
        </div>
    );
}