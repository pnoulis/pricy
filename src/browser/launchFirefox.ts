import * as ChildProcess from "node:child_process";
import { isString } from "#src/common.ts";
// eotuheonu

const flags: string[] = [
  "--headless",
  "--no-remote",
  `--profile`,
  isString(process.env.pricyfirefoxprofiledir),
  "--remote-debugging-port",
  isString(process.env.WEBDRIVER_PORT),
];
let firefox: ChildProcess.ChildProcess | null = null;

export async function launchFirefox(): Promise<string> {
  return firefox
    ? isString(process.env.WEBDRIVER_URL)
    : new Promise((resolve, reject) => {
        firefox = ChildProcess.spawn(isString(process.env.FIREFOX), flags, {
          cwd: process.env.HOME,
        });
        firefox.stdin!.on("data", (chunk) => console.log(chunk.toString()));
        firefox.stderr!.on("data", (chunk) => console.log(chunk.toString()));
        firefox.stdout!.on("data", (chunk) => console.log(chunk.toString()));
        firefox.on("error", reject);
        firefox.on("close", () => console.log("Firefox closed!"));
        firefox.on("spawn", () => {
          console.log("Firefox started!");
          process.on("exit", () => {
            console.log("Main thread exit -> Firefox closing!");
            firefox!.kill(); /* TODO: This will be called twice in some cases */
          });
          process.on("SIGTERM", () => {
            console.log("SIGTERM -> Firefox closing!");
            firefox!.kill();
          });
          process.on("SIGINT", () => {
            console.log("SIGINT -> Firefox closing!");
            firefox!.kill();
          });
          process.on("SIGUSR1", () => {
            console.log("SIGUSR1 -> Firefox closing!");
            firefox!.kill();
          });
          process.on("SIGUSR2", () => {
            console.log("SIGUSR2 -> Firefox closing!");
            firefox!.kill();
          });

          // The BiDi server is not initialized as soon as the process is
          // spawned causing connectinos to fail. One solution is to delay the
          // fulfillment for a few seconds
          // TODO: Validate this issue is indeed caused by delay
          setTimeout(() => resolve(isString(process.env.WEBDRIVER_URL)), 3000);
        });
      });
}
