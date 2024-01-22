import { Canvas } from "@react-three/fiber";
import React, { useState } from "react";
import { CameraControls } from "./CameraControls";
import { Stars } from "./Stars";
import { genBackgroundStars } from "./genBackgroundStars";
import Galaxy from "./Galaxy";
import { useLocation } from "react-router-dom";

const TEMP_DATA = {
    id: "test8",
    password:
        "{bcrypt}$2a$10$9qLQ1N2HC8Yc6BTNTqgJz.pl2whLOr.poXprAmEpXyqYt.UsRsLJO",
    name: null,
    photo: null,
    birth: null,
    region: null,
    gender: null,
    introduction: null,
    x_coordinate: 751.136,
    y_coordinate: 456.182,
    z_coordinate: 392.797,
    signals: 7,
};

export default function View() {
    const location = useLocation();
    const userInfo = { ...location.state.user };
    const user_x = userInfo.x_coordinate;
    const user_y = userInfo.y_coordinate;
    const user_z = userInfo.z_coordinate;

    //카메라의 position
    const [position, setPosition] = useState({
        x: user_x - 20,
        y: user_y + 5,
        z: user_z + 10,
    });

    //카메라가 바라볼 target 위치
    const [target, setTarget] = useState({
        x: user_x,
        y: user_y,
        z: user_z,
    });

    const positionsAndTargets = {
        star1: {
            position: {
                x: user_x - 20,
                y: user_y,
                z: user_z,
            },
            target: {
                x: user_x,
                y: user_y,
                z: user_z,
            },
        },
        star2: {
            position: { x: -30, y: 100, z: 0 },
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
                    position: [position.x, position.y, position.z],
                    rotation: [0, 0, 0],
                    far: 1000,
                }}
            >
                <color attach="background" args={["#000"]} />
                <axesHelper args={[1000, 1000, 1000]} />
                <ambientLight intensity={1} />
                <CameraControls position={position} target={target} />
                {/* Galaxy()*/}
                <group rotation-y={-Math.PI / 2}>
                    <Stars
                        locate={[
                            TEMP_DATA.z_coordinate,
                            TEMP_DATA.x_coordinate,
                            TEMP_DATA.y_coordinate,
                        ]}
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
