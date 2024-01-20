import { Canvas } from "@react-three/fiber";
import React, { useState } from "react";
import { CameraControls } from "./CameraControls";
import { Stars } from "./Stars";
import { genBackgroundStars } from "./genBackgroundStars";

export default function View() {
    const [position, setPosition] = useState({ x: -30, y: 30, z: -30 });
    const [target, setTarget] = useState({ x: 0, y: 0, z: 0 });

    const positionsAndTargets = {
        star1: {
            position: { x: -20, y: 0, z: 0 },
            target: { x: 0, y: 0, z: 0 },
        },
        star2: {
            position: { x: -20, y: 20, z: 0 },
            target: { x: 0, y: 20, z: 0 },
        },
    };

    const handleOnClick = (objectKey) => {
        // objectKey에 해당하는 position과 target을 설정
        const { position, target } = positionsAndTargets[objectKey];
        setPosition(position);
        setTarget(target);
    };

    return (
        <>
            <Canvas
                style={{ height: "100vh" }}
                camera={{
                    position: [10000, 10000, 10000],
                    rotation: [-0.5, 0, 0],
                    far: 100000,
                }}
            >
                <color attach="background" args={["#000"]} />
                <axesHelper args={[100, 100, 100]} />
                <ambientLight intensity={1} />
                <CameraControls position={position} target={target} />
                {genBackgroundStars()}
                <group rotation-y={-Math.PI / 2}>
                    <Stars
                        locate={[0, 0, 0]}
                        onClick={() => handleOnClick("star1")}
                    />
                    <Stars
                        locate={[0, 0, 20]}
                        onClick={() => handleOnClick("star2")}
                    />
                </group>
            </Canvas>
        </>
    );
}
