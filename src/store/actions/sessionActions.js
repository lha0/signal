// actions/sessionActions.js

// 액션 타입 정의
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";
export const REFRESH_TOKEN = "REFRESH_TOKEN";

// 로그인 성공 액션 생성자
export const loginSuccess = (tokens) => ({
    type: LOGIN_SUCCESS,
    payload: tokens,
});

// 로그아웃 액션 생성자
export const logout = () => ({
    type: LOGOUT,
});

// 토큰 갱신 액션 생성자
export const refreshToken = (newTokens) => ({
    type: REFRESH_TOKEN,
    payload: newTokens,
});
