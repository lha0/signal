import { useState } from "react";
import styled from "styled-components";
import { sendSignalFunction } from "../services/SendSignalService";

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

const SendSignal = ({
    closePopup,
    otherId,
    onSignalSent,
    onHomeSignalSent,
}) => {
    const [message, setMessage] = useState("");

    const loggedInUserId = JSON.parse(localStorage.getItem("loggedInUser")).id;

    const handleYes = () => {
        const fetchData = async () => {
            try {
                const result = await sendSignalFunction(
                    loggedInUserId,
                    otherId
                );
                console.log("result", result);
                if (result == "send signal success") {
                    console.log("요청 보내기 성공");
                    onSignalSent(true);
                    onHomeSignalSent(true);
                    setMessage("Successfully send a SIGNAL");
                } else {
                    console.log("요청 보내기 실패");
                    onSignalSent(false);
                    onHomeSignalSent(false);
                    setMessage("Failed to send a SIGNAL");
                }
            } catch {
                console.log("요청 보내기 실패");
                onSignalSent(false);
                onHomeSignalSent(false);
                setMessage("Failed to send a SIGNAL");
            }
        };
        fetchData();
    };

    return (
        <>
            <Container>
                {" "}
                <Title> {message || "Do you want to send a Signal?"}</Title>
                <ButtonBox>
                    {message ? (
                        <NoBtn onClick={closePopup}>Close</NoBtn> // 메시지가 있을 경우 '닫기' 버튼을 표시합니다.
                    ) : (
                        <>
                            <YesBtn onClick={handleYes}>Yes</YesBtn>
                            <NoBtn onClick={closePopup}>No</NoBtn>
                        </>
                    )}
                </ButtonBox>
            </Container>
        </>
    );
};

export default SendSignal;
