import Customer from "./Customer";
import Histories from "./Histories";
import Logs from "./Logs";
import Outlet from "./Outlet";

export enum BottleStatus {
  lock = 1,
  unlock = 2,
  release = 3,
  history = 4,
  waitingExpired = 5,
}

export enum BottleStatusIndonesianText {
  terkunci = 1,
  terbuka = 2,
  diambil = 3,
  expired = 4,
  menunggu_expired = 5,
}

export default class KeepingData {
  public BottleStatus;
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
    public statusText: string,
    public remainingKeeps: number,
    public userFullName: string,
    public phoneNumber: string,
    public logs: Logs[] | []
  ) {
    this.BottleStatus = BottleStatusIndonesianText;
  }

  public get bottleStatusIndoText() {
    return this.BottleStatus[this.status].replaceAll("_", " ").toUpperCase();
  }

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
      json.status_text,
      json.remaining_keeps,
      json.user_fullname,
      json.phone_number,
      json.logs ? json.logs.map((log: any) => Logs.fromJson(log)) : []
    );
  }
}
