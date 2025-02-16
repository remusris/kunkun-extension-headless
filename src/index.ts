import {
  expose,
  HeadlessCommand,
  toast,
  shell,
  RPCChannel,
} from "@kksh/api/headless";

interface PythonAPI {
  executeScript: () => Promise<string>;
}

async function getRpcAPI() {
  const { rpcChannel, process, command } = await shell.createDenoRpcChannel<
    object,
    PythonAPI
  >(
    "$EXTENSION/deno-src/index.ts",
    [],
    {
      allowRun: true,
      allowRead: true,
    },
    {}
  );

  command.stderr.on("data", (data) => {
    console.warn(data);
    if (data.includes("Error")) {
      toast.error("Python script execution failed!");
    }
  });

  return {
    api: rpcChannel.getAPI(),
    rpcChannel,
    process,
    command,
  };
}

class NotionDesktopExt extends HeadlessCommand {
  async load() {
    try {
      const rpc = await getRpcAPI();
      const output = await rpc.api.executeScript();
      console.log(output);
      toast.success("Python script executed successfully");
      rpc.process.kill();
    } catch (err) {
      toast.error(`Failed to execute Python script: ${err}`);
      console.error(err);
    }
  }
}

expose(new NotionDesktopExt());








/* import {
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
 */
