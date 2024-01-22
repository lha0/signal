import axios from "axios";

export const doubleLineFunction = async () => {
    try {
        const response = await axios.get(`/lines`);
        if (response.status === 200) {
            console.log("get double line success");
            return response.data;
        } else {
            return "get double line fail";
        }
    } catch (error) {
        return "요청 실패";
    }
};
