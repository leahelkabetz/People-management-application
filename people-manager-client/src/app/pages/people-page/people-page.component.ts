import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Person } from '../../models/person';
import { PeopleService } from '../../services/people.service';
import { PeopleTableComponent } from '../../components/people-table/people-table.component';
import { PersonFormComponent } from '../../components/person-form/person-form.component'; 

@Component({
  selector: 'app-people-page',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule, MatButtonModule, MatIconModule, MatCardModule,
    MatSnackBarModule, MatProgressSpinnerModule,
    PeopleTableComponent,
    PersonFormComponent
  ],
  templateUrl: './people-page.component.html',
  styleUrls: ['./people-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeoplePageComponent implements OnInit {
  people: Person[] = [];
  loading = false;

  constructor(private api: PeopleService, private snack: MatSnackBar) {}

  ngOnInit(): void { this.refresh(); }

  refresh(): void {
    this.loading = true;
    this.api.getAll().subscribe({
      next: data => {
        this.people = [...(data ?? [])];
        this.loading = false;
      },
      error: () => {
        this.snack.open('שגיאה בטעינה', 'סגור', { duration: 2500 });
        this.loading = false;
      }
    });
  }
  onAdded(person: Omit<Person, 'id'>)  {
    this.api.add(person).subscribe({
      next: () => {
        this.snack.open('נוסף בהצלחה', 'סגור', { duration: 1500 });
        this.refresh();
      },
      error: () => this.snack.open('שגיאה בהוספה', 'סגור', { duration: 2500 })
    });
  }
  onDeleted = (id: number) => {
    const prev = this.people;
    this.people = prev.filter(p => p.id !== id);

    this.api.delete(id).subscribe({
      next: () => {
        this.snack.open('נמחק בהצלחה', 'סגור', { duration: 1500 });
      },
      error: () => {
        this.people = prev;
        this.snack.open('שגיאה במחיקה', 'סגור', { duration: 2500 });
      }
    });
  };

onSaved = ({ id, changes }: { id: number; changes: Partial<Person> }) => {
  const prev = this.people;
  const current = prev.find(p => p.id === id)!;

  const payload: Person = {
    id, 
    firstName:      changes.firstName      ?? current.firstName,
    lastName:       changes.lastName       ?? current.lastName,
    identityNumber: changes.identityNumber ?? current.identityNumber,
    email:          changes.email          ?? current.email,
    phoneNumber:    changes.phoneNumber    ?? current.phoneNumber,
  };

  this.people = prev.map(p => p.id === id ? payload : p);

  this.api.update(id, payload).subscribe({
    next: () => this.snack.open('עודכן בהצלחה', 'סגור', { duration: 1500 }),
    error: () => { this.people = prev; this.snack.open('שגיאה בעדכון', 'סגור', { duration: 2500 }); }
  });
};



}
