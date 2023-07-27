import IComment from "~/types/Interfaces/Comment"


export default interface IBook {
    _id: string
    name: string
    userId: string
    username: string
    image: string
    description: string
    category: string
    comments: Array<IComment>
    note: number
    createdAt: string
    updatedAt: string
}