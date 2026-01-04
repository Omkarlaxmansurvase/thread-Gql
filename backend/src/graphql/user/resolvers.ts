// import UserService , {CreateUserPayload} from "../../services/user.js"

import type { CreateUserPayload } from "../../services/user.js";
import UserService from "../../services/user.js";

const queries = {}
const mutations = {
    createUser: async(_:any,payload:CreateUserPayload)=>{
        // return "User Created";
        const res = await UserService.createUser(payload)
        return res.id;
    }
}

export const resolvers= {queries,mutations}