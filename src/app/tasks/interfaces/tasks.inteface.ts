export interface Task {
  id?: string | number;
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
