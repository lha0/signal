import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const CameraControls = ({ position, target }) => {
    const { camera } = useThree();
    const ref = useRef(null);

    function cameraAnimate() {
        if (ref.current) {
            gsap.timeline().to(camera.position, {
                duration: 2,
                repeat: 0,
                x: position.x,
                y: position.y,
                z: position.z,
                ease: "power3.inOut",
            });

            gsap.timeline().to(ref.current.target, {
                duration: 2,
                repeat: 0,
                x: target.x,
                y: target.y,
                z: target.z,
                ease: "power3.inOut",
            });
        }
    }

    useEffect(() => {
        cameraAnimate();
    }, [target, position]);

    return <OrbitControls ref={ref} />;
};

export { CameraControls };
