import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-interest-modal',
  templateUrl: './interest-modal.component.html',
  styleUrls: ['./interest-modal.component.css']
})
export class InterestModalComponent {
  constructor(
    public dialogRef: MatDialogRef<InterestModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
