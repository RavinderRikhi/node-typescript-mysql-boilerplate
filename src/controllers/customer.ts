import { Controller } from "./controller";
import { HttpServer } from "../server/httpServer";
import { Request, Response } from "restify";
import { customerService } from "../services/customer";

export class CustomerController implements Controller {
    public initializer(httpServer: HttpServer): void {
        httpServer.get('/customers', this.list.bind(this));
        httpServer.get('/customer/:id', this.getById.bind(this));
        httpServer.post('/customer', this.create.bind(this));
        httpServer.put('/customer/:id', this.update.bind(this));
        httpServer.delete('/customer/:id', this.remove.bind(this));
    }

    // List will act as 'Request Handler' for this controller
    private async list(req: Request, res: Response): Promise<void> {
        res.send(await customerService.list());
    }

    private async getById(req: Request, res: Response): Promise<void> {
        const customer = await customerService.getById(req.params.id);
        // create a new api to create server responses depending on the data sent
        res.send(customer ? 200 : 404, customer);
    }

    private async create(req: Request, res: Response): Promise<void> {
        // Do Validation for request body here using JOI or revalidator
        res.send(await customerService.create(req.body));
    }

    private async update(req: Request, res: Response): Promise<void> {
        // Do Validation for request body here using JOI or revalidator
        res.send(await customerService.update(req.body));
    }

    private async remove(req: Request, res: Response): Promise<void> {
        res.send(await customerService.update(req.params.id));
    }
}
