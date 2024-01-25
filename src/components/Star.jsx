import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { getRandomInt } from "../utils/random";
import * as THREE from "three";
import { useControls } from "leva";

export default function Star({ position, size, isRotate, onClick }) {
    const COLOR = ["#88beff", "white", "#f9d397", "#fd6b6b", "#ffffac"];
    const colorIndex = getRandomInt(0, COLOR.length);
    const meshRef = useRef();
    const Y_AXIS = new THREE.Vector3(0, 1, 0);
    const DIST_LIMIT = 10000;

    useFrame((state, delta) => {
        if (isRotate) {
            const pos = meshRef.current.position.applyAxisAngle(
                Y_AXIS,
                delta / 20
            );
            const dist = state.camera.position.distanceTo(
                meshRef.current.position
            );
            if (dist > DIST_LIMIT)
                meshRef.current.scale.set(
                    dist / DIST_LIMIT,
                    dist / DIST_LIMIT,
                    dist / DIST_LIMIT
                );
            meshRef.current.position.x = pos.x;
            meshRef.current.position.y = pos.y;
            meshRef.current.position.z = pos.z;
        }
    });

    const handlePointerDown = (e) => {
        e.stopPropagation(); // 다른 이벤트 핸들러가 이벤트를 처리하지 못하게 합니다.
        onClick(); // openProfile 함수를 호출합니다.
    };

    return (
        <mesh
            ref={meshRef}
            position={position}
            onPointerDown={handlePointerDown}
        >
            <sphereGeometry args={[size, 32, 16]} />
            <meshStandardMaterial color={COLOR[colorIndex]} />
        </mesh>
    );
}
