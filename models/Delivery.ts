import KeepingData from "./KeepingData";
import Outlet from "./Outlet";
import User from "./User";

export enum DeliveryStatus {
  draft = 1,
  publish = 2,
  selesai = 3,
}

export default class Delivery {
  public DeliveryStatus;
  constructor(
    public id: number,
    public noDelivery: string,
    public outlet: Outlet,
    public createdBy: User | null,
    public checkedBy: User | null,
    public status: number,
    public bottles: KeepingData[],
    public arrivedAt: string,
    public createdAt: string
  ) {
    this.DeliveryStatus = DeliveryStatus;
  }

  public get deliveryStatusIndonesian() {
    return this.DeliveryStatus[this.status].replaceAll("_", " ").toUpperCase();
  }

  public static fromJson(json: any): Delivery {
    return new Delivery(
      json.id,
      json.no,
      Outlet.fromJson(json.outlet),
      json.created_by ? User.fromJson(json.created_by) : null,
      json.check_by ? User.fromJson(json.check_by) : null,
      json.status,
      json.bottle_keeps.map((bottle: any) => KeepingData.fromJson(bottle)),
      json.arrive_date,
      json.created_at
    );
  }
}
