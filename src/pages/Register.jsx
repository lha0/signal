// Register.js
import React, { useState } from "react";
import { registerService } from "../services/RegisterService";
import styled from "styled-components";

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
    font-size: 40px;
    font-family: "Skyer";
    z-index: 100; // 캔버스보다 상위 레이어에 위치하도록 z-index 설정
`;
const ToRegisterBtn = styled.button`
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

const Register = () => {
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");

    const handleIdChange = (event) => {
        setId(event.target.value);
    };

    const handlePwChange = (event) => {
        setPw(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const result = await registerService(id, pw);

        if (result === "회원가입 성공") {
            console.log(result);
            // 회원가입 성공 후 필요한 로직 구현 (예: 로그인 페이지로 이동)
        } else {
            console.error(result);
        }
    };

    return (
        <>
            <Container>
                <Title>SIGNAL</Title>
                <IDTitle>ID</IDTitle>
                <ID
                    type="text"
                    value={id}
                    placeholder="ID"
                    onChange={handleIdChange}
                />
                <PWTitle>PW</PWTitle>
                <PW
                    type="password"
                    value={pw}
                    placeholder="PW"
                    onChange={handlePwChange}
                />
                <ToRegisterBtn type="submit" onClick={handleSubmit}>
                    Register
                </ToRegisterBtn>
            </Container>
        </>
    );
};

export default Register;
