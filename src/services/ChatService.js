import axios from "axios";

export const chatFunction = async (loggedInUserId, otherId) => {
    try {
        const response = await axios.post(`/chat/createRoom`, {
            user1: loggedInUserId,
            user2: otherId,
        });
        if (response.status === 200) {
            console.log("채팅 요청 성공", response.data);

            const htmlString = `${response.data}`;
            return htmlString;
        } else {
            console.log("채팅 요청 실패");
            return "chat fail";
        }
    } catch (error) {
        console.log("에러 발생", error);
        return "요청 실패";
    }
};
