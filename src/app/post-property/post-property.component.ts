import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoaderService } from '../services/loader.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LocationService } from '../services/location.service';
import { PropertyService } from '../services/property.service';

@Component({
  selector: 'app-post-property',
  templateUrl: './post-property.component.html',
  styleUrls: ['./post-property.component.css']
})
export class PostPropertyComponent implements OnInit {
  isLinear = true; // Enable linear mode
  propertyForm: FormGroup;
  minDate: Date = new Date();
  maxDate!: Date;
  uploadedImages: (string | null)[] = [null, null, null, null]; // Placeholder for uploaded images
  imageFiles: (File | null)[] = [null, null, null, null];
  states: any[] = [];
  cities: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private loaderService: LoaderService,
    @Inject(ToastrService) private toastr: ToastrService,
    private router: Router,
    @Inject(LocationService) private locationService: LocationService,
    private propertyService: PropertyService
  ) {
    const currentYear = new Date().getFullYear();
    this.maxDate = new Date(currentYear + 1, 11, 31);
    this.propertyForm = this.formBuilder.group({
      basicInfo: this.formBuilder.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        area: ['', Validators.required]
      }),
      financialDetails: this.formBuilder.group({
        amount: ['', Validators.required],
        tenantRentalPeriod: ['', Validators.required],
        advanceAmount: ['', Validators.required]
      }),
      preferencesFeatures: this.formBuilder.group({
        tenantPreference: ['', Validators.required],
        ageOfProperty: ['', Validators.required],
        numBedrooms: ['', Validators.required],
        numBathrooms: ['', Validators.required],
        dateAvailable: ['', Validators.required],
        isRentAgreementAvailable: ['', Validators.required],
        agreementRenewalPeriod: ['', Validators.required],
        isCCTVAvailable: ['', Validators.required],
        isEBBillDebited: ['', Validators.required],
        isWaterTaxIncluded: ['', Validators.required],
        furnishedStatus: ['', Validators.required],
        hospitalsNearby: ['', Validators.required],
        collegesNearby: ['', Validators.required],
        parkingAreaAvailable: ['', Validators.required],
        petFriendly: ['', Validators.required],
        balconyAvailable: ['', Validators.required],
        totalFloors: ['', Validators.required],
        floorNumber: ['', Validators.required]
      }),
      locationDetails: this.formBuilder.group({
        address: ['', Validators.required],
        pincode: ['', Validators.required],
        landmark: ['', Validators.required],
        state: ['', Validators.required],
        country: ['', Validators.required],
        city: ['', Validators.required],
        exteriorImages: [null, Validators.required]
      })
    });

    this.loadStates();
  }
  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    console.log(userId);
    
  }

  get basicInfo(): FormGroup {
    return this.propertyForm.get('basicInfo') as FormGroup;
  }

  get financialDetails(): FormGroup {
    return this.propertyForm.get('financialDetails') as FormGroup;
  }

  get preferencesFeatures(): FormGroup {
    return this.propertyForm.get('preferencesFeatures') as FormGroup;
  }

  get locationDetails(): FormGroup {
    return this.propertyForm.get('locationDetails') as FormGroup;
  }

  loadStates() {
    this.locationService.getStates().subscribe((response: any) => {
      if (response.isSuccess) {
        this.states = response.data;
      }
    });
  }

  loadCities() {
    this.locationService.getCities().subscribe((response: any) => {
      if (response.isSuccess) {
        this.cities = response.data;
      }
    });
  }

  onStateChange(event: any) {
    const stateId = event.value;
    this.loadCities();
  }

  onSubmit() {
    if (this.propertyForm.valid) {
      this.loaderService.show(); // Show loader
      const formData = new FormData();

      // Append form data
      formData.append('title', this.basicInfo.get('title')!.value);
      formData.append('description', this.basicInfo.get('description')!.value);
      formData.append('area', this.basicInfo.get('area')!.value);
      formData.append('amount', this.financialDetails.get('amount')!.value);
      formData.append('tenantRentalPeriod', this.financialDetails.get('tenantRentalPeriod')!.value);
      formData.append('advanceAmount', this.financialDetails.get('advanceAmount')!.value);
      formData.append('tenantPreference', this.preferencesFeatures.get('tenantPreference')!.value);
      formData.append('ageOfProperty', this.preferencesFeatures.get('ageOfProperty')!.value);
      formData.append('numBedrooms', this.preferencesFeatures.get('numBedrooms')!.value);
      formData.append('numBathrooms', this.preferencesFeatures.get('numBathrooms')!.value);
      formData.append('dateAvailable', this.preferencesFeatures.get('dateAvailable')!.value.toUTCString());
      formData.append('isRentAgreementAvailable', this.preferencesFeatures.get('isRentAgreementAvailable')!.value);
      formData.append('agreementRenewalPeriod', this.preferencesFeatures.get('agreementRenewalPeriod')!.value);
      formData.append('isCCTVAvailable', this.preferencesFeatures.get('isCCTVAvailable')!.value);
      formData.append('isEBBillDebited', this.preferencesFeatures.get('isEBBillDebited')!.value);
      formData.append('isWaterTaxIncluded', this.preferencesFeatures.get('isWaterTaxIncluded')!.value);
      formData.append('furnishedStatus', this.preferencesFeatures.get('furnishedStatus')!.value);
      formData.append('hospitalsNearby', this.preferencesFeatures.get('hospitalsNearby')!.value);
      formData.append('collegesNearby', this.preferencesFeatures.get('collegesNearby')!.value);
      formData.append('parkingAreaAvailable', this.preferencesFeatures.get('parkingAreaAvailable')!.value);
      formData.append('petFriendly', this.preferencesFeatures.get('petFriendly')!.value);
      formData.append('balconyAvailable', this.preferencesFeatures.get('balconyAvailable')!.value);
      formData.append('totalFloors', this.preferencesFeatures.get('totalFloors')!.value);
      formData.append('floorNumber', this.preferencesFeatures.get('floorNumber')!.value);
      formData.append('place', this.locationDetails.get('address')!.value);
      formData.append('address', this.locationDetails.get('address')!.value);

      formData.append('pincode', this.locationDetails.get('pincode')!.value);
      formData.append('landmark', this.locationDetails.get('landmark')!.value);
      formData.append('stateId', this.locationDetails.get('state')!.value);
      formData.append('countryId', this.locationDetails.get('country')!.value);
      formData.append('cityId', this.locationDetails.get('city')!.value);

      // Append image files
      this.imageFiles.forEach((file, index) => {
        if (file) {
          formData.append(`image${index + 1}`, file);
        }
      });

      // Append user ID as sellerId
      const userId = localStorage.getItem('userId');
      if (userId) {
        formData.append('sellerId', userId);
      }

      // Append default property status
      formData.append('propertyStatus', '2');

      // Call the service to post property
      this.propertyService.postProperty(formData).subscribe(
        response => {
          this.loaderService.hide(); // Hide loader after submission
          this.toastr.success('Your rental house has been posted successfully!', 'Listing Now Live!');
          console.log('Form submitted successfully', response);
          this.router.navigate(['/']);
        },
        error => {
          this.loaderService.hide(); // Hide loader in case of error
          this.toastr.error('There was an error posting your property. Please try again.', 'Error');
          console.log('Error submitting form', error);
        }
      );
    } else {
      console.log('Form is incomplete or invalid.');
    }
  }

  handleImageUpload(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.imageFiles[index] = file;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.uploadedImages[index] = e.target.result;
        this.updateExteriorImages();
      };
      reader.readAsDataURL(file);
    }
  }

  updateExteriorImages() {
    this.locationDetails.patchValue({
      exteriorImages: this.uploadedImages.filter(image => image !== null)
    });
  }

  triggerImageUpload(index: number) {
    const fileInput = document.getElementById(`imageUpload${index}`) as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }
}
