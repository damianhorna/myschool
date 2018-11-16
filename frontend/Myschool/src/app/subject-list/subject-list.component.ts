import {Component, OnInit} from '@angular/core';
import {SubjectService} from "../service/subject/subject.service";

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent implements OnInit {

  subjects: Array<any>;

  constructor(private subjectService: SubjectService) {
  }

  ngOnInit() {
    this.subjectService.getAll().subscribe(data => {
      this.subjects = data._embedded.subjects;
    });
  }

  setEditedSubject(subject: any) {
    this.subjectService.setEditedSubject(subject)
  }
}
