import {
  clipboard,
  expose,
  HeadlessCommand,
  toast,
  shell,
} from "@kksh/api/headless";
import { v4 as uuidv4 } from "uuid";

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

/* class UuidExt extends HeadlessCommand {
  async load() {
    const uuid = uuidv4();
    return clipboard
      .writeText(uuid)
      .then(() => {
        toast.success(`Copied UUID: ${uuid}`);
      })
      .catch((err) => {
        toast.error(`Failed to copy UUID: ${err}`);
      });
  }
}

expose(new UuidExt()); */

/* import {
  clipboard,
  expose,
  HeadlessCommand,
  toast,
  shell,
} from "@kksh/api/headless";
import { v4 as uuidv4 } from "uuid";

class UuidExt extends HeadlessCommand {
  async load() {
    try {
      const cmd = shell.createCommand("python", [
        "C:\\Programming Content\\python-windows-virtual-desktops\\other.py",
      ]);
      const output = await cmd.execute();
      console.log(output.stdout);
      toast.success("Python script executed successfully");
    } catch (err) {
      toast.error(`Failed to execute Python script: ${err}`);
      console.error(err);
    }
  }
}

expose(new UuidExt()); */
