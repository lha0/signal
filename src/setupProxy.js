const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        "/login", //proxy가 필요한 path prameter를 입력합니다.
        createProxyMiddleware({
            target: "http://192.249.29.43:8080", //타겟이 되는 api url를 입력합니다.
            changeOrigin: true, //대상 서버 구성에 따라 호스트 헤더가 변경되도록 설정하는 부분입니다.
        })
    );
    app.use(
        "/register", //proxy가 필요한 path prameter를 입력합니다.
        createProxyMiddleware({
            target: "http://192.249.29.43:8080", //타겟이 되는 api url를 입력합니다.
            changeOrigin: true, //대상 서버 구성에 따라 호스트 헤더가 변경되도록 설정하는 부분입니다.
        })
    );
    app.use(
        "/user", //proxy가 필요한 path prameter를 입력합니다.
        createProxyMiddleware({
            target: "http://192.249.29.43:8080", //타겟이 되는 api url를 입력합니다.
            changeOrigin: true, //대상 서버 구성에 따라 호스트 헤더가 변경되도록 설정하는 부분입니다.
        })
    );
    app.use(
        "/lines", //proxy가 필요한 path prameter를 입력합니다.
        createProxyMiddleware({
            target: "http://192.249.29.43:8080", //타겟이 되는 api url를 입력합니다.
            changeOrigin: true, //대상 서버 구성에 따라 호스트 헤더가 변경되도록 설정하는 부분입니다.
        })
    );
    app.use(
        "/sendSignal", //proxy가 필요한 path prameter를 입력합니다.
        createProxyMiddleware({
            target: "http://192.249.29.43:8080", //타겟이 되는 api url를 입력합니다.
            changeOrigin: true, //대상 서버 구성에 따라 호스트 헤더가 변경되도록 설정하는 부분입니다.
        })
    );
    app.use(
        "/deleteSignal", //proxy가 필요한 path prameter를 입력합니다.
        createProxyMiddleware({
            target: "http://192.249.29.43:8080", //타겟이 되는 api url를 입력합니다.
            changeOrigin: true, //대상 서버 구성에 따라 호스트 헤더가 변경되도록 설정하는 부분입니다.
        })
    );
    app.use(
        "/signals", //proxy가 필요한 path prameter를 입력합니다.
        createProxyMiddleware({
            target: "http://192.249.29.43:8080", //타겟이 되는 api url를 입력합니다.
            changeOrigin: true, //대상 서버 구성에 따라 호스트 헤더가 변경되도록 설정하는 부분입니다.
        })
    );
    app.use(
        "/users", //proxy가 필요한 path prameter를 입력합니다.
        createProxyMiddleware({
            target: "http://192.249.29.43:8080", //타겟이 되는 api url를 입력합니다.
            changeOrigin: true, //대상 서버 구성에 따라 호스트 헤더가 변경되도록 설정하는 부분입니다.
        })
    );
    app.use(
        "/chat", //proxy가 필요한 path prameter를 입력합니다.
        createProxyMiddleware({
            target: "http://192.249.29.43:8080", //타겟이 되는 api url를 입력합니다.
            changeOrigin: true, //대상 서버 구성에 따라 호스트 헤더가 변경되도록 설정하는 부분입니다.
        })
    );
};
