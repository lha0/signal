import axios from "axios";

export const searchFunction = async (id) => {
    try {
        const response = await axios.get(`/user/${id}`);
        if (response.status === 200) {
            console.log("검색 성공");
            console.log(response);
            return response.data;
        } else {
            return "검색 실패";
        }
    } catch (error) {
        console.log(error);
        return "요청 실패";
    }
};
