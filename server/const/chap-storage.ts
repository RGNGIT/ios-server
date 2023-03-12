import Misc from "../services/misc";

type SessionUser = { userkey: number; N: Number; salt: string };

export let sessions: SessionUser[] = [];

export async function chapPush(unit: {
  userkey: number;
  N: Number;
  salt: string;
}): Promise<SessionUser | null> {
  const checkUser = (Key) => {
    for (const user of sessions) {
      if (user.userkey == Key) return user;
    }
    return null;
  };
  const foundUser = checkUser(unit.userkey);
  if (!foundUser) {
    sessions.push(unit);
    return null;
  } else {
    await Misc.logger(
      `Сессия ${JSON.stringify(foundUser)} уже существует. Скип.`,
      false
    );
    return foundUser;
  }
}
