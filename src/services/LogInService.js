import axios from "axios";

export const logInFunction = async (id, pw) => {
    try {
        const response = await axios.post(`/login`, {
            id: id,
            password: pw,
        });
        if (response.status === 200) {
            console.log("로그인 성공", response);
            return response.data;
        } else {
            return "로그인 실패";
        }
    } catch (error) {
        return "요청 실패";
    }
};
