import express from "express";
import faker from "faker";



const getUser = (name) => {

    return {
        nombre: name ? name : faker.name.findName(),
        area: faker.name.jobArea()
    };
};




const app = express();

app.get("/", (_req, res) => {
    res
        .status(200)
        .json({
            status: "ok"
        });
});

app.get("/user", (req, res) => {
    res.json(
        getUser()
    );
});

// /user/luis
// /user/pedro
app.get("/user/:nombre", (req, res) => {
    res.json(
        getUser(req.params.nombre)
    );
});


app.listen(8080);
