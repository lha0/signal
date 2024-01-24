import { Canvas } from "@react-three/fiber";

import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Html } from "@react-three/drei";

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: relative; // 절대 위치 지정
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

const ToLoginBtn = styled.button`
    position: absolute; // 절대 위치 지정
    top: 600px; // 상단에서 20px
    left: 50px; // 왼쪽에서 20px
    border: none;
    color: white; // 글씨 색상
    background-color: transparent; // 배경색 투명
    font-size: 80px;
    font-family: "Skyer";
    z-index: 100; // 캔버스보다 상위 레이어에 위치하도록 z-index 설정
`;

const ToRegisterBtn = styled.button`
    position: absolute; // 절대 위치 지정
    top: 800px; // 상단에서 20px
    left: 50px; // 왼쪽에서 20px
    color: white; // 글씨 색상
    border: none;
    background-color: transparent; // 배경색 투명
    font-size: 80px;
    font-family: "Skyer";
    z-index: 100; // 캔버스보다 상위 레이어에 위치하도록 z-index 설정
`;

export default function Home(props) {
    const navigate = useNavigate();
    const handleToLogIn = () => {
        navigate("/signin");
    };

    const handleToRegister = () => {
        navigate("/signup");
    };
    return (
        <>
            <Container>
                <Title>SIGNAL</Title>
                <ToLoginBtn onClick={handleToLogIn}>LOG IN</ToLoginBtn>
                <ToRegisterBtn onClick={handleToRegister}>
                    REGISTER
                </ToRegisterBtn>
            </Container>
        </>
    );
}
