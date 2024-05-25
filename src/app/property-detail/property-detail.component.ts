import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PropertyService } from '../services/property.service';
import { InterestModalComponent } from '../interest-modal/interest-modal.component';
import { FullScreenImageModalComponent } from '../full-screen-image-modal/full-screen-image-modal.component';
import { LoaderService } from '../services/loader.service';
import { UserAuthService } from '../services/user-auth.service';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {
  property: any = {};
  imageUrls: string[] = [];
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private loader: LoaderService,
    private authService: UserAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const propertyId = this.route.snapshot.paramMap.get('id');
    if (propertyId) {
      this.loader.show();
      this.propertyService.getPropertyById(propertyId).subscribe(data => {
        this.property = data;
        this.imageUrls = [
          this.property.data.imageUrl1,
          this.property.data.imageUrl2,
          this.property.data.imageUrl3,
          this.property.data.imageUrl4
        ].filter(url => url); // Filter out any empty URLs

        this.cdr.markForCheck();
        this.isLoading = false;
        this.loader.hide();
      });
    }
  }

  likeProperty(): void {
    this.property.likes++;
  }

  openInterestModal(): void {
    if (!this.authService.isUserLoggedIn()) {
      this.router.navigate(['/auth']);
      return;
    }

    const sellerId = this.property.data.sellerId;
    const dialogRef = this.dialog.open(InterestModalComponent, {
      width: '250px',
      data: { sellerId }
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
