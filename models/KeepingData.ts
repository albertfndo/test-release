import Customer from "./Customer";
import Histories from "./Histories";
import Outlet from "./Outlet";

export default class KeepingData {
  constructor(
    public id: number,
    public bottleName: string,
    public storedAt: string,
    public expiredAt: string,
    public expiredText: string,
    public customer: Customer | null,
    public outlet: Outlet | null,
    public histories: Histories[],
    public status: number,
    public statusText: string
  ) {}

  public static fromJson(json: any): KeepingData {
    return new KeepingData(
      json.id,
      json.name,
      json.stored_at,
      json.expired_at,
      json.expired_for_humans,
      json.user ? Customer.fromJson(json.user) : null,
      json.outlet ? Outlet.fromJson(json.outlet) : null,
      json.histories
        ? json.histories.map((history: any) => Histories.fromJson(history))
        : [],
      json.status,
      json.status_text
    );
  }
}
