import { HttpServer } from "./httpServer";
import * as restify from 'restify';
import { RequestHandler, Server } from 'restify';
import { CONTROLLERS } from '../controllers';

export class ApiServer implements HttpServer {
    private restify: Server;

    get(url: string, requestHandler: RequestHandler): void {
        this.addRoute('get', url, requestHandler);
    }
    post(url: string, requestHandler: RequestHandler): void {
        this.addRoute('post', url, requestHandler);
    }
    put(url: string, requestHandler: RequestHandler): void {
        this.addRoute('put', url, requestHandler);
    }
    delete(url: string, requestHandler: RequestHandler): void {
        this.addRoute('del', url, requestHandler);
    }
    
    // 
    private addRoute(
        method: 'get' | 'post' | 'put' | 'del',
        url: string,
        requestHandler: RequestHandler
    ): void {
        this.restify[method](url, async (req, res, next) => {
            try {
                await requestHandler(req, res, next);
            } catch (err) {
                console.log(err);
                res.send(500, err);
            }
            console.log(`Added route ${method.toUpperCase()}: ${url}`);
        });
    }

    public start(port: number): void {
        this.restify = restify.createServer();
        this.restify.use(restify.plugins.bodyParser());
        this.restify.use(restify.plugins.queryParser());

        CONTROLLERS.forEach(controller => controller.initializer(this));

        this.restify.listen(port, () => console.log(`Server is up & running on port ${port}`));
    }
}