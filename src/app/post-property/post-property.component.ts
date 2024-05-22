import { Component } from '@angular/core';

@Component({
  selector: 'app-post-property',
  templateUrl: './post-property.component.html',
  styleUrls: ['./post-property.component.css']
})
export class PostPropertyComponent {
  property = {
    title: '',
    description: '',
    imageUrl: ''
  };

  onSubmit() {
    // Handle property posting logic
    console.log('Property posted:', this.property);
  }
}
