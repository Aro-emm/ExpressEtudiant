// Erreur "métier" qu'on peut lever partout dans les controllers
// avec un code HTTP précis, interceptée ensuite par errorHandler.ts
export class AppError extends Error {
    statusCode;
    constructor(message, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, AppError.prototype);
    }
}
