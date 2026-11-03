import { z } from "zod";

export const EnvSchema = z.object({
    HOST: z.string().default("127.0.0.1"),
    PORT: z.coerce.number().int().min(1023).default(8080),
    SECRET_KEY: z.string(),
    DATABASE_URL: z.url(),
    MAILTRAP_API_TOKEN: z.string(),
    MAILTRAP_SENDER_NAME: z.string(),
    MAILTRAP_SENDER_EMAIL: z.email(),
    PERSONAL_EMAIL: z.email()
});

export const RequestBodySchema = z.strictObject({
    name: z.string().min(1),
    email: z.email(),
    subject: z.string(),
    message: z.string().min(1)
});