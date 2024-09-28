import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationService } from '../services/validations.service';
import { TaskService } from '../services/task.service';

@Component({
  standalone: true,
  selector: 'app-create-task',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css'],
})
export default class CreateTaskComponent {
  private fb = inject(FormBuilder);
  private validationService = inject(ValidationService); // Inyectamos el servicio
  private __taskService = inject(TaskService);

  public myForm: FormGroup = this.fb.group({
    task_name: ['', Validators.required],
    deadline: ['', Validators.required],
    assigned_people: this.fb.array(
      [],
      [
        Validators.required,
        this.validationService.validatePersons.bind(this.validationService),
      ]
    ),
  });

  get persons(): FormArray {
    return this.myForm.get('assigned_people') as FormArray;
  }

  getSkills(index: number): FormArray {
    return this.persons.at(index).get('skills') as FormArray;
  }

  addPerson(): void {
    const person = this.fb.group({
      full_name: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          (control: any) =>
            this.validationService.validateUniquePerson(control, this.persons),
        ],
      ],
      age: ['', [Validators.required, Validators.min(18)]],
      skills: this.fb.array([], [Validators.required]),
    });
    this.persons.push(person);
  }

  removePerson(index: number): void {
    this.persons.removeAt(index);
  }

  addSkill(personIndex: number): void {
    const skills = this.getSkills(personIndex);
    skills.push(this.fb.control('', Validators.required));
  }

  removeSkill(personIndex: number, skillIndex: number): void {
    const skills = this.getSkills(personIndex);
    skills.removeAt(skillIndex);
  }

  isValidField(field: string) {
    const control = this.myForm.get(field);
    return control?.errors && control?.touched;
  }

  getFieldError(field: string): string | null {
    const control = this.myForm.get(field)!;
    return this.validationService.getFieldError(control); // Llamada al servicio para obtener errores
  }

  onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    this.__taskService.addTask(this.myForm.value);
    this.persons.clear();
    this.myForm.reset();
  }
}
