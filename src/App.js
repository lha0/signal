import { Route, Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import styled from "styled-components";
import Login from "./pages/Login";
import Register from "./pages/Register";
import View from "./components/View";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" Component={Home} />
                <Route path="/signin" Component={Login} />
                <Route path="/signup" Component={Register} />
                <Route path="/view" Component={View} />
            </Routes>
        </>
    );
}

export default App;
