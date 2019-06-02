import { Controller } from "./controller";
import { HttpServer } from "../server/httpServer";

// Service to test if the server is healthy or not
export class PingController implements Controller {
    public initializer(httpServer: HttpServer): void {
        httpServer.get('/ping', (req, res) => res.send(200, 'hello'));
    }
}