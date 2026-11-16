import { sendEmailAgent } from "./agent/SendEmailAgent";
import { terminal } from "../utils/terminal"

(async () => {
    try {
        const task = await terminal.getResponse("Enter SendEmail agent task: ");
        await sendEmailAgent.run(task);
        console.log("done");
    }catch(err:any){
        console.error(err)
    }
})();