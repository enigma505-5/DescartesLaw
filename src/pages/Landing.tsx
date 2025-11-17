import LandingContent from "../components/ui/landingconte nt";
import LightRays from "../components/ui/lightrays";


export default function Landing() {
    return (
        <div className="bg-gray-900 relative min-h-screen overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <LightRays
                    raysOrigin="top-center"
                    raysColor="#ffffffff"
                    raysSpeed={1.5}
                    lightSpread={0.8}
                    rayLength={1.2}
                    followMouse={true}
                    mouseInfluence={0.1}
                    noiseAmount={0.1}
                    distortion={0.05}
                    className="w-full h-full"
                />
            </div>
            <LandingContent />
        </div>
    );
}