import Misc from "../services/misc";
import PhysService from "../services/phys";

type SessionUser = {
  UserData: {
    UserKey: number;
    Email: string;
    Verify: string;
    Role: any
  };
  Token: string;
  TTL?: Date;
};

let sessions: SessionUser[] = [];

export function checkSession(email: string): SessionUser | null {
  for(const user of sessions) {
    if(user.UserData.Email == email) {
      Misc.logger(`Сессия ${JSON.stringify(user.UserData)} существует. Скип.`, true);
      return user;
    }
  }
  return null;
}

export async function pushSession(user: SessionUser): Promise<void> {
  const dbSession = await PhysService.registerLogin(user.UserData.UserKey);
  user.TTL = dbSession.Logout_Time;
  Misc.logger(`Сессия ${JSON.stringify(user.UserData)} добавлена в стек. TTL: ${user.TTL}`, true);
  sessions.push(user);
}
