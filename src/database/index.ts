import { Connection, createConnection } from "typeorm";
import Customer from "../models/customer";

export interface DatabaseConfiguration {
    type: 'mysql',
    host: string,
    port: number,
    username: string,
    password: string,
    database: string,
    ssl?: boolean,
}

export class DatabaseProvider {
    private static connection: Connection;
    private static configuration: DatabaseConfiguration;

    public static configure(config: DatabaseConfiguration): void {
        // This config is test only don't do this in 'prod'
        DatabaseProvider.configuration = config;
    }

    public static async getConnection(): Promise<Connection> {
        // if connection is cached then return the cached one
        if (DatabaseProvider.connection) {
            return DatabaseProvider.connection;
        }

        const { type, host, port, username, password, database, ssl } = DatabaseProvider.configuration;
        DatabaseProvider.connection = await createConnection({
            type, host, port, username, password, database,
            extra:{
                ssl
            },
            entities: [ Customer ],
            // DO NOT USE IN 'PRODUCTION' !!!!!!!!!!!
            synchronize: true,      // This statement makes the orm to delete and reinitialize the entire database wher server is restarted
        });

        return DatabaseProvider.connection; 
    }
}