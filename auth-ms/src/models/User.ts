import mongoose from "mongoose";
import UserSchema from "../schemas/userSchema";

export interface IUser {
    fname?: string;
    lname?: string;
    email: string;
    password: string
}

export interface IuserModel extends mongoose.Model<UserDocument> {
    build: (att: IUser) => UserDocument

}
export interface UserDocument extends mongoose.Document {
    email: string;
    password: string;
    fname?: string;
    lname: string;
    generateToken: (expire: number) => string
}



// add a static function to make typescript check user propreties on runtime before mongoose throw an error 
UserSchema.statics.build = (userAtrr: IUser): any => {
    const newUser = new User(userAtrr)
    return newUser;
}
const User = mongoose.model<UserDocument, IuserModel>("users", UserSchema)

export default User;