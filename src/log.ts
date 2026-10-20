import * as Prettier from "prettier";

export function logjson(json: string | Record<string, any>) {
  Prettier.format(typeof json === "string" ? json : JSON.stringify(json), {
    parser: "json",
  }).then(console.log);
  /* log message and use it in expressions at the same time */
  return json;
}
