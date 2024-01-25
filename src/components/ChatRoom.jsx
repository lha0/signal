import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { chatFunction } from "../services/ChatService";

const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.9;
    position: absolute; // 절대 위치 지정
    display: flex; // Flexbox를 사용해 내부 요소 정렬
    flex-direction: column;
    justify-content: center; // 수평 중앙 정렬 (은하수를 중앙에 배치)
    align-items: center; // 수직 중앙 정렬 (은하수를 중앙에 배치)
`;

const BoxTitle = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;

    #title {
        font-size: 30px;
        text-align: center;
        margin-left: 20px;
        margin-bottom: 20px;
        font-family: "Skyer";
        color: white;
    }
`;

const NoBtn = styled.button`
    padding: 10px 20px;
    border: 0;
    border-radius: 5px;
    font-family: "Skyer";
    color: white;
    font-size: 30px;
    margin-right: 5px;
    background-color: #000;
`;

const Chatt = styled.div`
    width: 100%;
    margin: 0 auto;
    font-family: "Skyer";

    #talk {
        width: 100%;
        height: 580px;
        overflow-y: auto;
        border-radius: 18px;
        position: relative;

        .talk-shadow {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }

        div {
            width: 50%;
            display: block;
            padding: 10px;
            border-radius: 10px;
            box-sizing: border-box;
            margin: 4px 0 0 0;

            &.me {
                background-color: #404551;
                color: white;
                margin: 0px 5px 20px 47%;
            }

            &.other {
                background-color: #fff;
                color: black;
                margin: 20px 0px 2px 3%;
            }
        }
    }
`;

const SendZone = styled.div`
    > * {
        vertical-align: top;
    }
    margin-top: 10px;
    margin-bottom: 5px;
    margin-left: 5px;
    margin-right: 5px;
    display: flex;

    #msg {
        width: 85%;
        height: 70px; // Changed from SASS variable $sendZone-H
        display: block;
        resize: none;
        border: 1px solid #dcdcdc;
        background-color: #fff;
        box-sizing: border-box;
        margin-left: 5px;
        border-radius: 15px 0 0 15px;
    }
    #btnSend {
        width: 15%;
        height: 70px; // Changed from SASS variable $sendZone-H
        border: 1px solid #dcdcdc;
        margin-right: 5px;
        font-family: "Skyer";
        font-size: 15px;
        border-radius: 0 15px 15px 0;
    }
`;

const Input = styled.input`
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    &::-ms-clear {
        display: none;
    }

    &[type="number"]::-webkit-inner-spin-button,
    &[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
    }
`;

const Textarea = styled.textarea`
    resize: none;
    margin: 0;
    padding: 10;
    border: none;
    outline: none;
    font-family: inherit;
    font-size: inherit;
`;

const ChatRoom = ({ closeChatRoom, otherId, otherName, ws }) => {
    const loggedInUserId = JSON.parse(localStorage.getItem("loggedInUser")).id;

    const [msg, setMsg] = useState("");
    const [name, setName] = useState(loggedInUserId);
    const [chatt, setChatt] = useState([]);
    const [chkLog, setChkLog] = useState(false);
    const [socketData, setSocketData] = useState();

    const uniqueChatt = chatt.filter(
        (item, index, self) =>
            index === self.findIndex((t) => t.date === item.date)
    );

    const msgBox = uniqueChatt.map((item, idx) => (
        <div
            key={idx}
            className={item.loggedInUserId === name ? "me" : "other"}
        >
            <span>
                <b>{item.loggedInUserId}</b>
            </span>{" "}
            [ {item.date} ] <br />
            <span>{item.msg}</span>
        </div>
    ));

    useEffect(() => {
        if (socketData !== undefined) {
            const tempData = chatt.concat(socketData);
            setChatt(tempData);
        }
    }, [socketData]);

    //webSocket
    const onText = (event) => {
        console.log(event.target.value);
        setMsg(event.target.value);
    };

    ws.current.onmessage = (message) => {
        const dataSet = JSON.parse(message.data);
        setSocketData(dataSet);
        setChatt((prevChatt) => [...prevChatt, dataSet]);
    };

    const send = useCallback(() => {
        if (!chkLog) {
            setChkLog(true);
        }
        if (msg !== "") {
            const data = {
                loggedInUserId,
                msg,
                date: new Date().toLocaleString(),
            }; //전송 데이터(JSON)

            const temp = JSON.stringify(data);

            if (ws.current.readyState === 0) {
                //readyState는 웹 소켓 연결 상태를 나타냄
                ws.current.onopen = () => {
                    //webSocket이 맺어지고 난 후, 실행
                    console.log(ws.current.readyState);
                    ws.current.send(temp);
                };
            } else {
                ws.current.send(temp);
            }
        } else {
            alert("메세지를 입력하세요.");
            document.getElementById("msg").focus();
            return;
        }
        setMsg("");
    });
    //webSocket
    //webSocket
    //webSocket
    //webSocket

    return (
        <>
            <Container>
                <Chatt>
                    <BoxTitle>
                        <h1 id="title">Chatting</h1>
                        <NoBtn onClick={closeChatRoom}>X</NoBtn>
                    </BoxTitle>
                    <div id="talk">
                        <div className="talk-shadow"></div>
                        {msgBox}
                    </div>

                    <SendZone>
                        <Textarea
                            as="textarea"
                            id="msg"
                            value={msg}
                            onChange={onText}
                            onKeyDown={(ev) => {
                                if (ev.keyCode === 13) {
                                    send();
                                }
                            }}
                        />
                        <Input
                            as="input"
                            type="button"
                            value="send"
                            id="btnSend"
                            onClick={send}
                        />
                    </SendZone>
                </Chatt>
            </Container>
        </>
    );
};

export default ChatRoom;
