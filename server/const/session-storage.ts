import Misc from "../services/misc";
import moment from "moment";


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

export function pushSession(user: SessionUser): void {
  user.TTL = moment(Date.now(), true).add(1, 'hour').toDate();
  Misc.logger(`Сессия ${JSON.stringify(user.UserData)} добавлена в стек. TTL: ${user.TTL.toISOString()}`, true);
  sessions.push(user);
}
