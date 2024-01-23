import axios from "axios";

export const sendSignalFunction = async (sendUser, receiveUser) => {
    try {
        const response = await axios.post(`/sendSignal`, {
            sendUser: sendUser,
            receiveUser: receiveUser,
        });
        if (response.status === 200) {
            return "send signal success";
        } else {
            return "send signal fail";
        }
    } catch (error) {
        return "요청 실패";
    }
};
