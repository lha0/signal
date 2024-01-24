import { useEffect, useState } from "react";
import { logInFunction } from "../services/LogInService";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/actions/sessionActions";
import { useLocation, useNavigate } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { CameraControls } from "../components/CameraControls";
import Galaxy from "../components/Galaxy";
import { Stars } from "../components/Stars";
import Search from "../components/common/Search";
import Profile from "../components/common/Profile";
import { doubleLineFunction } from "../services/DoubleLineService";
import * as THREE from "three";
import { allUserFunction } from "../services/AllUserService";
import Star from "../components/Star";
import { getRandomInt } from "../utils/random";
import { Line, OrbitControls } from "@react-three/drei";

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    position: absolute; // 절대 위치 지정
    top: 0; // 상단에서 0px
    left: 0; // 왼쪽에서 0px
    display: flex; // Flexbox를 사용해 내부 요소 정렬
    justify-content: center; // 수평 중앙 정렬 (은하수를 중앙에 배치)
    align-items: center; // 수직 중앙 정렬 (은하수를 중앙에 배치)
    font-family: "Skyer";
    z-index: 98;
`;

const Title = styled.h1`
    position: absolute; // 절대 위치 지정
    top: 80px; // 상단에서 20px
    left: 50px; // 왼쪽에서 20px
    color: white; // 글씨 색상
    font-size: 120px;
    z-index: 100; // 캔버스보다 상위 레이어에 위치하도록 z-index 설정
`;
const IDTitle = styled.h2`
    position: absolute; // 절대 위치 지정
    top: 350px; // 상단에서 20px
    left: 50px; // 왼쪽에서 20px
    color: white; // 글씨 색상
    font-size: 60px;
    z-index: 100; // 캔버스보다 상위 레이어에 위치하도록 z-index 설정
`;

const ID = styled.input`
    position: absolute; // 절대 위치 지정
    top: 500px; // 상단에서 20px
    left: 50px; // 왼쪽에서 20px
    width: 350px;
    height: 60px;
    padding-left: 10px;
    border-radius: 10px;
    color: black; // 글씨 색상
    background-color: white;
    opacity: 0.5;
    font-size: 40px;
    font-family: "Skyer";
    z-index: 100; // 캔버스보다 상위 레이어에 위치하도록 z-index 설정
`;

const PWTitle = styled.h2`
    position: absolute; // 절대 위치 지정
    top: 550px; // 상단에서 20px
    left: 50px; // 왼쪽에서 20px
    color: white; // 글씨 색상
    font-size: 60px;
    z-index: 100; // 캔버스보다 상위 레이어에 위치하도록 z-index 설정
`;
const PW = styled.input`
    position: absolute; // 절대 위치 지정
    top: 700px; // 상단에서 20px
    left: 50px; // 왼쪽에서 20px
    width: 350px;
    height: 60px;
    padding-left: 10px;
    border-radius: 10px;
    color: black; // 글씨 색상
    background-color: white; // 배경색 투명
    opacity: 0.5;
    font-size: 40px;
    font-family: "Skyer";
    z-index: 100; // 캔버스보다 상위 레이어에 위치하도록 z-index 설정
`;
const LogInButton = styled.button`
    position: absolute; // 절대 위치 지정
    top: 900px; // 상단에서 20px
    left: 50px; // 왼쪽에서 20px
    border: none;
    color: white; // 글씨 색상
    background-color: transparent; // 배경색 투명
    font-size: 60px;
    font-family: "Skyer";
    z-index: 100; // 캔버스보다 상위 레이어에 위치하도록 z-index 설정
`;
const ToRegisterBtn = styled.button`
    position: absolute; // 절대 위치 지정
    top: 1000px; // 상단에서 20px
    left: 50px; // 왼쪽에서 20px
    border: none;
    color: white; // 글씨 색상
    background-color: transparent; // 배경색 투명
    font-size: 60px;
    font-family: "Skyer";
    z-index: 100; // 캔버스보다 상위 레이어에 위치하도록 z-index 설정
`;

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
    z-index: 100;
`;

const LogInAndMove = () => {
    const [Id, setId] = useState("");
    const [Pw, setPw] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleID = (e) => {
        setId(e.target.value);
    };

    const handlePW = (e) => {
        setPw(e.target.value);
    };

    const handleSubmit = async (e) => {
        const result = await logInFunction(Id, Pw);

        if (result && result !== "로그인 실패" && result !== "요청 실패") {
            console.log("로그인 성공 :", result);
            localStorage.setItem("jwtToken", result.token.accessToken);
            dispatch(loginSuccess(result));
            localStorage.setItem("loggedInUser", JSON.stringify(result.user));

            setIsLoggedIn(true);
        } else {
            console.error(result);
        }
    };

    const handleRegister = () => {
        navigate("/signup");
    };

    const location = useLocation();
    //const userInfo = { ...location.state.user };
    const userInfo = JSON.parse(localStorage.getItem("loggedInUser"));
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

    const STAR_MIN_SIZE = 5;
    const STAR_MAX_SIZE = 10;

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
            <Canvas
                style={{
                    width: "100vw",
                    height: "100vh",
                    position: "absolute",
                    zIndex: "-1",
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

                {isLoggedIn ? (
                    <>
                        {" "}
                        <CameraControls position={position} target={target} />
                        {console.log(position)}
                    </>
                ) : (
                    <>
                        {" "}
                        <OrbitControls />
                        {console.log(position)}
                    </>
                )}
            </Canvas>

            {!isLoggedIn ? (
                <Container>
                    <Title>Signal</Title>
                    <IDTitle>ID</IDTitle>
                    <ID
                        type="text"
                        value={Id}
                        placeholder="ID"
                        onInput={handleID}
                    />
                    <PWTitle>PW</PWTitle>
                    <PW
                        type="text"
                        value={Pw}
                        placeholder="PW"
                        onInput={handlePW}
                    />
                    <LogInButton onClick={handleSubmit}>Log In</LogInButton>
                    <ToRegisterBtn onClick={handleRegister}>
                        Register
                    </ToRegisterBtn>
                </Container>
            ) : (
                <Container>
                    <AllConnectionBtn onClick={handleAllConnection} />
                    <SearchContainer>
                        <Search />
                    </SearchContainer>
                    <ProfileContainer isopen={isProfileOpen}>
                        {isProfileOpen && (
                            <Profile
                                userInfo={userInfo}
                                onClose={closeProfile}
                            />
                        )}
                    </ProfileContainer>
                </Container>
            )}
        </>
    );
};

export default LogInAndMove;
