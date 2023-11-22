export default class Histories {
  constructor(
    public id: number,
    public imageUrl: string,
    public description: string,
    public stored_at: string,
    public released_at: string,
    public release_notes: string
  ) {}

  public static fromJson(json: any): Histories {
    return new Histories(
      json.id,
      json.image_url,
      json.description,
      json.stored_at,
      json.released_at,
      json.release_notes
    );
  }
}
