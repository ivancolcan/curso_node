import express from "express";
import redis from "redis";


const client = redis.createClient();
const app = express();


app.use(express.json());


const redisGet = async (key) => new Promise((ok, _err) => {
    client.get(key, (err, value) => {
        if (err) {
            _err(err);
            return;
        }
        ok(value);
    });
});


app.post("/user", (req, res) => {
    const { name, jobArea } = req.body;

    client.set(name, JSON.stringify({
        name,
        jobArea
    }), () => {
        res.sendStatus(201);
    });

});

app.get("/user", (req, res) => {

    client.keys("*", async (_err, keys) => {
        if (_err) {
            res.sendStatus(500);
            return;
        }


        const users = [];

        for (const name of keys) {
            const value = await redisGet(name);
            users.push(JSON.parse(value));
        }

        res.json(users);
    });

});

app.delete("/user", (req, res) => {

});


app.listen(8080);
