import { useEffect, useState } from "react";
import { doubleLineFunction } from "../services/DoubleLineService";
import styled from "styled-components";
import { Canvas } from "@react-three/fiber";
import { CameraControls } from "../components/CameraControls";
import { Line, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import Galaxy from "../components/Galaxy";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { getRandomInt } from "../utils/random";
import Star from "../components/Star";

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
    const [points, setPoints] = useState([
        {
            user1xcoordinate: 1,
            user1ycordinate: 1,
            user1zcoordinate: 1,
            user2xcoordinate: 1000,
            user2ycoordinate: 1000,
            user2zcoordinate: 1000,
        },
        {
            user1xcoordinate: 500,
            user1ycordinate: 1000,
            user1zcoordinate: 1000,
            user2xcoordinate: 2000,
            user2ycoordinate: 1000,
            user2zcoordinate: 100,
        },
        {
            user1xcoordinate: 2000,
            user1ycordinate: 1000,
            user1zcoordinate: 100,
            user2xcoordinate: 2000,
            user2ycoordinate: 500,
            user2zcoordinate: 2300,
        },
    ]);

    const pointsArray = [];

    points.forEach((point) => {
        const start = new THREE.Vector3(
            point.user1xcoordinate,
            point.user1ycordinate,
            point.user1zcoordinate
        );
        const end = new THREE.Vector3(
            point.user2xcoordinate,
            point.user2ycoordinate,
            point.user2zcoordinate
        );
        pointsArray.push(start, end);
        console.log("pointsArray", pointsArray);
    });

    const stars = [];

    for (let star = 0; star < pointsArray.length; star++) {
        const size = getRandomInt(STAR_MIN_SIZE, STAR_MAX_SIZE);
        const pos = pointsArray[star];

        stars.push(<Star position={pos} size={size} isRotate={false} />);
    }
    /* useEffect(() => {
        const fetchData = async () => {
            const result = await doubleLineFunction();
            if (result && result !== "요청 실패") {
                console.log("성공 :", result);
                setPoints(result);
            } else {
                console.error(result);
            }
        };

        fetchData();
    }, []);*/

    return (
        <>
            <div>
                <h1>AllConnection</h1>
            </div>
            <Container>
                <Canvas
                    style={{
                        height: "100vh",
                        position: "absolute",
                        zIndex: 109,
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
                    <axesHelper args={[1000, 1000, 1000]} />
                    <OrbitControls />
                    {
                        //Galaxy()
                    }
                    <group position={[0, 0, 0]}>
                        {stars}
                        <Line
                            points={pointsArray}
                            color={"#fff"}
                            lineWidth={10}
                            transparent
                            opacity={0.3}
                        />
                    </group>
                </Canvas>
            </Container>
        </>
    );
};

export default AllConnection;
