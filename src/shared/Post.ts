export class Post{
    constructor(
        public id:string,
        public message: string,
        public img:string,
        public user:string,
        public appreciationTrueCount:number,
        public appreciationFalseCount:number,
        public commentCount:number,
    ){}
}