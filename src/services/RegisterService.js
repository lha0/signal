import axios from "axios";

export const registerService = async (id, password) => {
    try {
        const response = await axios.post(`/register`, {
            id: id,
            password: password,
        });
        if (response.status === 200) {
            // 성공 메시지 반환
            return "회원가입 성공";
        } else {
            // 에러 메시지 반환
            return "회원가입 실패";
        }
    } catch (error) {
        // 에러 반환
        return "회원가입 요청 중 오류 발생";
    }
};
