import "./App.css";
import { Route, Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import styled from "styled-components";
import Register from "./pages/Register";
import { Canvas } from "@react-three/fiber";
import Galaxy from "./components/Galaxy";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import Star from "./components/Star";
import { useEffect, useState } from "react";

import * as THREE from "three";
import { Line, OrbitControls } from "@react-three/drei";
import { doubleLineFunction } from "./services/DoubleLineService";
import { allUserFunction } from "./services/AllUserService";
import { getRandomInt } from "./utils/random";
import Chat from "./components/Chat";

function App() {
    const STAR_MIN_SIZE = 5;
    const STAR_MAX_SIZE = 15;

    const [stars, setStars] = useState([]);
    const [linePoints, setLinePoints] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await doubleLineFunction();
            if (result && result !== "요청 실패") {
                console.log("성공 :", result);
                const newPointsArray = result
                    .map((point) => [
                        new THREE.Vector3(
                            point.user1XCoordinate,
                            point.user1YCoordinate,
                            point.user1ZCoordinate
                        ),
                        new THREE.Vector3(
                            point.user2XCoordinate,
                            point.user2YCoordinate,
                            point.user2ZCoordinate
                        ),
                    ])
                    .flat();
                setLinePoints(newPointsArray);
            } else {
                console.error(result);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const result = await allUserFunction();
            if (result && result !== "요청 실패") {
                console.log("성공 :", result);
                const newStars = result.map((user) => {
                    const userPoint = new THREE.Vector3(
                        user.x_coordinate,
                        user.y_coordinate,
                        user.z_coordinate
                    );
                    const size = getRandomInt(STAR_MIN_SIZE, STAR_MAX_SIZE);
                    return (
                        <Star
                            key={user.id}
                            position={userPoint}
                            size={size}
                            isRotate={false}
                        />
                    );
                });
                setStars(newStars);
            } else {
                console.error(result);
            }
        };

        fetchData();
    }, []);
    return (
        <>
            <Routes>
                <Route path="/" Component={Home} />
                <Route path="/signup" Component={Register} />
                <Route path="/chatting" Component={Chat} />
            </Routes>
            {
                <Canvas
                    style={{
                        width: "100vw",
                        height: "100vh",
                        position: "absolute",
                        zIndex: "-3",
                    }}
                    camera={{
                        position: [10000, 10000, 10000],
                        rotation: [0.5, 0, 0],
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

                    <color attach="background" args={["#000"]} />
                    <axesHelper args={[1000, 1000, 1000]} />
                    <ambientLight intensity={4} />
                    <OrbitControls />
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
                </Canvas>
            }
        </>
    );
}

export default App;
