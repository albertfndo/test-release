export default class Logs {
  constructor(
    public actionText: string,
    public createdBy: string,
    public notes: string
  ) {}

  public static fromJson(json: any): Logs {
    return new Logs(json.action_text, json.created_by, json.notes);
  }
}
