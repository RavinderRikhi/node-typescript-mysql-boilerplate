import { HttpServer } from "../server/httpServer";

export interface Controller {
    initializer(httpServer: HttpServer): void;
}