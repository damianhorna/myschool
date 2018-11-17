import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {SubjectService} from "../../service/subject/subject.service";

export interface SubjectData {
  name: string;
  href: string;
}

@Component({
  selector: 'subject-add-dialog',
  templateUrl: 'subject-add-dialog.html',
})
export class SubjectAddDialog {

  subject: { name: '', href: '' };
  errorMsg: string;
  error = false;

  constructor(
    public dialogRef: MatDialogRef<SubjectAddDialog>,
    @Inject(MAT_DIALOG_DATA) public subjectData: SubjectData,
    private subjectService: SubjectService) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addSubject() {
    this.error = false;
    if(this.subjectData.name.match(/^\s*$/)){
      this.error = true;
      this.errorMsg = 'subject name may not be empty';
    } else {
      this.subjectService.save({name: this.subjectData.name.trim(), href: this.subjectData.href}).subscribe(result => {
        this.dialogRef.close();
      }, error => {
        this.error = true;
        this.errorMsg = 'subject with given name already exists';
        console.log(error)
      });
    }
  }
}
