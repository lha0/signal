import { useState } from "react";
import styled from "styled-components";
import { logInFunction } from "../services/LogInService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/actions/sessionActions";
import Galaxy from "./Galaxy";
import { Canvas } from "@react-three/fiber";

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    position: absolute; // 절대 위치 지정
    top: 0; // 상단에서 0px
    left: 0; // 왼쪽에서 0px
    display: flex; // Flexbox를 사용해 내부 요소 정렬
    justify-content: center; // 수평 중앙 정렬 (은하수를 중앙에 배치)
    align-items: center; // 수직 중앙 정렬 (은하수를 중앙에 배치)
    z-index: 99; // 캔버스 바로 위에 위치하도록 z-index 설정
    font-family: "Skyer";
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

export default function Login() {
    const [Id, setId] = useState("");
    const [Pw, setPw] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
            localStorage.setItem("jwtToken", result.token.accessToken); // JWT 토큰을 세션에 저장
            // 로그인 성공 후 필요한 로직 구현 (예: 페이지 리디렉션)
            dispatch(loginSuccess(result));
            navigate("/myprofile", { state: { user: result.user } });
            localStorage.setItem("loggedInUser", JSON.stringify(result.user));
        } else {
            console.error(result);
        }
    };

    const handleRegister = () => {
        navigate("/signup");
    };

    return (
        <>
            {
                <Container>
                    <Title>LOG IN</Title>
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
            }
        </>
    );
}
