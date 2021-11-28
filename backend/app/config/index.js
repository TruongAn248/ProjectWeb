const config = {
    app: {
        port: process.env.PORT || 8080
    },
    db: {
        url: "mongodb://localhost:27017/WebManga"
    },
    jwt: {
        secret: "WebManga-secret-key"
    }
};

module.exports = config;
