// import UserService , {CreateUserPayload} from "../../services/user.js"

import type { CreateUserPayload } from "../../services/user.js";
import UserService from "../../services/user.js";

const queries = {
    getUserToken: async(_:any,payload:{email:string,password:string})=>{
        const token = await UserService.getUserToken({
            email:payload.email,
            password:payload.password
        });
        return token;
    }
}
const mutations = {
    createUser: async(_:any,payload:CreateUserPayload)=>{
        // return "User Created";
        const res = await UserService.createUser(payload)
        return res.id;
    }
    
}

export const resolvers= {queries,mutations}