import { styles } from "src/configs/cruxis-dialogue-console.";
import { User } from "./types";

export function tokenExists(token: string | null): asserts token is string {
  if (token === null)
    throw new Error ("The data hasn't been saved properly in Local Storage.");
}
export async function afterSignup () {
  const token = localStorage.getItem('AuthorizationToken');
  tokenExists(token);
  const user = await fetch(`${process.env.NEXT_PUBLIC_MANDALORE}/user`, { method: 'POST', headers: { authorization: `Bearer ${token}` } });
  const { step } = (await user.json()) as User;
  localStorage.setItem('step', step.toString());
  console.log(`%cHi, I'm Cruxis! I hope we will be great friends!`, styles);
}
export async function afterLogin () {
  const token = localStorage.getItem('AuthorizationToken');
  tokenExists(token);

  const user = await fetch(`${process.env.NEXT_PUBLIC_MANDALORE}/user/data`, { method: 'GET', headers: { Authorization: `Bearer ${token}` } });
  const { status, step } = (await user.json()) as User;
  if (status !== 'COMPLETE') {
    console.log(`%cHi, I'm Cruxis! I hope we will be great friends!`, styles);
    localStorage.setItem('step', step.toString());
  } else {
    console.log(`%cWelcome back! I'm glad to see you again. What do you want to talk about today?`, styles);
  }
  localStorage.setItem('status', status.toString());

return status;
}
