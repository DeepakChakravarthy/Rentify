import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy  {
  emailOrPhone: string = '';
  firstName: string = '';
  lastName: string = '';
  currentStep: number = 1;

  constructor() { }
  ngOnInit() {
    document.body.style.backgroundColor = '#f4f4f4'; // Set the background color when component loads
  }

  ngOnDestroy() {
    document.body.style.backgroundColor = ''; // Reset the background color when component is destroyed
  }

  goToNext(): void {
    // Add login logic here
  }

  createAccount(): void {
    // Add account creation logic here
  }
}
