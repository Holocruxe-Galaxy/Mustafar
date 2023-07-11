export function tokenExists(token: string | null): asserts token is string {
  if (token === null)
    throw new Error ("The data hasn't been saved properly in Local Storage.");
}