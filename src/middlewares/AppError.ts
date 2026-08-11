// Erreur "métier" qu'on peut lever partout dans les controllers
// avec un code HTTP précis, interceptée ensuite par errorHandler.ts
export class AppError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
