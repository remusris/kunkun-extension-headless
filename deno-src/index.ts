import { expose } from "@kunkun/api/runtime/deno";

// Function to execute Python script from the local deno-src/python directory
async function executePythonScript() {
  const scriptPath = new URL("./python/other.py", import.meta.url);
  
  const command = new Deno.Command("python", {
    args: [scriptPath.pathname],
    stdout: "piped",
    stderr: "piped",
  });

  const { code, stdout, stderr } = await command.output();
  
  if (code !== 0) {
    const errorOutput = new TextDecoder().decode(stderr);
    throw new Error(`Python script failed: ${errorOutput}`);
  }
  
  const output = new TextDecoder().decode(stdout);
  console.log("Python script output:", output);
  return output;
}

expose({
  executeScript: executePythonScript,
});