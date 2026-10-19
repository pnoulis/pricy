import * as Path from "node:path";
import * as ChildProcess from "node:child_process";
import { isString } from "#build/common.js";

const appdir = Path.join(isString(process.env.TESTSDIR), "apps/nextjs");
const port = 3000;
const flags = ["run", "start", "--", "--port", port];
const url = `http://localhost:${port}`;
let app;

export async function launchNextjsApp() {
  return app
    ? url
    : new Promise((resolve, reject) => {
        app = ChildProcess.spawn(isString(process.env.NPM), flags, {
          cwd: appdir,
        });
        app.stdout.on("data", (data) => console.log(data.toString()));
        app.on("error", reject);
        app.on("close", () => console.log("Nextjs app closed!"));
        app.on("spawn", () => {
          console.log("Nextjs app started!");
          process.on("exit", () => {
            console.log("Main thread exit -> Nextjs app closing!");
            app.kill(); /* TODO: This will be called twice in some cases */
          });
          process.on("SIGTERM", () => {
            console.log("SIGTERM -> Nextjs app closing!");
            app.kill();
          });
          process.on("SIGINT", () => {
            console.log("SIGINT -> Nextjs app closing!");
            app.kill();
          });
          process.on("SIGUSR1", () => {
            console.log("SIGUSR1 -> Nextjs app closing!");
            app.kill();
          });
          process.on("SIGUSR2", () => {
            console.log("SIGUSR2 -> Nextjs app closing!");
            app.kill();
          });
          resolve(url);
        });
      });
}
