export class User {
  constructor(
    public firstName: string,
    public lastName: string,
    public userName: string,
    public email: string,
    public password: string,
    public phone?: number,
    public country?: string,
  ) {
  }
}
