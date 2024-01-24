import axios from "axios";

export const sentSignalFunction = async (id) => {
    try {
        const response = await axios.get(`/signals/sent/${id}`);
        if (response.status === 200) {
            console.log("get sent signal success");
            return response.data;
        } else {
            return "get 실패";
        }
    } catch (error) {
        return "요청 실패";
    }
};
