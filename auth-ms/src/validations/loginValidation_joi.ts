import Joi from "@hapi/joi";


const loginValidation = Joi.object({
    body: Joi.object({
        email: Joi.string().email().required().trim(),
        password: Joi.string().min(4).max(50).required()
    }),
})


export default loginValidation