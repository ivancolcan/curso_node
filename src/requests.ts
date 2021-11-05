import { RequestHandler } from "express";
import { name as fakeName } from "faker";
import { Connection } from "typeorm";
import { User } from "./entity/User";


export const index = (con: Connection): RequestHandler => (_req, res) => {
    res.send(`
    
        <a href="./users">USERS</a>
    
    `);
};

export const createUser = (con: Connection): RequestHandler => async (req, res) => {

    const { age, firstName, lastName } = req.body;


    const user = new User();

    user.age = age;
    user.firstName = firstName;
    user.lastName = lastName;

    await con.manager.save(user);

    res.sendStatus(201);

};

export const getUser = (con: Connection): RequestHandler => async (req, res) => {
    const { id } = req.params;

    const [user] = await con.manager.findByIds(User, [id]);

    if (!user) {
        res.sendStatus(404);
        return;
    }

    res.json(user);

};

export const deleteUser = (con: Connection): RequestHandler => async (req, res) => {
    const { id } = req.params;
    await con.manager.delete(User, { id });
    res.sendStatus(200);
};

