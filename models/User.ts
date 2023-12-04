import Outlet from "./Outlet";

export default class User {
  constructor(
    public id: number,
    public userId: number,
    public username: string,
    public name: string,
    public outlet: Outlet
  ) {}

  public static fromJson(json: any): User {
    return new User(
      json.id,
      json.user_id,
      json.username,
      json.name,
      Outlet.fromJson(json.outlet)
    )
  }
}
