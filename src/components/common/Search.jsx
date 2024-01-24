import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchFunction } from "../../services/SearchService";
import styled from "styled-components";
import { GrSearch } from "react-icons/gr";

const SearchInnerContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    margin-top: 10px;
`;

const SearchBar = styled.input`
    width: 70%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 20px;
    font-family: "Skyer";
    font-size: 20px;
    color: white;
    padding-left: 14px;
`;
const SearchButton = styled(GrSearch)`
    width: 20%;
    height: 100%;
    color: white;
    font-size: 40px;
`;

const Search = () => {
    const [searchId, setSearchId] = useState("");
    const navigate = useNavigate();

    const handleSearchId = (e) => {
        setSearchId(e.target.value);
    };

    const handleSearchSubmit = async () => {
        const result = await searchFunction(searchId);

        if (result && result !== "검색 실패" && result !== "요청 실패") {
            console.log("검색 성공 :", result);
        } else {
            console.error(result);
        }
        console.log(result);
        navigate(`/otherprofile/${searchId}`, { state: { user: result } });
    };

    return (
        <>
            <SearchInnerContainer>
                <SearchBar
                    type="text"
                    placeholder="아이디를 입력하세요"
                    onChange={handleSearchId}
                />
                <SearchButton onClick={handleSearchSubmit}>검색</SearchButton>
            </SearchInnerContainer>
        </>
    );
};

export default Search;
