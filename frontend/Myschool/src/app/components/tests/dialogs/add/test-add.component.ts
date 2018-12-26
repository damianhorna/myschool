import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {TestService} from "../../../../service/test/test.service";

export interface TestData {
  type: string;
  href: string;
}

@Component({
  selector: 'test-add-dialog',
  templateUrl: './test-add-dialog.html',
})
export class TestAddDialog {

  errorMsg: string;
  error = false;

  constructor(
    public dialogRef: MatDialogRef<TestAddDialog>,
    @Inject(MAT_DIALOG_DATA) public testData: TestData,
    private testService: TestService) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addTest() {
    this.error = false;
    if (this.testData.type.match(/^\s*$/)) {
      this.error = true;
      this.errorMsg = 'test type may not be empty';
    } else {
      this.testService.save({type: this.testData.type.trim(), href: this.testData.href}).subscribe(result => {
        this.dialogRef.close();
      }, error => {
        this.error = true;
        this.errorMsg = 'test with given type already exists';
        console.log(error)
      });
    }
  }
}
