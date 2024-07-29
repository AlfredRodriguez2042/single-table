export interface IRepository {
    findAll: () => Promise<any>
    findOne: (options: any) => Promise<any>
    // findByEmail: () => Promise<any>
    create: (model: any) => Promise<any>
    // update: () => Promise<any>
    // delete: () => Promise<any>
}