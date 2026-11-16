import fs from "fs";
import { DynamicStructuredTool } from "langchain";
import z from "zod";

class CreateFolderToolBuilder {
    private name = "create-folder";

    private description = "create a new folder at a given path.";

    private schema = z.object({
        folderPath: z.string().describe("the full path of the folder to create")
    });

    private async func(args: { folderPath: string }): Promise<string> {
        try {
            if (fs.existsSync(args.folderPath)) {
                return `folder already exist at ${args.folderPath}`;
            }
            fs.mkdirSync(args.folderPath, { recursive: true });
            return `folder created at ${args.folderPath}`
        } catch (err: unknown) {
            return "error: " + (err as Error).message;
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

export const createFolderTool = new CreateFolderToolBuilder().build();