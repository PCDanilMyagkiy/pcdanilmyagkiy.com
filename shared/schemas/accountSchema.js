import z from "zod";

const accountSchema = z.object({
    name: z
        .string("name_not_string")
        .min(3, "name_too_small")
        .max(25, "name_too_big")
        .regex(/^[a-zA-Z0-9_-]+$/, "name_invalid"),

    password: z
        .string("password_not_string")
        .min(8, "password_too_small")
        .max(120, "password_too_big")
        .regex(/^(?=.*[a-z]).*$/, "password_no_lowercase")
        .regex(/^(?=.*[A-Z]).*$/, "password_no_uppercase")
        .regex(/^(?=.*[0-9]).*$/, "password_no_digits")
});

export default accountSchema;