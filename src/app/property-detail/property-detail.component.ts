import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InterestModalComponent } from '../interest-modal/interest-modal.component';
import { FullScreenImageModalComponent } from '../full-screen-image-modal/full-screen-image-modal.component';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {
  property = {
    title: 'Spacious 2 BHK Apartment',
    imageUrls: [
      'https://4.img-dpreview.com/files/p/TS600x600~sample_galleries/3002635523/4971879462.jpg',
      'https://4.img-dpreview.com/files/p/TS600x600~sample_galleries/3002635523/4971879462.jpg',
      'https://4.img-dpreview.com/files/p/TS600x600~sample_galleries/3002635523/4971879462.jpg',
      'https://4.img-dpreview.com/files/p/TS600x600~sample_galleries/3002635523/4971879462.jpg'
    ],
    description: 'A spacious 2 BHK apartment with modern amenities and a great view.',
    rentalAmount: 15000,
    advanceRentalAmount: 45000,
    tenantPreference: 'Family',
    availabilityDate: new Date('2023-06-01'),
    renewalPeriod: 5,
    ebBillDebited: 'Yes',
    parkingArea: 'Yes',
    balcony: 'Yes',
    rentAgreement: 'Yes',
    cctv: 'Yes',
    waterTaxDebited: 'Yes',
    petFriendly: 'No',
    likes: 120,
    views: 3500
  };

  constructor(public dialog: MatDialog, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cdr.markForCheck();
  }

  likeProperty(): void {
    this.property.likes++;
  }

  openInterestModal(): void {
    const dialogRef = this.dialog.open(InterestModalComponent, {
      width: '250px',
      data: { firstName: '', lastName: '', phone: '', email: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  openFullScreenImage(url: string): void {
    const dialogRef = this.dialog.open(FullScreenImageModalComponent, {
      data: { imageUrl: url }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Full screen image dialog was closed');
    });
  }
}
