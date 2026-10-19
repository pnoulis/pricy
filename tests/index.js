import { launchNextjsApp } from "#tests/launchNextjsApp.js";
import { launchFirefox } from "#build/browser/launchFirefox.js";

const nextjsApp = await launchNextjsApp();
const firefox = await launchFirefox();
