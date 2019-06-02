import { RequestHandler } from "restify";

// This interface will act as our contract for defining our Web APIs later on
export interface HttpServer {
    get(url: string, requestHandler: RequestHandler): void;
    post(url: string, requestHandler: RequestHandler): void;
    put(url: string, requestHandler: RequestHandler): void;
    delete(url: string, requestHandler: RequestHandler): void;
} 