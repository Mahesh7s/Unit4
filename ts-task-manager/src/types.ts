// Task priority enum
export enum Priority {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High"
}

// Interface for a task object
export interface Task {
  id: number;
  description: string;
  priority: Priority;
  completed: boolean;
}
