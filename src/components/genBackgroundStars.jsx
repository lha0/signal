import { getRandomInt } from "../utils/random";
import * as THREE from "three";
import Star from "./Star";

export function genBackgroundStars() {
    const stars = [];
    for (let i = 0; i < 500; i++) {
        const size = getRandomInt(10, 15);
        const pos = new THREE.Vector3(
            getRandomInt(-1000, 1000),
            getRandomInt(-1000, 1000),
            getRandomInt(-1000, 1000)
        );
        stars.push(<Star position={pos} size={size} isRotate={true} />);
    }
    return stars;
}
