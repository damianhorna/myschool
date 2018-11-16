import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  public API = '//localhost:8080';
  public SUBJECT_API = this.API + '/subjects';

  editedSubject: any;

  constructor(private http: HttpClient) {
  }

  setEditedSubject(subject: any) {
    subject.name ? this.editedSubject = {
      name: subject.name,
      href: subject._links.self.href
    } : this.editedSubject = subject;
  }

  getAll(): Observable<any> {
    return this.http.get(this.SUBJECT_API)
  }

  save(): Observable<any> {
    let result: Observable<Object>;
    if (this.editedSubject['href']) {
      result = this.http.put(this.editedSubject.href, this.editedSubject);
    } else {
      result = this.http.post(this.SUBJECT_API, this.editedSubject);
    }
    return result;
  }

  remove() {
    return this.http.delete(this.editedSubject.href);
  }
}
