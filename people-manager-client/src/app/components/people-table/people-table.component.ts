import { Component, EventEmitter, Input, Output, ViewChild, OnChanges, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Person } from '../../models/person';
import { SecureIdPipe } from '../../pipes/secure-id.pipe';

@Component({
  selector: 'app-people-table',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    MatTableModule, MatPaginatorModule, MatSortModule,
    MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule,
    MatCardModule, MatTooltipModule, MatProgressSpinnerModule, SecureIdPipe
  ],
  templateUrl: './people-table.component.html',
  styleUrls: ['./people-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeopleTableComponent implements OnChanges, AfterViewInit {
  @Input() people: Person[] = [];
  @Input() loading = false;
  @Output() deleted = new EventEmitter<number>();
  @Output() saved = new EventEmitter<{ id: number; changes: Partial<Person> }>(); // ← חדש!

  displayedColumns = ['firstName', 'lastName', 'identityNumber', 'email', 'phone', 'actions'];
  data = new MatTableDataSource<Person>([]);
  filterValue = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  editingId: number | null = null;
  editData: Partial<Person> = {};

  ngAfterViewInit() {
    this.data.paginator = this.paginator;
    this.data.sort = this.sort;
  }

  ngOnChanges(): void {
    this.data.data = [...(this.people ?? [])];
    if (this.paginator) this.data.paginator = this.paginator;
    if (this.sort) this.data.sort = this.sort;
    this.applyFilter();
  }

  fullName(p: Person) { return `${p.firstName ?? ''} ${p.lastName ?? ''}`.trim(); }

  applyFilter() {
    this.data.filterPredicate = (row, filter) => {
      const v = (s: unknown) => (s ?? '').toString().toLowerCase();
      return v(row.firstName).includes(filter)
        || v(row.lastName).includes(filter)
        || v(row.email).includes(filter)
        || v(row.phoneNumber).includes(filter)
        || v(row.identityNumber).includes(filter);
    };
    this.data.filter = (this.filterValue ?? '').trim().toLowerCase();
    if (this.data.paginator) this.data.paginator.firstPage();
  }

  confirmDelete(p: Person) { this.deleted.emit(p.id); }

  startEdit(p: Person) {
    this.editingId = p.id;
    this.editData = { ...p };
  }

  cancelEdit() {
    this.editingId = null;
    this.editData = {};
  }
  requestSave() {
    if (this.editingId != null) {
      this.saved.emit({ id: this.editingId, changes: this.editData });
      this.cancelEdit();
    }
  }
  onKeydownEnter() { this.requestSave(); }
  onBlurAutoSave() { this.requestSave(); }

  trackById(_: number, p: Person) { return p.id; }
}
