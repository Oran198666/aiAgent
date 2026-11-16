import { ChatOpenAI } from "@langchain/openai";
import { createAgent } from "langchain";
import { appConfig } from "../../utils/appConfig";
import { GetDateTimeTool } from "./GetDateTimeToolBuilder";
import { logger } from "../../utils/logger";
import { SendEmailTool } from "./send-email-tool";

class SendEmailAgent {

    // Agent LLM:
    private model = new ChatOpenAI({
        modelName: "gpt-4o-mini",
        temperature: 0, // How random is the LLM 0.0 - 1.0
        openAIApiKey: appConfig.openaiApiKey
    });

    private tools = [SendEmailTool, GetDateTimeTool];

    private systemPrompt = `you are a helpful email-sender assistant.
    you send email when asked.
    Be concise and confirm actions clearly.`;

    private agent = createAgent({
        model: this.model,
        tools: this.tools,
        systemPrompt: this.systemPrompt
    });

    // Run the agent:
    public async run(userPrompt: string): Promise<void> {

        // Run agent:
        const result = await this.agent.invoke({
            messages: [{ role: "human", content: userPrompt }]
        });

        // Log messages:
        logger.logMessages(result.messages);
    }
}

export const sendEmailAgent = new SendEmailAgent();