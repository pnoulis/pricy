export type TErrorCallback = (error?: Error | null) => void;

export function assertNever(value: never): never {
  throw new Error(`Unhandled union member: ${JSON.stringify(value)}`);
}
