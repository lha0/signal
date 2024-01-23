import axios from "axios";

export const deleteSignalFunction = async (sendUser, receiveUser) => {
    try {
        const response = await axios.post(`/deleteSignal`, {
            sendUser: sendUser,
            receiveUser: receiveUser,
        });
        if (response.status === 200) {
            return "delete signal success";
        } else {
            return "delete signal fail";
        }
    } catch (error) {
        return "요청 실패";
    }
};
