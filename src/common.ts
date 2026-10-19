export type TErrorCallback = (error?: Error | null) => void;

export function assertNever(value: never): never {
  throw new Error(`Unhandled union member: ${JSON.stringify(value)}`);
}

export function raise(er: Error) {
  throw er;
}

export function assertString(
  value: unknown,
  message?: string,
): asserts value is string {
  if (typeof value !== "string")
    throw new TypeError(
      message || `Expected a string, but received ${typeof value}`,
    );
}

export function isString(value: unknown, message?: string): string {
  if (typeof value === "string" && value !== "") return value;
  throw new TypeError(
    message || `Expected a string, but received ${typeof value}`,
  );
}
