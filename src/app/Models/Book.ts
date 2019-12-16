
export class Book{
    id:number;
    title:string;
    releaseDate:Date;
    publisherId:number;
    genre:string;
}

export enum Genres{
    adventure="adventure",
    comedy="comedy",
    drama="drama",
    epic="epic",
    lyric="lyric"
}