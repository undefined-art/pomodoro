export type TaskType = {
  completed: boolean;
  createdAt: Date;
  createdBy: number;
  draft: boolean;
  expiredAt: Date;
  id: number;
  pomodoro: number;
  project: {
    id: number;
    title: string;
    createdBy: number;
    createdAt: Date;
    updatedAt: Date;
  };
  projectId: number;
  sessions: number;
  title: string;
  updatedAt: Date;
};
