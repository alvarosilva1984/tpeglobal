import {User} from '../auth/user.model';

export class Memouser {

  constructor(
    public day: string,
    public id: string,
    public userId: string,
    public user: User
  ) {
  }
}
