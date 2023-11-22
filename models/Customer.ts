export default class Customer {
  constructor(public id: number, public name: string, public phone: string) {}

  public static fromJson(json: any): Customer {
    return new Customer(
      json.id,
      json.first_name + " " + json.last_name,
      json.phone_number
    );
  }
}
