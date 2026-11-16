import z from "zod";
import { DynamicStructuredTool, DynamicTool } from "langchain";
import { mailer } from "../../utils/mailer";

class SendEmailToolBuilder{

    // Tool name:
    private name = "send-email";

    // Tool description:
    private description = "Send email to a given email address with a given subject and body.";

    // Tool input schema:
    private schema = z.object({
        subject: z.string().describe("The email subject."),
        body: z.string().describe("The email body."),
        to: z.string().describe("The recipience email address.")
    });
    private async func(args:{subject: string, body: string, to: string }): Promise<string> {
        try{
            await mailer.send(args.subject, args.body, args.to);
            return `Email has been sent to ${args.to}.`;
        }
        catch (err: any) {
            return "Error: " + err.message;
        }
    }

    public build(): DynamicStructuredTool {
        const tool = new DynamicStructuredTool({
            name: this.name,
            description: this.description,
            schema: this.schema,
            func: this.func
        });
        return tool;
    }
}

export const SendEmailTool = new SendEmailToolBuilder().build();