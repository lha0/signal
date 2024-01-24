import axios from "axios";

export const allUserFunction = async () => {
    try {
        const response = await axios.get(`/users`);
        if (response.status === 200) {
            console.log("get all user success");
            return response.data;
        } else {
            return "get 실패";
        }
    } catch (error) {
        return "요청 실패";
    }
};
