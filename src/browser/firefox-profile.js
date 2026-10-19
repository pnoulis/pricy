// Disable telemetry & reporting
user_pref("toolkit.telemetry.unified", false);
user_pref("toolkit.telemetry.enabled", false);
user_pref("datareporting.healthreport.uploadEnabled", false);

// Disable Firefox accounts, sync, and safe-browsing updates (saves network & CPU)
user_pref("identity.fxaccounts.enabled", false);
user_pref("browser.safebrowsing.malware.enabled", false);
user_pref("browser.safebrowsing.phishing.enabled", false);

// Disable pre-fetching and speculative connections
user_pref("network.prefetch-next", false);
user_pref("network.http.speculative-parallel-limit", 0);

// Disable disk caching (saves disk I/O, keeps everything in RAM)
user_pref("browser.cache.disk.enable", false);

// Keep WebGL and JS fast for SPAs:
user_pref("javascript.options.wasm", true);
