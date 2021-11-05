import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import { Request, Response } from "express";
import { Routes } from "./routes";
import { createUser, deleteUser, getUser, index } from "./requests";


createConnection().then(async connection => {

    // create express app
    const app = express();
    app.use(express.json());
    // app.use(bodyParser.json());

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });

    // setup express app here
    app.get("/", index(connection));
    app.post("/user", createUser(connection));
    app.get("/user/:id", getUser(connection));
    app.delete("/user/:id", deleteUser(connection));
    // ...

    // start express server
    app.listen(process.env.PORT || 3000);


    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results");

}).catch(error => console.log(error));
