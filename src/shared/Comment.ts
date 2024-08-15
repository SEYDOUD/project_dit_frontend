export class Comment{
    constructor(
        public id:string,
        public idPost:string,
        public username:string,
        public message: string,
        public status:string
    ){}
}