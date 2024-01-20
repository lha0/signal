// Register.js
import React, { useState } from "react";
import { registerService } from "../services/RegisterService";

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
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="id">ID:</label>
                    <input
                        type="text"
                        id="id"
                        value={id}
                        onChange={handleIdChange}
                    />
                </div>
                <div>
                    <label htmlFor="pw">Password:</label>
                    <input
                        type="password"
                        id="pw"
                        value={pw}
                        onChange={handlePwChange}
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
