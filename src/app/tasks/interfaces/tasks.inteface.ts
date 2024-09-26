export interface Tasks {
  task_name: string;
  deadline: Date;
  assigned_people: AssignedPerson[];
}

export interface AssignedPerson {
  full_name: string;
  age: number;
  skills: string[];
}
