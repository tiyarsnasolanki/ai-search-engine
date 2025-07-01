module.exports = {
  apps: [{
    name: "backend",
    script: "app.js",
    env: {
      NODE_ENV: "production",
      PORT: 5000
    }
  }]
}