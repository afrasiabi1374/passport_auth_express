const express = require("express")
const app = express()
const jwt = require("jsonwebtoken")
const fs = require("fs")

app.get("/", (req, res) => {
    res.send("nothing to see here.visit")
})
app.get("/createtoken", async (req, res) => {
    let user = {
        name: "joey",
        favColor: "blue",
        id: 123
    }
    const token = jwt.sign({
        user: user
    }, "TOP_SECRET_KEY")
    console.log("token:", token);
    await fs.writeFile(
        "fakeLocal.json",
        JSON.stringify({Authorization: `Bearer ${token}`}),
        (err) => {
            if (err) throw err
            console.log("updated the fake localstorage in the fake browser");
        }
    )

    res.send("you just make a token and stored it in the browser ")
})

app.get("/profile", async (req, res) => {
    res.send("commingsoon profile")
})

app.get("/wrongsecret", async (req, res) => {
    res.send("commingsoon wrongsecret")
})

app.listen(3000, () => {
    console.log('listening on port 3000');
})