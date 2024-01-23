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
import MyProfile from "./pages/MyProfile";
import AllConnection from "./pages/AllConnection";
import OtherProfile from "./pages/OtherProfile";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" Component={Home} />
                <Route path="/signin" Component={Login} />
                <Route path="/signup" Component={Register} />
                <Route path="/myprofile" Component={MyProfile} />
                <Route path="/otherprofile/:id" Component={OtherProfile} />
                <Route path="/allconnection" Component={AllConnection} />
            </Routes>
            <Canvas
                style={{ height: "100vh" }}
                camera={{
                    position: [1000, 11000, 18000],
                    rotation: [-0.5, 0, 0],
                    far: 100000,
                }}
            >
                <EffectComposer>
                    <Bloom
                        intensity={2}
                        mipmapBlur={true}
                        luminanceThreshold={0.55}
                        luminanceSmoothing={0}
                    />
                </EffectComposer>
                <color attach="background" args={["#000"]} />
                <ambientLight color={"#fff"} intensity={3} />
                {Galaxy()}
            </Canvas>
        </>
    );
}

export default App;
