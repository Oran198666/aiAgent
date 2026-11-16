import path from "path";
import fs from "fs";
import { DynamicStructuredTool } from "langchain";
import z from "zod";

class CreateFileToolBuilder {
    private name = "create-file";

    private description = "create a new file at a given path.";

    private schema = z.object({
        filePath: z.string().describe("the full path of the File to create with content"),
        content: z.string().describe("the content of the file to create")
    });

    private async func(args: { filePath: string, content:string }): Promise<string> {
        try {
            let target = args.filePath;
            if(fs.existsSync(target)){
                const dir = path.dirname(target);
                const ext = path.extname(target);
                const base = path.basename(target, ext);
                let n=1;
                while (fs.existsSync(target)){
                    target = path.join(dir, `${base}-${n}${ext}`);
                    n++;
                }
            }

            fs.writeFileSync(target,args.content);
            return `File created at ${target}`;

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

export const createFileTool = new CreateFileToolBuilder().build();