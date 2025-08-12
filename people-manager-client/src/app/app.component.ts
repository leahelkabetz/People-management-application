import { Component } from '@angular/core';
import { PeoplePageComponent } from './pages/people-page/people-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PeoplePageComponent],
  template: `<app-people-page></app-people-page>`
})
export class AppComponent {}
