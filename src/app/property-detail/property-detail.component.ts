import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent {
  property: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const propertyId = this.route.snapshot.paramMap.get('id');
    // Fetch property details using propertyId
    this.property = {
      id: propertyId,
      title: 'Cozy Apartment',
      description: 'A cozy apartment in the city center',
      imageUrl: 'https://via.placeholder.com/150',
      likes: 10,
      views: 50
    };
  }

  onInterested() {
    // Handle "I am Interested" action
    alert('You have expressed interest in this property.');
  }
}
