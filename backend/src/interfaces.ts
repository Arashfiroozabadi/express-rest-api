export interface IPost {
    title: string;
    description: string;
    abstract: string;
    readingTime?: number;
    like?: number;
    dislike?: number;
    photo?: string;
    publishAt?: Date;
    updateAt?: Date;
    createdAt?: Date;
    author: IUser;
    categories?: ICategory[];
    comments?: IComment[];
    tags?: ITag[];
}

export interface ICategory {
    title: string;
    subCategories: ICategory[];
    createdAt: Date;
    updateAt: Date;
}

export interface IUser {
    _id?: string;
    name: string;
    email: string;
    phone: string;
    password: string,
    token?: string;
    createdAt?: Date
    updatedAt: Date

    generateAuthToken(): string;
}

export interface ITag {
    title: string;
    createdAt: Date;
    updateAt: Date;
}

export interface IComment {
    author: IUser;
    msg: string;
    like: number;
    dislike: number;
    createdAt: Date;
    updatedAt: Date;
}