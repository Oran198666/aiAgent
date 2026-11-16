import { DynamicTool } from "langchain";

class GetDateTimeToolBuilder {
    private name = "get-date-time";

    private description = "Get the current date and time. Always call this before writing any date or time. Never guess the date";

    private async func():Promise<string>{
        try{
            return new Date().toISOString();
        }catch(err:any){
            return "Error" + err.message;
        }
    }

    public build():DynamicTool{
        const tool = new DynamicTool({
            name: this.name,
            description: this.description,
            func: this.func.bind(this)
        });
        return tool;
    }
}

export const GetDateTimeTool = new GetDateTimeToolBuilder().build();