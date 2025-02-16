import {
  clipboard,
  expose,
  HeadlessCommand,
  toast,
  shell,
  RPCChannel
} from "@kksh/api/headless";
import { v4 as uuidv4 } from "uuid";

interface PythonAPI {
  executeScript: (scriptPath: string) => Promise<void>;
}

class UuidExt extends HeadlessCommand {
  async load() {
    try {
      // Create PowerShell script that changes directory and runs Python
      const script = `cd "C:\\Programming Content\\python-windows-virtual-desktops"; python other.py`;
      const cmd = shell.makePowershellScript(script);
      const output = await cmd.execute();
      console.log(output.stdout);
      toast.success("Python script executed successfully");
    } catch (err) {
      toast.error(`Failed to execute Python script: ${err}`);
      console.error(err);
    }
  }
}


expose(new UuidExt());

