import Customer from "../models/customer";
import { DatabaseProvider } from "../database";
import { Connection } from "typeorm";

export class CustomerServices {
    public async getById(id: number): Promise<Customer> {
        const connnection = await DatabaseProvider.getConnection();
        return await connnection.getRepository(Customer).findOne({"id": id});
    }

    public async create(customer: Customer): Promise<Customer> {
        const connnection = await DatabaseProvider.getConnection();
        // Write Customer Validation HERE using JOI js or Revalidator
        return await connnection.getRepository(Customer).save(customer);
    }

    // pass queries as params for the function 
    public async list(): Promise<Customer[]>{
        const connnection = await DatabaseProvider.getConnection();
        // Use the params to create a query
        return await connnection.getRepository(Customer).find();
    }

    public async update(customer: Customer): Promise<Customer> {
        const connnection = await DatabaseProvider.getConnection();
        const repo = await connnection.getRepository(Customer);
        const entity = await repo.findOne({"id": customer.id});
        entity.firstName = customer.firstName;
        entity.lastName = customer.lastName;
        return await repo.save(entity);
    }

    public async delete(id: number): Promise<any> {
        const connnection = await DatabaseProvider.getConnection();
        return await connnection.getRepository(Customer).delete({id});
    }
}
// Making the service as singleton
export const customerService = new CustomerServices();