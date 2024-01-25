// Register.js
import React, { useState } from "react";
import { registerService } from "../services/RegisterService";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import SceneCanvas from "../components/SceneCanvas";

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    position: absolute; // 절대 위치 지정
    top: 0; // 상단에서 0px
    left: 0; // 왼쪽에서 0px
    display: flex; // Flexbox를 사용해 내부 요소 정렬
    justify-content: center; // 수평 중앙 정렬 (은하수를 중앙에 배치)
    align-items: center; // 수직 중앙 정렬 (은하수를 중앙에 배치)
    z-index: 99; // 캔버스 바로 위에 위치하도록 z-index 설정
    font-family: "Skyer";
`;

const Title = styled.h1`
    position: absolute; // 절대 위치 지정
    top: 80px; // 상단에서 20px
    left: 100px; // 왼쪽에서 20px
    color: white; // 글씨 색상
    font-size: 120px;
    z-index: 100; // 캔버스보다 상위 레이어에 위치하도록 z-index 설정
`;
const IDTitle = styled.h2`
    position: absolute; // 절대 위치 지정
    top: 320px; // 상단에서 20px
    left: 100px; // 왼쪽에서 20px
    color: white; // 글씨 색상
    font-size: 60px;
    z-index: 100; // 캔버스보다 상위 레이어에 위치하도록 z-index 설정
`;

const ID = styled.input`
    position: absolute; // 절대 위치 지정
    top: 450px; // 상단에서 20px
    left: 100px; // 왼쪽에서 20px
    width: 350px;
    height: 60px;
    padding-left: 10px;
    border-radius: 10px;
    color: black; // 글씨 색상
    background-color: white;
    font-size: 40px;
    font-family: "Skyer";
    z-index: 100; // 캔버스보다 상위 레이어에 위치하도록 z-index 설정
`;

const PWTitle = styled.h2`
    position: absolute; // 절대 위치 지정
    top: 520px; // 상단에서 20px
    left: 100px; // 왼쪽에서 20px
    color: white; // 글씨 색상
    font-size: 60px;
    z-index: 100; // 캔버스보다 상위 레이어에 위치하도록 z-index 설정
`;
const PW = styled.input`
    position: absolute; // 절대 위치 지정
    top: 650px; // 상단에서 20px
    left: 100px; // 왼쪽에서 20px
    width: 350px;
    height: 60px;
    padding-left: 10px;
    border-radius: 10px;
    color: black; // 글씨 색상
    background-color: white; // 배경색 투명
    font-size: 40px;
    font-family: "Skyer";
    z-index: 100; // 캔버스보다 상위 레이어에 위치하도록 z-index 설정
`;

const NameTitle = styled.h2`
    position: absolute; // 절대 위치 지정
    top: 720px; // 상단에서 20px
    left: 100px; // 왼쪽에서 20px
    color: white; // 글씨 색상
    font-size: 60px;
    z-index: 100; // 캔버스보다 상위 레이어에 위치하도록 z-index 설정
`;

const Name = styled.input`
    position: absolute; // 절대 위치 지정
    top: 850px; // 상단에서 20px
    left: 100px; // 왼쪽에서 20px
    width: 350px;
    height: 60px;
    padding-left: 10px;
    border-radius: 10px;
    color: black; // 글씨 색상
    background-color: white;
    font-size: 40px;
    font-family: "Skyer";
    z-index: 100; // 캔버스보다 상위 레이어에 위치하도록 z-index 설정
`;

const GenderTitle = styled.h2`
    position: absolute; // 절대 위치 지정
    top: 320px; // 상단에서 20px
    left: 550px; // 왼쪽에서 20px
    color: white; // 글씨 색상
    font-size: 60px;
    z-index: 100; // 캔버스보다 상위 레이어에 위치하도록 z-index 설정
`;

const Gender = styled.select`
    position: absolute; // 절대 위치 지정
    top: 450px; // 상단에서 20px
    left: 550px; // 왼쪽에서 20px
    width: 350px;
    height: 60px;
    padding-left: 10px;
    border-radius: 10px;
    color: black; // 글씨 색상
    background-color: white;
    font-size: 40px;
    font-family: "Skyer";
    z-index: 100; // 캔버스보다 상위 레이어에 위치하도록 z-index 설정
`;

const BirthTitle = styled.h2`
    position: absolute; // 절대 위치 지정
    top: 520px; // 상단에서 20px
    left: 550px; // 왼쪽에서 20px
    color: white; // 글씨 색상
    font-size: 60px;
    z-index: 100; // 캔버스보다 상위 레이어에 위치하도록 z-index 설정
`;

const Birth = styled.input`
    position: absolute; // 절대 위치 지정
    top: 650px; // 상단에서 20px
    left: 550px; // 왼쪽에서 20px
    width: 350px;
    height: 60px;
    padding-left: 10px;
    border-radius: 10px;
    color: black; // 글씨 색상
    background-color: white;
    font-size: 40px;
    font-family: "Skyer";
    z-index: 100; // 캔버스보다 상위 레이어에 위치하도록 z-index 설정
`;

const RegionTitle = styled.h2`
    position: absolute; // 절대 위치 지정
    top: 720px; // 상단에서 20px
    left: 550px; // 왼쪽에서 20px
    color: white; // 글씨 색상
    font-size: 60px;
    z-index: 100; // 캔버스보다 상위 레이어에 위치하도록 z-index 설정
`;

const Region = styled.input`
    position: absolute; // 절대 위치 지정
    top: 850px; // 상단에서 20px
    left: 550px; // 왼쪽에서 20px
    width: 350px;
    height: 60px;
    padding-left: 10px;
    border-radius: 10px;
    color: black; // 글씨 색상
    background-color: white;
    font-size: 40px;
    font-family: "Skyer";
    z-index: 100; // 캔버스보다 상위 레이어에 위치하도록 z-index 설정
`;

const PhotoTitle = styled.h2`
    position: absolute; // 절대 위치 지정
    top: 320px; // 상단에서 20px
    left: 1000px; // 왼쪽에서 20px
    color: white; // 글씨 색상
    font-size: 60px;
    z-index: 100; // 캔버스보다 상위 레이어에 위치하도록 z-index 설정
`;

const Photo = styled.input`
    position: absolute; // 절대 위치 지정
    top: 450px; // 상단에서 20px
    left: 1000px; // 왼쪽에서 20px
    width: 350px;
    height: 47px;
    padding-top: 13px;
    padding-left: 10px;
    border-radius: 10px;
    color: black; // 글씨 색상
    background-color: white;
    font-size: 25px;
    font-family: "Skyer";
    z-index: 100; // 캔버스보다 상위 레이어에 위치하도록 z-index 설정
`;

const IntroTitle = styled.h2`
    position: absolute; // 절대 위치 지정
    top: 520px; // 상단에서 20px
    left: 1000px; // 왼쪽에서 20px
    color: white; // 글씨 색상
    font-size: 60px;
    z-index: 100; // 캔버스보다 상위 레이어에 위치하도록 z-index 설정
`;

const Intro = styled.input`
    position: absolute; // 절대 위치 지정
    top: 650px; // 상단에서 20px
    left: 1000px; // 왼쪽에서 20px
    width: 350px;
    height: 60px;
    padding-left: 10px;
    border-radius: 10px;
    color: black; // 글씨 색상
    background-color: white;
    font-size: 40px;
    font-family: "Skyer";
    z-index: 100; // 캔버스보다 상위 레이어에 위치하도록 z-index 설정
`;

const ToRegisterBtn = styled.button`
    position: absolute; // 절대 위치 지정
    top: 800px; // 상단에서 20px
    left: 1020px; // 왼쪽에서 20px
    border: 2px solid white;
    padding: 20px;
    color: white; // 글씨 색상
    background-color: transparent; // 배경색 투명
    font-size: 60px;
    font-family: "Skyer";
    z-index: 100; // 캔버스보다 상위 레이어에 위치하도록 z-index 설정
`;

const Register = () => {
    const navigate = useNavigate();
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [birth, setBirth] = useState("");
    const [region, setRegion] = useState("");
    const [photo, setPhoto] = useState("");
    const [intro, setIntro] = useState("");

    const handleIdChange = (event) => {
        setId(event.target.value);
    };

    const handlePwChange = (event) => {
        setPw(event.target.value);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleGenderChange = (event) => {
        setGender(event.target.value); // 성별 상태 업데이트
    };

    const handleBirthChange = (event) => {
        setBirth(event.target.value);
    };

    const handleRegionChange = (event) => {
        setRegion(event.target.value);
    };

    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // 파일 내용을 읽은 후 URL을 추출하고 photo 상태를 업데이트합니다.
                const content = reader.result;
                const urlMatch = content.match(/URL=(.*)/); // URL= 다음에 오는 문자열을 찾습니다.
                if (urlMatch && urlMatch[1]) {
                    setPhoto(urlMatch[1].trim()); // 공백을 제거하고 상태를 업데이트합니다.
                } else {
                    console.error("URL not found in the file");
                }
            };
            reader.readAsText(file); // 파일을 텍스트로 읽습니다.
        }
    };

    const handleIntroChange = (event) => {
        setIntro(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const result = await registerService(
            id,
            pw,
            name,
            gender,
            birth,
            region,
            photo,
            intro
        );

        if (result === "회원가입 성공") {
            console.log(result);
            navigate("/");
            // 회원가입 성공 후 필요한 로직 구현 (예: 로그인 페이지로 이동)
        } else {
            console.error(result);
        }
    };

    return (
        <>
            <Container>
                <Title>SIGNAL</Title>
                <IDTitle>ID</IDTitle>
                <ID
                    type="text"
                    value={id}
                    placeholder="ID"
                    onChange={handleIdChange}
                />
                <PWTitle>PW</PWTitle>
                <PW
                    type="password"
                    value={pw}
                    placeholder="PW"
                    onChange={handlePwChange}
                />
                <NameTitle>NAME</NameTitle>
                <Name
                    type="text"
                    value={name}
                    placeholder="NAME"
                    onChange={handleNameChange}
                />

                <GenderTitle value={gender} onChange={handleGenderChange}>
                    Gender
                </GenderTitle>
                <Gender>
                    <option value="man">Man</option>
                    <option value="woman">Woman</option>
                </Gender>

                <BirthTitle>BIRTH</BirthTitle>
                <Birth
                    type="text"
                    value={birth}
                    placeholder="BIRTH"
                    onChange={handleBirthChange}
                />

                <RegionTitle>REGION</RegionTitle>
                <Region
                    type="text"
                    value={region}
                    placeholder="REGION"
                    onChange={handleRegionChange}
                />

                <PhotoTitle>PHOTO</PhotoTitle>
                <Photo type="file" onChange={handlePhotoChange} />
                {console.log("photo is ", photo)}

                <IntroTitle>INTRO</IntroTitle>
                <Intro
                    type="text"
                    value={intro}
                    placeholder="INTRO"
                    onChange={handleIntroChange}
                />

                <ToRegisterBtn type="submit" onClick={handleSubmit}>
                    REGISTER
                </ToRegisterBtn>
            </Container>
        </>
    );
};

export default Register;
