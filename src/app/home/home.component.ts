import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { PropertyService } from '../services/property.service';
import { Property } from '../models/property.model';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  properties: Property[] = [];
  currentPage = 1;
  itemsPerPage = 12;
  totalPages = 1;
  isLoading: boolean = true;
  filters = {
    title: null,
    numBedrooms: null,
    numBathrooms: null,
    hospitalsNearby: null,
    collegesNearby: null,
    petFriendly: null,
    balconyAvailable: null,
    parkingAreaAvailable: null,
    isCCTVAvailable: null
  };

  bedrooms = Array.from({ length: 5 }, (_, i) => i + 1);
  bathrooms = Array.from({ length: 5 }, (_, i) => i + 1);

  constructor(private propertyService: PropertyService, private el: ElementRef, private loader: LoaderService) { }

  ngOnInit(): void {
    this.loader.show();
    this.loadProperties(this.currentPage);
  }

  ngOnDestroy(): void {}

  onFilterChange(): void {
    this.currentPage = 1;  // Reset to first page on filter change
    this.loader.show();
    this.loadProperties(this.currentPage);
  }

  clearFilters(): void {
    this.filters = {
      title: null,
      numBedrooms: null,
      numBathrooms: null,
      hospitalsNearby: null,
      collegesNearby: null,
      petFriendly: null,
      balconyAvailable: null,
      parkingAreaAvailable: null,
      isCCTVAvailable: null
    };
    this.loader.show();
    this.loadProperties(1);
  }

  loadProperties(page: number): void {
    this.propertyService.getProperties(page, this.itemsPerPage, this.filters).subscribe((response: HttpResponse<any>) => {
      this.properties = response.body.data;
      this.isLoading = false;
      this.loader.hide();
      const paginationHeader = response.headers.get('x-pagination');
      if (paginationHeader) {
        const paginationData = JSON.parse(paginationHeader);
        this.totalPages = paginationData.totalPages;
      }
    });
  }

  get paginatedProperties(): Property[] {
    return this.properties;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadProperties(this.currentPage);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadProperties(this.currentPage);
    }
  }
}
