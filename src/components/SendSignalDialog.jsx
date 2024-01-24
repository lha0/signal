import { useEffect, useState } from "react";
import { sentSignalFunction } from "../services/SentSignalService";
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: absolute; // 절대 위치 지정
    display: flex; // Flexbox를 사용해 내부 요소 정렬
    flex-direction: column;
    justify-content: center; // 수평 중앙 정렬 (은하수를 중앙에 배치)
    align-items: center; // 수직 중앙 정렬 (은하수를 중앙에 배치)
`;

const Title = styled.h1`
    height: 10%;
    margin-top: 30px;
    flex: 1;
    font-size: 30px;
    font-family: "Skyer";
    color: black;
`;

const ListView = styled.ul`
    flex: 8;
    height: 80%;
    list-style: none;
    padding: 0;
`;

const ListItem = styled.li`
    width: 100%;
    height: 10%;
    margin: 0 auto;
    padding: 10px;
    background-color: #fff;
    border-radius: 5px;
    font-family: "Skyer";
    font-size: 20px;
`;

const NoBtn = styled.button`
    flex: 1;
    padding: 10px 20px;
    border: 0;
    border-radius: 5px;
    font-family: "Skyer";
    color: black;
    font-size: 20px;
    margin-right: 20px;
    margin-bottom: 20px;
`;

const SendSignalDialog = ({ closeSendSignal }) => {
    const [resultSignals, setResultSignals] = useState([]);
    const loggedInUserId = JSON.parse(localStorage.getItem("loggedInUser")).id;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await sentSignalFunction(loggedInUserId);
                if (result != "get 실패" && result != "요청 실패") {
                    console.log("요청 보내기 성공");
                    console.log(result);
                    setResultSignals(result);
                } else {
                    console.log("요청 보내기 실패");
                }
            } catch {
                console.log("요청 보내기 실패");
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <Container>
                <Title>Sent Signals</Title>
                <ListView>
                    {resultSignals.map((signal) => (
                        <ListItem key={signal.id}>{signal.name}</ListItem>
                    ))}
                </ListView>
                <NoBtn onClick={closeSendSignal}>X</NoBtn>
            </Container>
        </>
    );
};

export default SendSignalDialog;
