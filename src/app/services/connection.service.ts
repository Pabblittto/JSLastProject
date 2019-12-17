import { Book } from './../Models/Book';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {// serwis do łączenia się z bazą poprzez Observable

  constructor(private http:HttpClient) { }


  private BookUrl:string="http://localhost:3000/books/";
  private AuthorUrl:string="http://localhost:3000/authors/";
  private BookAuthorUrl:string="http://localhost:3000/bookAuthor/";
  private PublisherUrl:string="http://localhost:3000/publisher/"


  GetCertainBook(Id:number):Observable<Book>{
     return this.http.get<Book>(this.BookUrl+Id);
  }

  GetBookList():Observable<Book[]>{
    return this.http.get<Book[]>(this.BookUrl);
  }

  UpdateCertainBook(Id:number,UpBook:Book){
    return this.http.patch(this.BookUrl+Id,UpBook);
  }

  DeleteCertainBook(Id:number){
    return this.http.delete(this.BookUrl+Id);
  }
  // Authorssssssssssssssssssssssssssssssssss

  GetCertainAuthor(Id:number){
    return this.http.get(this.AuthorUrl)
    
  }
  


}
