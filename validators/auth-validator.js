const {z} = require("zod");

//Creating an object schema
const loginSchema = z.object({
    email: z
    .string({required_error: "Email is required"})
    .trim()
    .email({message: "Invalid Email Id"})
    .min(3, {message: "Email must have atleast 3 chars"})
    .max(255, {message: "Email must not be more than 255 chars"}),
    password: z
    .string({required_error: "Password is required"})
    .trim()
    .min(7, {message: "Password must have atleast 7 chars"})
    .max(1024, {message: "Password can not have more than 1024 chars"}),
})

const signupSchema = loginSchema.extend({
    username: z
    .string({required_error: "Username is required"})
    .trim()
    .min(3, {message: "Username must have atleast 3 chars"})
    .max(255, {message: "Username must not be more than 255 chars"}),
    phone: z
    .string({required_error: "Phone is required"})
    .trim()
    .min(10, {message: "Phone must have atleast 10 digits"})
    .max(10, {message: "Phone can not have more than 10 digits"}),
})

module.exports = { signupSchema, loginSchema };