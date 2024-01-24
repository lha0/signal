import { useEffect, useState } from "react";
import styled from "styled-components";
import { chatFunction } from "../services/ChatService";
const Container = styled.div`
    width: 100%;
    height: 100%;
    position: absolute; // 절대 위치 지정
    display: flex; // Flexbox를 사용해 내부 요소 정렬
    flex-direction: column;
    justify-content: center; // 수평 중앙 정렬 (은하수를 중앙에 배치)
    align-items: center; // 수직 중앙 정렬 (은하수를 중앙에 배치)
`;

const Title = styled.div`
    flex: 1;
    margin-top: 10%;
    font-size: 25px;
    font-family: "Skyer";
    color: black;
`;

const ButtonBox = styled.div`
    flex: 1;
    margin-top: 10%;
    margin-bottom: 10%;
`;

const YesBtn = styled.button`
    margin-right: 20px;
    padding: 10px 20px;
    border: 0;
    border-radius: 5px;
    background-color: #f5df4d;
    font-family: "Skyer";
    color: black;
    font-size: 20px;
`;

const NoBtn = styled.button`
    padding: 10px 20px;
    border: 0;
    border-radius: 5px;
    background-color: #e3e3e3;
    font-family: "Skyer";
    color: black;
    font-size: 20px;
`;

const InputMessage = styled.input`
    flex: 1;
    margin-top: 10%;
    font-size: 25px;
    font-family: "Skyer";
    color: black;
`;
const SendBtn = styled.button`
    margin-right: 20px;
    padding: 10px 20px;
    border: 0;
    border-radius: 5px;
    background-color: #f5df4d;
    font-family: "Skyer";
    color: black;
    font-size: 20px;
`;
const LeaveBtn = styled.button`
    padding: 10px 20px;
    border: 0;
    border-radius: 5px;
    background-color: #e3e3e3;
    font-family: "Skyer";
    color: black;
    font-size: 20px;
`;

const ChatRoom = ({ closeChatRoom, otherId, otherName }) => {
    const loggedInUserId = JSON.parse(localStorage.getItem("loggedInUser")).id;

    const [htmlString, setHtmlString] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await chatFunction(loggedInUserId, otherId);
                if (result !== "chat fail") {
                    console.log("result is ", result);
                    console.log("result 성공");
                    setHtmlString(result);
                } else {
                    console.log("result is ", result);
                    console.log("채팅방 생성 실패");
                }
            } catch {
                console.log("채팅방 생성 실패");
            }
        };
        fetchData();
    }, []);

    const RawHTMLComponent = () => {
        console.log("in the function ", htmlString);
        return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
    };

    return (
        <>
            <Container>
                <RawHTMLComponent />
            </Container>
        </>
    );
};

export default ChatRoom;
