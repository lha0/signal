import { useState } from "react";
import styled from "styled-components";
import { logInFunction } from "../services/LogInService";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/actions/sessionActions";

const Container = styled.div``;
const ID = styled.input``;
const PW = styled.input``;
const LogInButton = styled.button``;
const ToRegisterBtn = styled.button``;

export default function Login() {
    const [Id, setId] = useState("");
    const [Pw, setPw] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleID = (e) => {
        setId(e.target.value);
        console.log(e.target.value);
    };

    const handlePW = (e) => {
        setPw(e.target.value);
        console.log(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await logInFunction(Id, Pw);
        if (result) {
            dispatch(loginSuccess(result));
        }

        if (result && result !== "로그인 실패" && result !== "요청 실패") {
            console.log("로그인 성공, 받은 토큰:", result);
            sessionStorage.setItem("jwtToken", result.accessToken); // JWT 토큰을 세션에 저장
            // 로그인 성공 후 필요한 로직 구현 (예: 페이지 리디렉션)
        } else {
            console.error(result);
        }
    };

    const handleRegister = () => {
        navigate("/signup");
    };

    return (
        <>
            <Container>
                <ID
                    type="text"
                    value={Id}
                    placeholder="ID"
                    onInput={handleID}
                />
                <PW
                    type="text"
                    value={Pw}
                    placeholder="PW"
                    onInput={handlePW}
                />
                <LogInButton onClick={handleSubmit}>Log In</LogInButton>
                <ToRegisterBtn onClick={handleRegister}>Register</ToRegisterBtn>
                <div>{sessionStorage.getItem("jwtToken")}</div>
            </Container>
        </>
    );
}
