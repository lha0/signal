import { useEffect, useState } from "react";
import { doubleLineFunction } from "../services/DoubleLineService";
import styled from "styled-components";
import { Canvas } from "@react-three/fiber";
import { CameraControls } from "../components/CameraControls";
import { FlyControls, Line, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import Galaxy from "../components/Galaxy";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { getRandomInt } from "../utils/random";
import Star from "../components/Star";
import { allUserFunction } from "../services/AllUserService";

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`;

const AllConnection = () => {
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
            <Container>
                <Canvas
                    style={{
                        height: "100vh",
                        position: "absolute",
                    }}
                    camera={{
                        position: [0, 10000, 0],
                        far: 200000,
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
                    {
                        //<axesHelper args={[1000, 1000, 1000]} />
                    }
                    <FlyControls />
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
            </Container>
        </>
    );
};

export default AllConnection;
