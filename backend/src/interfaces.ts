export interface IPost {
    title: string
    description?: string
    abstract: string
    readingTime: number
    like: number
    dislike: number
    photo: string
    categories?: ICategory[]
    tags?: ITag[]
    author: IUser
    publishAt: Date
    updateAt: Date
    createdAt: Date
    comments?: IComment[]
}

export interface ICategory {
    title: string
    subCategories: ICategory[]
    createdAt: Date
    updateAt: Date
}

export interface IUser {
    name: string
    email: string
    phone: string
}

export interface ITag {
    title: string
    createdAt: Date
    updateAt: Date
}


export interface IComment {
    author: IUser
    msg: string
    like: number
    dislike: number
    createdAt: Date
    updatedAt: Date
}

// ————————————
// tags
// ————————————
// comments:
//     like and dislike
// ————————————
// media (upload image)