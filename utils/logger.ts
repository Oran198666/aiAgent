import fs from "fs";
import path from "path";
import { BaseMessage } from "langchain";

class Logger{

    private logsDir = path.join(process.cwd(), "logs");

    private getLogFilePath(): string {
        const date = new Date();
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth()+1).padStart(2, "0");
        const year = date.getFullYear();
        return path.join(this.logsDir, `${day}-${month}-${year}.log`);
    }

    public logMessages(messages:BaseMessage[]):void{
        const lines: string[] = [];
        for (const msg of messages){
            const msgType = msg.constructor.name;
            const msgContent = msg.text;
            console.log(`${msgType}: ${msgContent}`);
            console.log("-------------------------");
            lines.push(` ${msgType}: ${msgContent}`);
            lines.push("--------------------------");
        }
        fs.mkdirSync(this.logsDir, {recursive:true});
        fs.appendFileSync(this.getLogFilePath(), lines.join("\n") + "\n");
    }
}

export const logger = new Logger();