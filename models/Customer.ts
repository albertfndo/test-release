export default class Customer {
  constructor(
    public id: number,
    public name: string,
    public phone: string,
    public membershipTypeText: string | null,
    public typeText: string | null,
    public genderText: string
  ) {}

  public static fromJson(json: any): Customer {
    return new Customer(
      json.id,
      json.first_name + " " + json.last_name,
      json.phone_number,
      json.membership_data ? json.membership_data.membership.name : null,
      json.type ? json.type.name : null,
      json.gender_text
    );
  }
}
