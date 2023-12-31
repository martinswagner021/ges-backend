import { compare } from "bcrypt";

import User from "../../models/User.js";

export default async function authUserService(email: string, password: string){
    const fetchedUser = await User.findOne({"email": email})

    if (!fetchedUser){
        throw new Error("Either username or password doesn't match.")
    }
    
    const verifyPassword = await compare(password, fetchedUser.password)
    
    if (!verifyPassword){
        throw new Error("Either username or password doesn't match.")
    }

    fetchedUser.password = undefined

    return fetchedUser
}