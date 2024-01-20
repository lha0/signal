import { Canvas } from "@react-three/fiber";

import styled from "styled-components";
import View from "../components/View";
import Login from "./Login";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #000;
`;

const ToLoginBtn = styled.button``;
const ToRegisterBtn = styled.button``;
const ToViewBtn = styled.button``;

export default function Home(props) {
    const navigate = useNavigate();
    const handleToLogIn = () => {
        navigate("/signin");
    };

    const handleToRegister = () => {
        navigate("signup");
    };
    return (
        <>
            <Container>
                <ToLoginBtn onClick={handleToLogIn}>로그인</ToLoginBtn>
                <ToRegisterBtn onClick={handleToRegister}>
                    회원가입
                </ToRegisterBtn>
                <ToViewBtn onClick={() => navigate("/view")}>View</ToViewBtn>
            </Container>
        </>
    );
}
