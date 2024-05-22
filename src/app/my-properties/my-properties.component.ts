import { Component } from '@angular/core';

@Component({
  selector: 'app-my-properties',
  templateUrl: './my-properties.component.html',
  styleUrls: ['./my-properties.component.css']
})
export class MyPropertiesComponent {
  myProperties = [
    { id: 1, title: 'Cozy Apartment', description: 'A cozy apartment in the city center' },
    { id: 2, title: 'Spacious House', description: 'A spacious house in the suburbs' }
  ];

  constructor() { }

  ngOnInit(): void { }
}
