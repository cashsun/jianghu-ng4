export interface IUser {
  _id: string,
  email: string,
  firstname: string,
  lastname: string,
  hanabi?: object
}

export interface IMatch {
  group: string,
  fav: boolean
}

export interface IArticles {
  items: { [key: string]: IUserArticle },
  match: IMatch
}

export interface IUserArticle {
  _id: string,
  userId: string,
  image?: string,
  url: string,
  favourite: boolean,
  title: string,
  group: string,
  date: string,
  author?: string[],
  description: string
}

export interface IArticle {
  _id: string,
  url: string,
  image: string,
  title: string,
  description: string,
  content: string,
  date: string,
  keywords?: string,
  tags?: string[],
  author?: string[],
}
