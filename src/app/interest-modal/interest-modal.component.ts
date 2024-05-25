import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserAuthService } from '../services/user-auth.service';

@Component({
  selector: 'app-interest-modal',
  templateUrl: './interest-modal.component.html',
  styleUrls: ['./interest-modal.component.css']
})
export class InterestModalComponent implements OnInit {
  sellerDetails: any = {};

  constructor(
    public dialogRef: MatDialogRef<InterestModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userAuthService: UserAuthService
  ) {}

  ngOnInit(): void {
    if (this.data.sellerId) {
      this.userAuthService.getUserById(this.data.sellerId)
        .subscribe(response => {
          if (response.isSuccess) {
            this.sellerDetails = response.data;
          }
        });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
