import KeepingData from "./KeepingData";
// import Outlet from "./Outlet";
// import User from "./User";

export enum DeliveryStatus {
  draft = 1,
  publish = 2,
  selesai = 3,
}

export default class Delivery {
  public DeliveryStatus;
  constructor(
    public id: number,
    public outlet: number,
    public createdBy: number,
    public checkedBy: number,
    public status: number,
    public bottles: KeepingData[],
    public createdAt: string,
    public updatedAt: string
  ) {
    this.DeliveryStatus = DeliveryStatus;
  }

  public get deliveryStatusIndonesian() {
    return this.DeliveryStatus[this.status].replaceAll("_", " ").toUpperCase();
  }

  public static fromJson(json: any): Delivery {
    return new Delivery(
      json.id,
      json.outlet_id,
      json.created_by,
      json.checked_by,
      json.status,
      json.bottle_keeps.map((bottle: any) => KeepingData.fromJson(bottle)),
      json.created_at,
      json.updated_at
    );
  }
}
