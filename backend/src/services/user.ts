import { User } from "../graphql/user/index.js";
import { prismaClient } from "../lib/db.js";
import { createHmac,randomBytes } from "node:crypto";
import jwt from "jsonwebtoken";

export interface CreateUserPayload{
    firstName:string
    lastName:string
    email:string
    password:string
}

export interface getUserTokenPayload{
    email:string;
    password:string;
}

export default class UserService{

    private static generateHash(salt:string,password:string){
        const hashedPassword = createHmac('sha256',salt).update(password).digest('hex');
        return hashedPassword;
    }

    public static createUser(payload:CreateUserPayload){
        const {firstName,lastName,email,password}=payload;
        const salt = randomBytes(32).toString('hex');
        const hashPassword = this.generateHash(salt,password);
        
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

    private static getUserByEmail(email:string){
        return prismaClient.user.findUnique({where:{email}});
    }

    public static async getUserToken(payload:getUserTokenPayload){
        const {email,password}=payload;
        const user = await UserService.getUserByEmail(email);
        if(!user){
            throw new Error('User not found');
        }

        const userSalt = user.salt;
        const userHashedPassword = UserService.generateHash(userSalt,password);
        if(userHashedPassword !== user.password){
            throw new Error('Invalid password');


        }
        // generate token 
        const token = jwt.sign({id:user.id,email:user.email},process.env.JWT_SECRET as string);
        return token;
    }
}