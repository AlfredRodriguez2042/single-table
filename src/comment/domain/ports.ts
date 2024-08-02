import type { FindOptions } from "../infrastructure/providers/client"
import type { Comment } from "./comment.model"

export interface IClientProvider {
    getLastId: (id: string) => Promise<Record<string, number>>
    updateLastId: (id: string) => Promise<any>
    findOne: (pk: any) => Promise<Comment>
    create: (comment: Comment) => Promise<Comment>
    findCommemtsPost: (query: { pk: string }) => Promise<Comment[]>
    findCommemtsUser: (options: FindOptions) => Promise<Comment[]>
}