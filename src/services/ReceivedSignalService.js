import axios from "axios";

//특정사용자가 '받은' 모든 신호에 대한 GET id API
export const receivedSignalFunction = async (id) => {
    try {
        const response = await axios.get(`/signals/received/${id}`);
        if (response.status === 200) {
            console.log("get received signal success");
            return response.data;
        } else {
            return "get 실패";
        }
    } catch (error) {
        return "요청 실패";
    }
};
