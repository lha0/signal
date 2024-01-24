import React, { memo } from "react";
import Star from "./Star";
import { CameraControls } from "./CameraControls";
import { Line, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Galaxy from "./Galaxy";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

const SceneCanvas = memo(
    ({ isLoggedIn, position, target, stars, linePoints }) => {
        return (
            <Canvas
                style={{
                    width: "100vw",
                    height: "100vh",
                }}
                camera={{
                    position: [10000, 10000, 10000],
                    rotation: [0.5, 0, 0],
                    far: 23000,
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

                <color attach="background" args={["#000"]} />
                <ambientLight intensity={5} />
                {Galaxy()}

                <group>
                    {stars}
                    {linePoints.length > 0 && (
                        <Line
                            points={linePoints}
                            color={"#fff"}
                            lineWidth={5}
                            transparent
                            opacity={0.2}
                        />
                    )}
                </group>

                {isLoggedIn ? (
                    <>
                        {" "}
                        <CameraControls position={position} target={target} />
                        {console.log(position)}
                    </>
                ) : (
                    <>
                        {" "}
                        <OrbitControls />
                        {console.log(position)}
                    </>
                )}
            </Canvas>
        );
    }
);

export default SceneCanvas;
