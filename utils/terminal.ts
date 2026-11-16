import readline from "node:readline/promises";

class Terminal {

    public async getResponse(request: string): Promise<string> {
        // Create reader:
        const reader = readline.createInterface({
            input: process.stdin,   // stdin: Standard Input  --> terminal
            output: process.stdout  // stdout: Standard Output --> terminal
        });
        try {
            // Display request and wait for response:
            const response = await reader.question(request); // Waiting for the user to press Enter.
            return response;
        } catch (err: any) {
            if (err.code === "ABORT_ERR") process.exit(0);
            throw err;
        } finally {
            // Close the reader:
            reader.close();
        }
    }
}
export const terminal = new Terminal();