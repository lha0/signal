import "./App.css";
import { Route, Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import styled from "styled-components";
import Login from "./pages/Login";
import Register from "./pages/Register";
import View from "./components/View";
import { Canvas } from "@react-three/fiber";
import { genBackgroundStars } from "./components/genBackgroundStars";
import Galaxy from "./components/Galaxy";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" Component={Home} />
                <Route path="/signin" Component={Login} />
                <Route path="/signup" Component={Register} />
                <Route path="/view" Component={View} />
            </Routes>
            <Canvas
                style={{ height: "100vh" }}
                camera={{
                    position: [300, 6000, 12000],
                    rotation: [-0.5, 0, 0],
                    far: 100000,
                }}
            >
                <color attach="background" args={["#000"]} />
                <ambientLight color={"#fff"} intensity={3} />
                {genBackgroundStars()}
                {Galaxy()}
            </Canvas>
        </>
    );
}

export default App;
