export interface UserTasks {
  date?: string;
  active?: string[];
  done?: string[];
}

export interface UserSchema {
  tasks?: UserTasks[];
  selectedDay?: string;
}
