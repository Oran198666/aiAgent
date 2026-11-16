import dotenv from "dotenv";
dotenv.config({quiet:true});

class AppConfig{
    public readonly openaiApiKey = process.env.OPENAI_API_KEY!;
    public readonly gmailUser = process.env.GMAIL_USER!;
    public readonly gmailAppPassword = process.env.GMAIL_APP_PASSWORD!;
}

export const appConfig = new AppConfig();