export interface Task {
  task_name: string;
  deadline: Date;
  status: boolean;
  assigned_people: AssignedPerson[];
}

export interface AssignedPerson {
  full_name: string;
  age: number;
  skills: string[];
}
