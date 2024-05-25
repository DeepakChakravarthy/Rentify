import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoaderService } from '../loader/service/loader.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-property',
  templateUrl: './post-property.component.html',
  styleUrls: ['./post-property.component.css']
})
export class PostPropertyComponent {
  isLinear = true; // Enable linear mode
  propertyForm: FormGroup;
  minDate: Date = new Date();
  maxDate!: Date;
  uploadedImages: (string | null)[] = [null, null, null, null]; // Placeholder for uploaded images
  imageFiles: (File | null)[] = [null, null, null, null];

  constructor(private formBuilder: FormBuilder, private loaderService: LoaderService,@Inject(ToastrService) private toastr: ToastrService,private router: Router) {
    const currentYear = new Date().getFullYear();
    this.maxDate = new Date(currentYear + 1, 11, 31);
    this.propertyForm = this.formBuilder.group({
      basicInfo: this.formBuilder.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        place: ['', Validators.required]
      }),
      financialDetails: this.formBuilder.group({
        rentAmount: ['', Validators.required],
        tenantRentalPeriod: ['', Validators.required],
        advanceAmount: ['', Validators.required]
      }),
      preferencesFeatures: this.formBuilder.group({
        tenantPreference: ['', Validators.required],
        propertyStatus: ['', Validators.required],
        dateAvailable: ['', Validators.required],
        rentAgreementAvailable: ['', Validators.required],
        agreementRenewalPeriod: ['', Validators.required],
        cctvAvailable: ['', Validators.required],
        ebBillDebited: ['', Validators.required],
        waterTaxIncluded: ['', Validators.required],
        parkingAreaAvailable: ['', Validators.required],
        petFriendly: ['', Validators.required],
        balconyAvailable: ['', Validators.required]
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

  onSubmit() {
    if (this.propertyForm.valid) {
      this.loaderService.show(); // Show loader
      const formData = new FormData();

      // Append form data
      formData.append('title', this.propertyForm.get('basicInfo.title')!.value);
      formData.append('description', this.propertyForm.get('basicInfo.description')!.value);
      formData.append('place', this.propertyForm.get('basicInfo.place')!.value);
      formData.append('rentAmount', this.propertyForm.get('financialDetails.rentAmount')!.value);
      formData.append('tenantRentalPeriod', this.propertyForm.get('financialDetails.tenantRentalPeriod')!.value);
      formData.append('advanceAmount', this.propertyForm.get('financialDetails.advanceAmount')!.value);
      formData.append('tenantPreference', this.propertyForm.get('preferencesFeatures.tenantPreference')!.value);
      formData.append('propertyStatus', this.propertyForm.get('preferencesFeatures.propertyStatus')!.value);
      formData.append('dateAvailable', this.propertyForm.get('preferencesFeatures.dateAvailable')!.value);
      formData.append('rentAgreementAvailable', this.propertyForm.get('preferencesFeatures.rentAgreementAvailable')!.value);
      formData.append('agreementRenewalPeriod', this.propertyForm.get('preferencesFeatures.agreementRenewalPeriod')!.value);
      formData.append('cctvAvailable', this.propertyForm.get('preferencesFeatures.cctvAvailable')!.value);
      formData.append('ebBillDebited', this.propertyForm.get('preferencesFeatures.ebBillDebited')!.value);
      formData.append('waterTaxIncluded', this.propertyForm.get('preferencesFeatures.waterTaxIncluded')!.value);
      formData.append('parkingAreaAvailable', this.propertyForm.get('preferencesFeatures.parkingAreaAvailable')!.value);
      formData.append('petFriendly', this.propertyForm.get('preferencesFeatures.petFriendly')!.value);
      formData.append('balconyAvailable', this.propertyForm.get('preferencesFeatures.balconyAvailable')!.value);
      formData.append('address', this.propertyForm.get('locationDetails.address')!.value);
      formData.append('pincode', this.propertyForm.get('locationDetails.pincode')!.value);
      formData.append('landmark', this.propertyForm.get('locationDetails.landmark')!.value);
      formData.append('state', this.propertyForm.get('locationDetails.state')!.value);
      formData.append('country', this.propertyForm.get('locationDetails.country')!.value);
      formData.append('city', this.propertyForm.get('locationDetails.city')!.value);

      // Append image files
      this.imageFiles.forEach((file, index) => {
        if (file) {
          formData.append(`image${index + 1}`, file);
        }
      });

      // Simulate an HTTP request
      setTimeout(() => {
        this.loaderService.hide(); // Hide loader after submission
        this.toastr.success('Your rental house has been posted successfully!', 'Listing Now Live!');
        console.log('Form submitted successfully', formData);
        this.router.navigate(['/']);



      }, 2000);
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
