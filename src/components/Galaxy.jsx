import { useControls } from "leva";
import { gaussianRandom, getRandomInt } from "../utils/random";
import Star from "./Star";
import * as THREE from "three";

function spiral(x, y, z, offset, SPIRAL, ARM_X_DIST) {
    const r = Math.sqrt(x ** 2 + z ** 2);
    let theta = offset;
    theta += x > 0 ? Math.atan(z / x) : Math.atan(z / x) + Math.PI;
    theta += (r / ARM_X_DIST) * SPIRAL;
    return new THREE.Vector3(r * Math.cos(theta), y, r * Math.sin(theta));
}

export default function Galaxy() {
    const stars = [];
    const SPIRAL = 3.5;
    const ARM_X_MEAN = 2000;
    const ARM_X_DIST = 3000;
    const ARM_Z_MEAN = 1500;
    const ARM_Z_DIST = 1000;
    const GALAXY_THICKNESS = 500;
    const NUM_STARS = 4000;
    const STAR_MIN_SIZE = 5;
    const STAR_MAX_SIZE = 15;
    const ARMS = 2;

    for (let arm = 0; arm < ARMS; arm++) {
        for (let star = 0; star < NUM_STARS / ARMS; star++) {
            const size = getRandomInt(STAR_MIN_SIZE, STAR_MAX_SIZE);
            const pos = spiral(
                gaussianRandom(ARM_X_MEAN, ARM_X_DIST),
                gaussianRandom(0, GALAXY_THICKNESS),
                gaussianRandom(ARM_Z_MEAN, ARM_Z_DIST),
                (arm * 2 * Math.PI) / ARMS,
                SPIRAL,
                ARM_X_DIST
            );

            stars.push(
                <Star
                    position={pos}
                    size={size}
                    isRotate={true}
                    onClick={() => {}}
                />
            );
        }
    }

    return <group>{stars}</group>;
}
