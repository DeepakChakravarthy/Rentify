import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  properties = [
    { id: 1, title: 'Beautiful House 1', description: 'Description for house 1', image: 'https://source.unsplash.com/random/300x200?house1' },
    { id: 2, title: 'Beautiful House 2', description: 'Description for house 2', image: 'https://source.unsplash.com/random/300x200?house2' },
    { id: 3, title: 'Beautiful House 3', description: 'Description for house 3', image: 'https://source.unsplash.com/random/300x200?house3' },
    { id: 4, title: 'Beautiful House 4', description: 'Description for house 4', image: 'https://source.unsplash.com/random/300x200?house4' },
    { id: 5, title: 'Beautiful House 5', description: 'Description for house 5', image: 'https://source.unsplash.com/random/300x200?house5' },
    { id: 6, title: 'Beautiful House 6', description: 'Description for house 6', image: 'https://source.unsplash.com/random/300x200?house6' },
    // Add more property objects here
  ];
  currentPage = 1;
  itemsPerPage = 6;
  totalPages = Math.ceil(this.properties.length / this.itemsPerPage);

  constructor() { }

  ngOnInit(): void {
  }

  get paginatedProperties() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.properties.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
