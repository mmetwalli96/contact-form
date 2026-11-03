import dotenv from "dotenv";
import { EnvSchema } from "@/schemas";
dotenv.config();

const env = EnvSchema.parse(process.env);

export const config = {
    server: {
        host: env.HOST,
        port: env.PORT,
        secretKey: env.SECRET_KEY,
    },
    mailtrap: {
        token: env.MAILTRAP_API_TOKEN,
        senderName: env.MAILTRAP_SENDER_NAME,
        senderEmail: env.MAILTRAP_SENDER_EMAIL,
    },
    myEmail: env.PERSONAL_EMAIL
};