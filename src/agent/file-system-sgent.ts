import { logger } from "../../utils/logger";
import { ChatOpenAI } from "@langchain/openai";
import { appConfig } from "../../utils/appConfig";
import { createFolderTool } from "./create-folder-tool";
import { createFileTool } from "./create-file-tool";
import { createAgent } from "langchain";
import { GetDateTimeTool } from "./GetDateTimeToolBuilder";

class FileSystemAgent{
    private model = new ChatOpenAI({
        modelName: "gpt-4o-mini",
        temperature: 0,
        openaiApiKey: appConfig.openaiApiKey
    });

    private tools = [createFolderTool, createFileTool, GetDateTimeTool,];

    private systemPrompt = ` you are a helpful file-system assistant.
    you create folders and files when asked.
    be concise and confirm actions clearly.`;

    private agent = createAgent({
        model:this.model,
        tools: this.tools,
        systemPrompt: this.systemPrompt
    });

    public async run(userPrompt:string): Promise<string>{
        const result = await this.agent.invoke({
            messages: [{role:"human", content:userPrompt}]
        });
        logger.logMessages(result.messages)
    }
}

export const fileSystemAgent = new FileSystemAgent();