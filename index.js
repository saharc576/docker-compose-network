const express = require('express')
const redis = require('redis')

const app = express()
const redisCLI = redis.createClient({
    host: "redis-server",
    port: 6379
})
redisCLI.set("visits", 0)
redisCLI.set("visitsHome", 0)

app.get("/", (req, res) => {
    redisCLI.get("visits", (err, value) => {
        res.send("You visited in this page for " + value + " times")
        redisCLI.set("visits", parseInt(value) + 1)
    })
})

app.get("/home", (req, res) => {
    redisCLI.get("visitsHome", (err, value) => {
        res.send("You visited in this page for " + value + " times")
        redisCLI.set("visitsHome", parseInt(value) + 1)
    })
})

app.listen(8080, () => {
    console.log('listening on port 8080');
  });