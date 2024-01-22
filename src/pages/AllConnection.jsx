import { useEffect, useState } from "react";
import { doubleLineFunction } from "../services/DoubleLineService";
import styled from "styled-components";

const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 99;
`;

const AllConnection = () => {
    const [points, setPoints] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await doubleLineFunction();
            if (result && result !== "요청 실패") {
                console.log("성공 :", result);
                setPoints(result);
            } else {
                console.error(result);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>AllConnection</h1>
        </div>
    );
};

export default AllConnection;
