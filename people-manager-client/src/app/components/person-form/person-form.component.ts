import { Component, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, FormGroupDirective } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Person } from '../../models/person';

@Component({
  selector: 'app-person-form',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatTooltipModule
  ],
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss']
})
export class PersonFormComponent implements OnInit {
  @Output() added = new EventEmitter<Omit<Person, 'id'>>();

  form!: FormGroup;
  @ViewChild(FormGroupDirective) formDir!: FormGroupDirective;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [
        Validators.required,
        Validators.pattern(/^\+?\d{6,15}$/)
      ]],
      identityNumber: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
    });
  }

  submit() {
    if (this.form.invalid) return;
    const payload = this.form.getRawValue() as Omit<Person, 'id'>;
    this.added.emit(payload);
    this.formDir.resetForm();
  }
}
