import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-full-screen-image-modal',
  templateUrl: './full-screen-image-modal.component.html',
  styleUrls: ['./full-screen-image-modal.component.css']
})
export class FullScreenImageModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { imageUrl: string }) {}
}
