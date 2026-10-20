import * as Ws from "ws";
import { logjson } from "#src/log.ts";

/*
  - Resources
  https://developer.mozilla.org/en-US/docs/Web/WebDriver/Reference/BiDi
*/

export const CMD_NEW_SESSION = {
  method: "session.new",
  params: { capabilities: {} },
};

export const CMD_END_SESSION = {
  method: "session.end",
  params: {},
};

export const CMD_SESSION_STATUS = {
  method: "session.status",
  params: {},
};

let msgCounter: number = 0;
type TMSGID = number;
type TRequest = Record<string, unknown>;
export type TResponse = {
  id: number;
  result: Record<string, unknown>;
};
type TCallback = (er: Error | null, data?: TResponse) => void;
type TSendMessage = (msg: TRequest, cb: TCallback) => void;
const RRMap: Map<TMSGID, TCallback> = new Map();

export async function connectBidi(serverURL: string): Promise<TSendMessage> {
  return new Promise((resolve, reject) => {
    const wss = new Ws.WebSocket(serverURL);
    wss.on("error", reject);
    process.once("exit", () => {
      console.log("Closing bidi connection...");
      wss.close();
      sendMessage(wss, CMD_END_SESSION, (er: Error | null) => {
        if (er) throw new Error("Failed to close bidi session", { cause: er });
        console.log("Closed bidi session!");
      });
    });
    wss.on("open", () => {
      console.log(`Connected to bidi server: ${serverURL}`);
      wss.on("message", handleMessage);
      sendMessage(
        wss,
        CMD_NEW_SESSION,
        (er: Error | null, data?: TResponse) => {
          if (er) return reject(er);
          console.log(`New bidi session started: ${data!.result.sessionId}`);
          resolve(sendMessage.bind(null, wss));
        },
      );
    });
  });
}

function handleMessage(data: Buffer) {
  const response: TResponse = JSON.parse(data.toString());
  const callback = RRMap.get(response.id);
  if (callback) callback(null, response);
  else logjson(response);
}

function sendMessage(wss: Ws.WebSocket, msg: TRequest, cb: TCallback): void {
  const msgId = ++msgCounter;
  wss.send(
    JSON.stringify({
      method: "",
      params: {},
      ...msg,
      id: msgCounter,
    }),
    (err: Error | undefined) => {
      if (err) return cb(err);
      RRMap.set(msgId, cb);
    },
  );
}
