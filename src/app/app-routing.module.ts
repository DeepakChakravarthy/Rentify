import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PropertyDetailComponent } from './property-detail/property-detail.component';
import { PostPropertyComponent } from './post-property/post-property.component';
import { MyPropertiesComponent } from './my-properties/my-properties.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './authguard/authGuard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'property/:id', component: PropertyDetailComponent },
  { path: 'post-property', component: PostPropertyComponent, canActivate: [AuthGuard] },
  { path: 'my-properties', component: MyPropertiesComponent },
  { path: 'auth', component: AuthComponent,canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
