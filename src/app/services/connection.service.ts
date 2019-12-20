import { BookAuthor } from './../Models/BookAuthor';
import { Author } from './../Models/Author';
import { Book } from './../Models/Book';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Publisher } from '../Models/Publisher';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {// serwis do łączenia się z bazą poprzez Observable

  constructor(private http:HttpClient) { }


  private BookUrl:string="http://localhost:3000/books/";
  private AuthorUrl:string="http://localhost:3000/authors/";
  private BookAuthorUrl:string="http://localhost:3000/bookAuthor";
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

  AddBook(NewBook:Book):Observable<Book>{
    return this.http.post<Book>(this.BookUrl,NewBook);
  }


  // Authorssssssssssssssssssssssssssssssssss

  GetCertainAuthor(Id:number):Observable<Author>{
    return this.http.get<Author>(this.AuthorUrl+Id);
  }
   

  GetAuthorList():Observable<Author[]>{
    return this.http.get<Author[]>(this.AuthorUrl);
  }

  UpdateCertainAuthor(Id:number,UpAuthor:Author){
    return this.http.patch(this.AuthorUrl+Id,UpAuthor);
  }

  DeleteCertainAuthor(Id:number){
    return this.http.delete(this.AuthorUrl+Id);
  }

  AddAuthor(NewAuthor:Author){
    return this.http.post(this.AuthorUrl,NewAuthor);
  }

  // AuthorBook /////////////////////////////////


  GetObjectForCertainBook(BookId:number):Observable<BookAuthor[]>{
    return this.http.get<BookAuthor[]>(`${this.BookAuthorUrl}?bookId=${BookId}`);
  }

  GetObjectsForCertainAuthor(AuthotId:number):Observable<BookAuthor[]>{
    return this.http.get<BookAuthor[]>(`${this.BookAuthorUrl}?authorId=${AuthotId}`);
  }

  AddBookAuthorObject(NewBookAuthor:BookAuthor):Observable<BookAuthor>{
    return this.http.post<BookAuthor>(this.BookAuthorUrl,NewBookAuthor);
  }

  DeleteBookAuthorObject(Id:number){
    return this.http.delete(`${this.BookAuthorUrl}/${Id}`);
  }

  UpdateBookAuthorObject(Id:number, UpBookAuthor:BookAuthor){
    return this.http.patch(`${this.BookAuthorUrl}/${Id}`,UpBookAuthor);
  }

  // Publisherssssssssssssssssssssssssssss

  GetCertainPublisher(Id:number):Observable<Publisher>{
    return this.http.get<Publisher>(this.PublisherUrl+Id);
  }

  GetPublishersList():Observable<Publisher[]>{
    return this.http.get<Publisher[]>(this.PublisherUrl);
  }

  UpdateCertainPublisher(Id:number,UpPublisher:Publisher){
    return this.http.patch(this.PublisherUrl+Id,UpPublisher);
  }

  DeleteCertainPublisher(Id:number){
    return this.http.delete(this.PublisherUrl+Id);
  }

  AddPublisher(NewPublisher:Publisher):Observable<Publisher>{
    return this.http.post<Publisher>(this.PublisherUrl,NewPublisher);
  }

}
