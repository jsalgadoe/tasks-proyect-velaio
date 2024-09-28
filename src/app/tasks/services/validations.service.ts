import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  // Validar si el nombre de una persona es único en el formulario
  validateUniquePerson(
    control: AbstractControl,
    formArray: FormArray
  ): { [key: string]: boolean } | null {
    const name = control.value;
    const existingNames = formArray.controls.map(
      (person) => person.get('full_name')?.value
    );
    const isDuplicate = existingNames.filter((n) => n === name).length > 1;
    return isDuplicate ? { duplicatePerson: true } : null;
  }

  // Validar que haya al menos una persona con al menos una habilidad
  validatePersons(formArray: FormArray): { [key: string]: boolean } | null {
    if (formArray.length === 0) {
      return { noPersons: true };
    }

    for (const person of formArray.controls) {
      const skills = person.get('skills') as FormArray;
      if (skills.length === 0) {
        return { noSkills: true };
      }
    }

    return null;
  }

  // Obtener los errores de un campo para mostrar mensajes específicos
  getFieldError(control: AbstractControl): string | null {
    if (!control || !control.errors) return null;

    const errors = control.errors;

    if (errors['required']) return 'Este campo es requerido';
    if (errors['min']) return 'La edad debe ser mayor o igual a 18 años';
    if (errors['duplicatePerson']) return 'El nombre de la persona ya existe';
    if (errors['noPersons']) return 'Debe haber al menos una persona';
    if (errors['noSkills'])
      return 'Debe haber al menos una habilidad por persona';

    return null;
  }
}
