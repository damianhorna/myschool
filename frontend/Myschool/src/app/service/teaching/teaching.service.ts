import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TeachingService {

  constructor(private http: HttpClient) {
  }

  getSubjectsForTeacher(teacher): Observable<any> {
    return this.http.get(teacher._links.subjects.href)
  }

  putSubjects(teacher, subjectHrefs) {
    console.log(subjectHrefs);
    let body = "";
    for (let href of subjectHrefs) {
      body += href + "\n";
    }
    const headers = new HttpHeaders().set('Content-Type', 'text/uri-list; charset=utf-8');
    if (subjectHrefs.length == 0) {
      return this.http.put(teacher.href + '/subjects', null, {headers: headers});
    } else {
      return this.http.put(teacher.href + '/subjects', body, {headers: headers});
    }
  }
}
