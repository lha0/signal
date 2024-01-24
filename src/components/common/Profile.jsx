import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IoMdCloseCircle, IoIosSend } from "react-icons/io";
import { HiMiniSignal, HiMiniSignalSlash } from "react-icons/hi2";
import { HiMiniCloudArrowDown, HiMiniCloudArrowUp } from "react-icons/hi2";
import SendSignal from "../SendSignal";
import DeleteSignal from "../DeleteSignal";
import { receivedSignalFunction } from "../../services/ReceivedSignalService";
import ChatRoom from "../ChatRoom";
import SendSignalDialog from "../SendSignalDialog";
import ReceivedSignalDialog from "../ReceivedSignalDialog";

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex; // Flexbox를 사용해 내부 요소 정렬
    flex-wrap: wrap;
    justify-content: center; // 수평 중앙 정렬 (은하수를 중앙에 배치)
    align-items: center; // 수직 중앙 정렬 (은하수를 중앙에 배치)
`;

const PhotoNameContainer = styled.div`
    width: 50%; // Adjust the width as needed
    height: 70%; // Adjust the height as needed
    background: transparent;

    box-sizing: border-box;
    margin-top: 5%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    font-family: "Skyer";
    color: black;
`;

const UserPhotoView = styled.img`
    flex: 2;
    width: 70%;
    height: 75%;
    background: white;
    margin-top: 5%;
`;

const UserNameView = styled.div`
    flex: 1;
    margin-top: 5%;
    align-items: center;
    background: transparent;
    font-size: 50px;
`;

const UserInfoSection = styled.div`
    width: 50%; // Adjust the width as needed
    height: 70%; // Adjust the height as needed
    background: transparent;

    padding-top: 8%;
    padding-bottom: 5%;
    box-sizing: border-box;

    display: flex;
    flex-wrap: wrap;

    font-family: "Skyer";
    color: black;

    z-index: 110; // Ensure it's on top of the canvas
`;

const UserBirthBox = styled.div`
    width: 50%;
    height: 30%;
    background: transparent;
    font-size: 10px;
    display: flex;
    flex-direction: column;
`;

const UserBirthView = styled.div`
    width: 100%;
    height: 20%;
    font-size: 25px;
`;

const UserBirthData = styled.div`
    position: relative;
    width: 100%;
    height: 50%;
    background: transparent;
    font-size: 50px;
    margin-top: 10%;
`;

const UserGenderBox = styled.div`
    width: 50%;
    height: 30%;
    background: transparent;
    font-size: 10px;
    display: flex;
    flex-direction: column;
`;

const UserGenderView = styled.div`
    width: 100%;
    height: 20%;
    font-size: 25px;
`;

const UserGenderData = styled.div`
    position: relative;
    width: 100%;
    height: 50%;
    background: transparent;
    font-size: 50px;
    margin-top: 10%;
`;

const UserLocationBox = styled.div`
    width: 50%;
    height: 30%;
    background: transparent;
    font-size: 10px;
    display: flex;
    flex-direction: column;
`;

const UserLocationView = styled.div`
    width: 100%;
    height: 20%;
    font-size: 25px;
`;

const UserLocationData = styled.div`
    position: relative;
    width: 100%;
    height: 50%;
    background: transparent;
    font-size: 50px;
    margin-top: 10%;
`;

const UserSignalsBox = styled.div`
    width: 50%;
    height: 30%;
    background: transparent;
    font-size: 10px;
    display: flex;
    flex-direction: column;
`;

const UserSignalsView = styled.div`
    width: 100%;
    height: 20%;
    font-size: 25px;
`;

const UserSignalsData = styled.div`
    position: relative;
    width: 100%;
    height: 50%;
    background: transparent;
    font-size: 50px;
    margin-top: 10%;
`;

const UserIntroductionBox = styled.div`
    width: 100%;
    height: 30%;
    background: transparent;
    font-size: 10px;
    display: flex;
    flex-direction: column;
`;

const UserIntroductionView = styled.div`
    width: 100%;
    height: 20%;
    font-size: 25px;
`;

const UserIntroductionData = styled.div`
    position: relative;
    width: 100%;
    height: 50%;
    background: transparent;
    font-size: 50px;
    margin-top: 5%;
`;

const IconBox = styled.div`
    width: 100%; // Adjust the width as needed
    height: 20%; // Adjust the height as needed
    background: transparent;

    box-sizing: border-box;

    display: flex;
    aligh-items: center;
    justify-content: center;
`;
const CloseBtn = styled(IoMdCloseCircle)`
    font-size: 70px;
    color: black;
`;
const ChatBtn = styled(IoIosSend)`
    font-size: 70px;
    color: lightgreen;
    margin-left: 50px;
    margin-right: 50px;
`;
const SignalBtn = styled(HiMiniSignal)`
    font-size: 70px;
    color: skyblue;
`;
const SignalCancelBtn = styled(HiMiniSignalSlash)`
    font-size: 70px;
    color: lightpink;
`;

const SignalPopup = styled.div`
    position: absolute;
    width: 50%; // or any other size
    height: 30%; // or any other size
    background-color: rgba(255, 255, 255); // Semi-transparent white
    border-radius: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    display: ${(props) => (props.isopen ? "block" : "none")};
    overflow: auto; // If content is too big, scroll
    top: 35%; // Adjust as needed
    left: 25%; // Adjust as needed
    z-index: 120;
`;

const DeleteSignalPopup = styled.div`
    position: absolute;
    width: 50%; // or any other size
    height: 30%; // or any other size
    background-color: rgba(255, 255, 255); // Semi-transparent white
    border-radius: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    display: ${(props) => (props.isdelopen ? "block" : "none")};
    overflow: auto; // If content is too big, scroll
    top: 35%; // Adjust as needed
    left: 25%; // Adjust as needed
    z-index: 120;
`;

const ChatRoomPopup = styled.div`
    position: absolute;
    width: 50%; // or any other size
    height: 70%; // or any other size
    background-color: rgba(255, 255, 255); // Semi-transparent white
    border-radius: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    display: ${(props) => (props.isopen ? "block" : "none")};
    overflow: auto; // If content is too big, scroll
    top: 15%; // Adjust as needed
    left: 25%; // Adjust as needed
    z-index: 120;
`;

const ReceivedSignalBtn = styled(HiMiniCloudArrowDown)`
    font-size: 70px;
    color: lightgreen;
    margin-left: 50px;
    margin-right: 50px;
`;

const ReceivedSignalPopup = styled.div`
    position: absolute;
    width: 50%; // or any other size
    height: 70%; // or any other size
    background-color: rgba(255, 255, 255); // Semi-transparent white
    border-radius: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    display: ${(props) => (props.isopen ? "block" : "none")};
    overflow: auto; // If content is too big, scroll
    top: 15%; // Adjust as needed
    left: 25%; // Adjust as needed
    z-index: 120;
`;

const SendSignalBtn = styled(HiMiniCloudArrowUp)`
    font-size: 70px;
    color: skyblue;
`;

const SendSignalPopup = styled.div`
    position: absolute;
    width: 50%; // or any other size
    height: 70%; // or any other size
    background-color: rgba(255, 255, 255); // Semi-transparent white
    border-radius: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    display: ${(props) => (props.isopen ? "block" : "none")};
    overflow: auto; // If content is too big, scroll
    top: 15%; // Adjust as needed
    left: 25%; // Adjust as needed
    z-index: 120;
`;

const Profile = ({ userInfo, onClose }) => {
    const userName = userInfo.name || "NAME";
    const userBirth = userInfo.birth.slice(0, 10) || "BIRTHDAY";
    const userGender = userInfo.gender || "GENDER";
    const userIntroduction = userInfo.introduction || "INTRODUCTION";
    const userRegion = userInfo.region || "REGION";
    const userSignals = userInfo.signals || "SIGNALS";
    const userPhoto = userInfo.photo || "path/to/default/photo.png"; // Default photo path or logic to handle
    const userID = userInfo.id || "ID";

    const [isPopOpen, setIsPopOpen] = useState(false);
    const [isSignalSent, setIsSignalSent] = useState(false);
    const [isDelSigPopOpen, setIsDelSigPopOpen] = useState(false);
    const [receivedSignal, setReceivedSignal] = useState([]);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isReceivedSignalOpen, setIsReceivedSignalOpen] = useState(false);
    const [isSendSignalOpen, setIsSendSignalOpen] = useState(false);

    const loggedInUserId = JSON.parse(localStorage.getItem("loggedInUser")).id;
    const isOwnProfile = userID === loggedInUserId;

    useEffect(() => {
        const fetchData = async () => {
            const result = await receivedSignalFunction(userID);

            if (result && result !== "get 실패" && result !== "요청 실패") {
                setReceivedSignal(result);
                console.log("received signals", result);
            } else {
                console.error(result);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        receivedSignal.forEach((user) => {
            if (user.id === loggedInUserId) {
                setIsSignalSent(true);
            }
        });
    }, [receivedSignal]);

    const openPopup = () => {
        setIsPopOpen(true);
    };

    const closePopup = () => {
        setIsPopOpen(false);
    };

    const openDelSigPopup = () => {
        setIsDelSigPopOpen(true);
    };

    const closeDelPopup = () => {
        setIsDelSigPopOpen(false);
    };

    const handleSignalSent = (sentStatus) => {
        setIsSignalSent(sentStatus); // 이 함수를 추가합니다.
    };

    //채팅
    const openChatRoom = () => {
        setIsChatOpen(true);
    };

    const closeChatRoom = () => {
        setIsChatOpen(false);
    };

    //받은 신호 목록
    const openReceivedSignal = () => {
        setIsReceivedSignalOpen(true);
    };

    const closeReceivedSignal = () => {
        setIsReceivedSignalOpen(false);
    };

    //보낸 신호 목록
    const openSendSignal = () => {
        setIsSendSignalOpen(true);
    };

    const closeSendSignal = () => {
        setIsSendSignalOpen(false);
    };

    return (
        <>
            <Container>
                <PhotoNameContainer>
                    <UserPhotoView src={userPhoto} alt="User" />
                    <UserNameView>{userName}</UserNameView>
                </PhotoNameContainer>
                <UserInfoSection>
                    <UserBirthBox>
                        <UserBirthView>BIRTHDAY</UserBirthView>
                        <UserBirthData>{userBirth}</UserBirthData>
                    </UserBirthBox>
                    <UserGenderBox>
                        <UserGenderView>GENDER</UserGenderView>
                        <UserGenderData>{userGender}</UserGenderData>
                    </UserGenderBox>
                    <UserLocationBox>
                        <UserLocationView>Region</UserLocationView>
                        <UserLocationData>{userRegion}</UserLocationData>
                    </UserLocationBox>
                    <UserSignalsBox>
                        <UserSignalsView>Signals</UserSignalsView>
                        <UserSignalsData>{userSignals}</UserSignalsData>
                    </UserSignalsBox>
                    <UserIntroductionBox>
                        <UserIntroductionView>
                            Introduction
                        </UserIntroductionView>
                        <UserIntroductionData>
                            {userIntroduction}
                        </UserIntroductionData>
                    </UserIntroductionBox>
                </UserInfoSection>
                <IconBox>
                    <CloseBtn onClick={onClose}>icon</CloseBtn>
                    {isOwnProfile && (
                        <>
                            <ReceivedSignalBtn onClick={openReceivedSignal} />
                            <SendSignalBtn onClick={openSendSignal} />
                        </>
                    )}
                    {!isOwnProfile && (
                        <>
                            <ChatBtn onClick={openChatRoom}>Chat</ChatBtn>
                            {isSignalSent ? (
                                <SignalCancelBtn onClick={openDelSigPopup} />
                            ) : (
                                <SignalBtn onClick={openPopup} />
                            )}
                        </>
                    )}
                </IconBox>
            </Container>

            <SignalPopup isopen={isPopOpen}>
                {isPopOpen && (
                    <SendSignal
                        closePopup={closePopup}
                        otherId={userID}
                        onSignalSent={handleSignalSent}
                    />
                )}
            </SignalPopup>
            <DeleteSignalPopup isdelopen={isDelSigPopOpen}>
                {isDelSigPopOpen && (
                    <DeleteSignal
                        closeDelPopup={closeDelPopup}
                        otherId={userID}
                        signalSent={handleSignalSent}
                    />
                )}
            </DeleteSignalPopup>
            <ChatRoomPopup isopen={isChatOpen}>
                {isChatOpen && (
                    <ChatRoom
                        closeChatRoom={closeChatRoom}
                        otherId={userID}
                        otherName={userName}
                    />
                )}
            </ChatRoomPopup>
            <ReceivedSignalPopup isopen={isReceivedSignalOpen}>
                {isReceivedSignalOpen && (
                    <ReceivedSignalDialog
                        closeReceivedSignal={closeReceivedSignal}
                    />
                )}
            </ReceivedSignalPopup>
            <SendSignalPopup isopen={isSendSignalOpen}>
                {isSendSignalOpen && (
                    <SendSignalDialog closeSendSignal={closeSendSignal} />
                )}
            </SendSignalPopup>
        </>
    );
};

export default Profile;
