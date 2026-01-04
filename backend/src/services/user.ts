import { prismaClient } from "../lib/db.js";
import { createHmac,randomBytes } from "node:crypto";

export interface CreateUserPayload{
    firstName:string
    lastName:string
    email:string
    password:string
}

export default class UserService{
    public static createUser(payload:CreateUserPayload){
        const {firstName,lastName,email,password}=payload;
        const salt = randomBytes(32).toString('hex');
        const hashPassword = createHmac('sha256',salt).update(password).digest('hex');
        return prismaClient.user.create({
            data:{
                firstName,
                lastName,
                email,
                salt,
                password : hashPassword
            }
        })
    }
}