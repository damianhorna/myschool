import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  public API = '//localhost:8080';
  public TEACHER_API = this.API + '/lessons';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(this.TEACHER_API)
  }

  save(teacher): Observable<any> {
    let result: Observable<Object>;
    if (teacher['href']) {
      result = this.http.put(teacher.href, teacher);
    } else {
      result = this.http.post(this.TEACHER_API, teacher);
    }
    return result;
  }

  remove(href: string) {
    return this.http.delete(href);
  }


  putClazz(lesson, clazzHref) {
    console.log("put clazz", clazzHref);
    const headers = new HttpHeaders().set('Content-Type', 'text/uri-list; charset=utf-8');
    return this.http.put(lesson.href + '/clazz', clazzHref, {headers: headers});
  }

  deleteClazz(lesson) {
    return this.http.delete(lesson.href + '/clazz');
  }

  putClassroom(lesson, classroomHref) {
    console.log("put classroom", classroomHref);
    const headers = new HttpHeaders().set('Content-Type', 'text/uri-list; charset=utf-8');
    return this.http.put(lesson.href + '/classroom', classroomHref, {headers: headers});
  }

  deleteClassroom(lesson) {
    return this.http.delete(lesson.href + '/classroom');
  }

  putSubject(lesson, subjectHref) {
    console.log("put subject", subjectHref);
    const headers = new HttpHeaders().set('Content-Type', 'text/uri-list; charset=utf-8');
    return this.http.put(lesson.href + '/subject', subjectHref, {headers: headers});
  }

  deleteSubject(lesson) {
    return this.http.delete(lesson.href + '/subject');
  }

  putTeacher(lesson, teacherHref) {
    console.log("put teacher", teacherHref)
    const headers = new HttpHeaders().set('Content-Type', 'text/uri-list; charset=utf-8');
    return this.http.put(lesson.href + '/teacher', teacherHref, {headers: headers});
  }

  deleteTeacher(lesson) {
    return this.http.delete(lesson.href + '/teacher');
  }
}
