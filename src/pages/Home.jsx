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
import SceneCanvas from "../components/SceneCanvas";
import { searchFunction } from "../services/SearchService";
import { GrSearch } from "react-icons/gr";
import Register from "./Register";

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
    left: 100px; // 왼쪽에서 20px
    color: white; // 글씨 색상
    font-size: 120px;
    z-index: 100; // 캔버스보다 상위 레이어에 위치하도록 z-index 설정
`;
const IDTitle = styled.h2`
    position: absolute; // 절대 위치 지정
    top: 350px; // 상단에서 20px
    left: 100px; // 왼쪽에서 20px
    color: white; // 글씨 색상
    font-size: 60px;
    z-index: 100; // 캔버스보다 상위 레이어에 위치하도록 z-index 설정
`;

const ID = styled.input`
    position: absolute; // 절대 위치 지정
    top: 500px; // 상단에서 20px
    left: 100px; // 왼쪽에서 20px
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
    left: 100px; // 왼쪽에서 20px
    color: white; // 글씨 색상
    font-size: 60px;
    z-index: 100; // 캔버스보다 상위 레이어에 위치하도록 z-index 설정
`;
const PW = styled.input`
    position: absolute; // 절대 위치 지정
    top: 700px; // 상단에서 20px
    left: 100px; // 왼쪽에서 20px
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
    left: 100px; // 왼쪽에서 20px
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
    left: 100px; // 왼쪽에서 20px
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

const LogOut = styled.button`
    position: absolute;
    top: 10px;
    left: 10px;
    width: 50px;
    height: 50px;
    z-index: 100;
    background-color: transparent;
    border: none;
    color: white;
    font-size: 40px;
    font-family: "Skyer";
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
    z-index: 104;
`;

const SearchInnerContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    margin-top: 10px;
`;

const SearchBar = styled.input`
    width: 70%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 20px;
    font-family: "Skyer";
    font-size: 20px;
    color: white;
    padding-left: 14px;
`;
const SearchButton = styled(GrSearch)`
    width: 20%;
    height: 100%;
    color: white;
    font-size: 40px;
`;

const defaultPosition = {
    x: 0,
    y: 0,
    z: 0,
};

const Home = () => {
    const [Id, setId] = useState("");
    const [Pw, setPw] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState(
        JSON.parse(localStorage.getItem("loggedInUser")) || defaultPosition
    );

    let user_x = userInfo?.x_coordinate || defaultPosition.x;
    let user_y = userInfo?.y_coordinate || defaultPosition.y;
    let user_z = userInfo?.z_coordinate || defaultPosition.z;

    const handleID = (e) => {
        setId(e.target.value);
    };

    const handlePW = (e) => {
        setPw(e.target.value);
    };

    // 로그인 성공 시 호출되는 함수
    const handleLoginSuccess = (result) => {
        console.log("로그인 성공 :", result);
        localStorage.setItem("jwtToken", result.token.accessToken);
        dispatch(loginSuccess(result));
        localStorage.setItem("loggedInUser", JSON.stringify(result.user));

        const loggedInUser =
            JSON.parse(localStorage.getItem("loggedInUser")) || defaultPosition;
        setUserInfo(loggedInUser); // userInfo 상태 업데이트

        // 새로운 position과 target 설정
        updatePositionAndTarget(
            loggedInUser.x_coordinate,
            loggedInUser.y_coordinate,
            loggedInUser.z_coordinate
        );

        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
    };

    // position과 target 상태를 업데이트하는 함수
    const updatePositionAndTarget = (x, y, z) => {
        setPosition({
            x: x - 50,
            y: y + 15,
            z: z + 20,
        });
        setTarget({
            x: x,
            y: y,
            z: z,
        });
    };

    const handleSubmit = async (e) => {
        const result = await logInFunction(Id, Pw);
        if (result && result !== "로그인 실패" && result !== "요청 실패") {
            handleLoginSuccess(result);
        } else {
            console.error(result);
        }
    };

    const handleRegister = () => {
        navigate("/signup");
    };

    //카메라의 position
    const [position, setPosition] = useState({
        x: user_x - 50,
        y: user_y + 15,
        z: user_z + 20,
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
        console.log("clicked");
        setIsProfileOpen(true);
    };

    const closeProfile = () => {
        setIsProfileOpen(false);
    };

    const handleLogOut = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("loggedInUser");
        setIsLoggedIn(false);
        setUserInfo(defaultPosition);
        setPosition({ x: 10000, y: 10000, z: 10000 });
    };

    const STAR_MIN_SIZE = 5;
    const STAR_MAX_SIZE = 10;

    const [stars, setStars] = useState([]);
    const [linePoints, setLinePoints] = useState([]);

    useEffect(() => {
        if (userInfo && userInfo !== defaultPosition) {
            updatePositionAndTarget(
                userInfo.x_coordinate,
                userInfo.y_coordinate,
                userInfo.z_coordinate
            );
        }
    }, [userInfo]);

    const [signalSent, setSignalSent] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const result = await doubleLineFunction();
            if (result && result !== "요청 실패") {
                console.log("성공 :", result);
                const newPointsArray = result.map((point) => [
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
                ]);
                setLinePoints(newPointsArray);
                console.log("lines", linePoints);
            } else {
                console.error(result);
            }
        };

        fetchData();
    }, [signalSent]);

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
                            onClick={openProfile}
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

    useEffect(() => {
        const loggedIn = localStorage.getItem("isLoggedIn") === "true";
        setIsLoggedIn(loggedIn);
    }, []);

    const [searchId, setSearchId] = useState("");

    const handleSearchId = (e) => {
        setSearchId(e.target.value);
    };

    const handleSearchSubmit = async () => {
        const result = await searchFunction(searchId);

        if (result && result !== "검색 실패" && result !== "요청 실패") {
            const newUserPosition = {
                x: result.x_coordinate - 50, // 예를 들어 사용자 위치에서 조금 떨어진 곳으로 설정
                y: result.y_coordinate + 15,
                z: result.z_coordinate + 20,
            };
            setPosition(newUserPosition);
            setTarget({
                x: result.x_coordinate,
                y: result.y_coordinate,
                z: result.z_coordinate,
            });

            // 검색된 사용자의 정보로 userInfo 상태를 업데이트합니다.
            setUserInfo(result);
        } else {
            console.error(result);
        }
    };

    return (
        <>
            <SceneCanvas
                isLoggedIn={isLoggedIn}
                position={position}
                target={target}
                stars={stars}
                linePoints={linePoints}
            />

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
                <>
                    <LogOut onClick={handleLogOut}>Log out</LogOut>
                    <SearchContainer>
                        <SearchInnerContainer>
                            <SearchBar
                                type="text"
                                placeholder="아이디를 입력하세요"
                                onChange={handleSearchId}
                            />
                            <SearchButton onClick={handleSearchSubmit}>
                                검색
                            </SearchButton>
                        </SearchInnerContainer>
                    </SearchContainer>
                    <ProfileContainer isopen={isProfileOpen}>
                        {isProfileOpen && (
                            <Profile
                                userInfo={userInfo}
                                onClose={closeProfile}
                                setSignalSent={setSignalSent}
                            />
                        )}
                    </ProfileContainer>
                </>
            )}
        </>
    );
};

export default Home;
