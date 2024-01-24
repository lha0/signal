import { useMemo } from "react";
import Star from "./Star";
import { CameraControls } from "./CameraControls";
import { Line, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Galaxy from "./Galaxy";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

const SceneCanvas = ({ isLoggedIn, position, target, stars, linePoints }) => {
    const memoizedStars = useMemo(() => {
        console.log("stars", stars);
        return stars.map((star) => (
            <Star
                key={star.id}
                position={star.position}
                size={star.size}
                isRotate={star.isRotate}
            />
        ));
    }, [stars]);

    const memoizedLinePoints = useMemo(() => {
        console.log("linePoints", linePoints);
        return (
            linePoints.length > 0 && (
                <Line
                    points={linePoints}
                    color={"#fff"}
                    lineWidth={3}
                    transparent
                    opacity={0.2}
                />
            )
        );
    }, [linePoints]);

    const controls = isLoggedIn ? (
        <CameraControls position={position} target={target} />
    ) : (
        <OrbitControls />
    );

    return (
        <Canvas
            style={{
                width: "100vw",
                height: "100vh",
                position: "absolute",
                zIndex: "-1",
            }}
            camera={{
                position: [0, 10000, 0],
                far: 20000,
            }}
        >
            <EffectComposer>
                <Bloom
                    intensity={5}
                    mipmapBlur={true}
                    luminanceThreshold={0.1}
                    luminanceSmoothing={4}
                />
            </EffectComposer>
            <ambientLight color={"#fff"} intensity={4} />
            <color attach="background" args={["#000"]} />
            {controls}
            {Galaxy()}
            <group>
                {stars}
                {linePoints.length > 0 && (
                    <Line
                        points={linePoints}
                        color={"#fff"}
                        lineWidth={3}
                        transparent
                        opacity={0.2}
                    />
                )}
            </group>
            {/* ... */}
        </Canvas>
    );
};

export default SceneCanvas;
