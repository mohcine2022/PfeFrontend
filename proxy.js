module.exports = [
    {
        context: ["/api"],
        secure: false,
        target: "http://localhost:8080",
        changeOrigin: true
    }
]