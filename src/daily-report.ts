import fs from "fs";
import path from "path";
import { mailer } from "../utils/mailer";
import { appConfig } from "../utils/appConfig";

class DailyReport {

    private logsDir = path.join(process.cwd(), "logs");

    private getYesterdayFileName(): string {
        const date = new Date();
        date.setDate(date.getDate() - 1);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}-${month}-${year}.log`;
    }

    public async send(): Promise<void> {
        const fileName = this.getYesterdayFileName();
        const filePath = path.join(this.logsDir, fileName);

        if (!fs.existsSync(filePath)) {
            console.log(`No log file for ${fileName}, nothing to send.`);
            return;
        }

        const content = fs.readFileSync(filePath, "utf-8");
        const id = await mailer.send(
            `Agent log ${fileName}`,
            content,
            appConfig.gmailUser
        );
        console.log(`Report sent (${id})`);
    }
}

(async () => {
    try {
        await new DailyReport().send();
    } catch (err: any) {
        console.error(err.message);
    }
})();