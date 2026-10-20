import { connectBidi, CMD_SESSION_STATUS } from "#src/browser/bidi-client.ts";
import type { TResponse } from "#src/browser/bidi-client.ts";
import { launchFirefox } from "#src/browser/launchFirefox.ts";

await launchFirefox();
const sendMessage = await connectBidi(process.env.WEBDRIVER_URL!);
sendMessage(CMD_SESSION_STATUS, (er: Error | null, data?: TResponse) => {
  console.log(data);
});
