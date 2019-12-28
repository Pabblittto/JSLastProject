
export class Book{
    id:number;
    title:string;
    releaseDate:string;
    publisherId:number;
    genre:string;
    pages:number;
}

export enum Genres{
    adventure="adventure",
    comedy="comedy",
    drama="drama",
    epic="epic",
    lyric="lyric",
    horror="horror"
}