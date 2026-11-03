import { MailtrapClient } from "mailtrap";
import * as gcFunctions from "@google-cloud/functions-framework";
import { z } from "zod";
import { config } from "@/config";
import { isAuthorized } from "@/auth";
import { RequestBodySchema } from "@/schemas";

import type { Request, Response } from "@google-cloud/functions-framework";

const client = new MailtrapClient({
    token: config.mailtrap.token
});

gcFunctions.http("contact", async (req: Request, res: Response) => {
    if (!isAuthorized(req)) {
        res.status(401).send("Unauthorized Access Detected");
        return;
    }

    const parsedBody = RequestBodySchema.safeParse(req.body);
    if (!parsedBody.success) {
        res.status(400).send(`Invalid request body: ${z.prettifyError(parsedBody.error)}`);
        return;
    }
    const body = parsedBody.data;

    try {
        await client.send({
            from: {
                name: config.mailtrap.senderName,
                email: config.mailtrap.senderEmail
            },
            reply_to: { email: body.email },
            to: [
                {
                    email: config.myEmail
                }
            ],
            subject: body.subject,
            text: `Name: ${body.name}\nEmail: ${body.email}\n\n${body.message}`
        });
        res.status(200).send({ success: true, message: "Email sent successfully" });
    } catch (error) {
        res.status(500).send({ success: false, message: "Failed to send email", error: (error as Error).message });
    }

});