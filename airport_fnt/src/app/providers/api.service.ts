import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  usuario:any;
  base_url = 'http://127.0.01:8000'
  header_login = new HttpHeaders().set('Content-Type','application/json')
  options_login = {headers:this.header_login};
  header_token:any
  options_token:any

// inyectar la dependencia dentro del los parentesis
  constructor(private http:HttpClient) { }

  login(data:any){
    let url = `${this.base_url+'/token'}`;
    let credenciales = JSON.stringify(data)
    return this.http.post(url,credenciales,this.options_login).pipe(catchError(this.handleError<any>()))
  }
  get(endpoint:string): Observable<any[]>{
    let url = `${this.base_url+'/'+endpoint+'/'}`;
    return this.http.get(url,this.options_token).pipe(catchError(this.handleError<any>()))

  }
  add(endpoint:string, data:any) {
    let url = `${this.base_url+'/'+ endpoint +'/'}`;
    let dJson = JSON.stringify(data);
    return this.http.post(url,dJson, this.options_token).pipe(catchError(this.handleError<any>()))
  }

  crear_header_token(token:string){
    this.header_token = new HttpHeaders().set('Content-Type','application/json').set('Authorization','Token '+token)
    this.options_token = {headers:this.header_token};
  }

  update(endpoint: string, id: any, data: any) {
    let dJson = JSON.stringify(data);
    let url = `${this.base_url+'/'+ endpoint +'/'+id+'/'}`;
    return this.http.patch(url,dJson, this.options_token).pipe(catchError(this.handleError<any>()))
  }


  private handleError<T> (result?: T) {
    return (error: any): Observable<T> => {
      console.log(error.error)
      return of(result as T);
    };
  }
}
