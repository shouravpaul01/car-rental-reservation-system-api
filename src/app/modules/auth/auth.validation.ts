import { z } from "zod";

const signinValidationSchema=z.object({
    body:z.object({
        email:z.string({required_error:"The field is reuired."}).email(),
        password:z.string({required_error:"The field is reuired."})
    })
})

export const AuthValidations={
    signinValidationSchema
}