import { Canvas } from "@react-three/fiber";
import React, { useState } from "react";
import { CameraControls } from "../components/CameraControls";
import { Stars } from "../components/Stars";
import Galaxy from "../components/Galaxy";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Profile from "../components/common/Profile";
import styled from "styled-components";
import Search from "../components/common/Search";

const SearchContainer = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    width: 400px;
    height: 50px;
    z-index: 100;
`;

const AllConnectionBtn = styled.button`
    position: absolute;
    top: 10px;
    left: 10px;
    width: 50px;
    height: 50px;
    z-index: 100;
`;

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`;

const ProfileContainer = styled.div`
    position: absolute;
    width: 50%; // or any other size
    height: 65%; // or any other size
    background-color: rgba(255, 255, 255, 0.4); // Semi-transparent white
    border-radius: 20px;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    display: ${(props) => (props.isopen ? "block" : "none")};
    overflow: auto; // If content is too big, scroll
    top: 15%; // Adjust as needed
    left: 25%; // Adjust as needed
`;

/*
{
        birth: null,
        color: null,
        gender: null,
        id: "test8",
        introduction: null,
        name: null,
        password:
            "{bcrypt}$2a$10$9qLQ1N2HC8Yc6BTNTqgJz.pl2whLOr.poXprAmEpXyqYt.UsRsLJO",
        photo: null,
        region: null,
        signals: 11,
        x_coordinate: 751.136,
        y_coordinate: 456.182,
        z_coordinate: 392.797,
    };
*/

export default function OtherProfile() {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();

    const userInfo = { ...location.state.user };
    console.log("userinfo", userInfo);
    const user_x = userInfo.x_coordinate;
    const user_y = userInfo.y_coordinate;
    const user_z = userInfo.z_coordinate;

    //profile 모달창
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const openProfile = () => {
        setIsProfileOpen(true);
    };

    const closeProfile = () => {
        setIsProfileOpen(false);
    };

    const handleAllConnection = () => {
        navigate("/allconnection");
    };

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
    return (
        <>
            <AllConnectionBtn onClick={handleAllConnection} />
            <SearchContainer>
                <Search />
            </SearchContainer>
            <Container>
                <Canvas
                    style={{ width: "100%", height: "100%" }}
                    camera={{
                        position: [10000, 10000, 10000],
                        rotation: [0.5, 0, 0],
                        far: 1000,
                    }}
                >
                    <color attach="background" args={["#000"]} />
                    <axesHelper args={[1000, 1000, 1000]} />
                    <ambientLight intensity={1} />
                    <CameraControls position={position} target={target} />
                    {Galaxy()}

                    <group rotation-y={-Math.PI / 2}>
                        <Stars
                            locate={[user_z, user_x, user_y]}
                            onClick={openProfile}
                        />
                    </group>
                </Canvas>

                <ProfileContainer isopen={isProfileOpen}>
                    {isProfileOpen && (
                        <Profile userInfo={userInfo} onClose={closeProfile} />
                    )}
                </ProfileContainer>
            </Container>
        </>
    );
}
