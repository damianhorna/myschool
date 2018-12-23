import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClazzService {

  public API = '//localhost:8080';
  public CLAZZ_API = this.API + '/clazzes';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(this.CLAZZ_API)
  }

  save(clazz): Observable<any> {
    if (clazz['href']) {
      return this.http.put(clazz.href, clazz);
    } else {
      return this.http.post(this.CLAZZ_API, clazz);
    }
  }

  remove(href: string) {
    return this.http.delete(href);
  }


  putTeacher(clazz, teacherHref) {
    const headers = new HttpHeaders().set('Content-Type', 'text/uri-list; charset=utf-8');
    return this.http.put(clazz.href + '/teacher', teacherHref, {headers: headers});
  }

  deleteTeacher(clazz){
    return this.http.delete(clazz.href + '/teacher');
  }
}
