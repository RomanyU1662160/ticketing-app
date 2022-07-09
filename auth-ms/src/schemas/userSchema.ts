import mongoose from "mongoose";
import { Password } from "../services/PassowrdHashing.service";
import jwt from 'jsonwebtoken';
import { MissingEnvVariableError } from "../services/ErrorHandling.service";


const UserSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: false
    },
    lname: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    // https://alexanderzeitler.com/articles/mongoose-tojson-toobject-transform-with-subdocuments/
    // mongoose options toObject & toJSON to transform returned documents
    toObject: {
        transform(doc, ret) {
            delete ret.__v
        }
    },
    toJSON: {
        transform(doc, ret) {
            ret.id = ret.__id;  // create proprety id so it can we used in other services
            delete ret.__id;
            delete ret.__v;
            delete ret.password;
        },

    }

}

)
UserSchema.methods.generateToken = function (expiry: number = 360000): string {
    const payload = { id: this._id, fname: this.fname, lname: this.lname, email: this.email };

    if (!process.env.JWT_SECRET) {
        throw new MissingEnvVariableError("JWT_SECRET")
    }

    const secret = process.env.JWT_SECRET;

    const token = jwt.sign(payload, secret, { expiresIn: expiry })

    return token;
}

//middleware to hashpassword before save
UserSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        console.log("password :::>>>", this.get("password"))
        const hashed = await Password.hash(this.get("password"));
        this.set("password", hashed)
    }
    next()

})



export default UserSchema