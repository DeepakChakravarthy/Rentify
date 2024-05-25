import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PropertyDetailComponent } from './property-detail/property-detail.component';
import { PostPropertyComponent } from './post-property/post-property.component';
import { MyPropertiesComponent } from './my-properties/my-properties.component';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { LoaderComponent } from './loader/loader.component';
import { ToastrModule } from 'ngx-toastr';
import {MatCardModule} from '@angular/material/card';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { InterestModalComponent } from './interest-modal/interest-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FullScreenImageModalComponent } from './full-screen-image-modal/full-screen-image-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PropertyDetailComponent,
    PostPropertyComponent,
    MyPropertiesComponent,
    AuthComponent,
    HeaderComponent,
    LoaderComponent,
    InterestModalComponent,
    FullScreenImageModalComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule, // Add FormsModule here
    ReactiveFormsModule,
    MatStepperModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatButtonModule,
    ToastrModule.forRoot(), // ToastrModule added
    MatCardModule,
    NgxGalleryModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
