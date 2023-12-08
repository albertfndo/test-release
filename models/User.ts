import Outlet from "./Outlet";

export default class User {
  constructor(
    public id: number | null,
    public userId: number,
    public username: string,
    public name: string,
    public outlet: Outlet | null
  ) {}

  public static fromJson(json: any): User {
    return new User(
      json.id ? json.id : null,
      json.user_id,
      json.username,
      json.name,
      json.outlet ? Outlet.fromJson(json.outlet) : null
    );
  }
}
