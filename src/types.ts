export type User = {
  id: string;
  name: string;
  avatar: string;
  currentStreak: number;
  longestStreak: number;
  joinDate: string;
  needsComeback: boolean; // True if the previous day was missed
  isFirstTime: boolean; // True if no progress yet
};

export type DayStatus = 'completed' | 'missed' | 'pending' | 'locked';

export type DayProgress = {
  id: number;
  status: DayStatus;
  taskTitle: string;
  taskDescription: string;
  submission?: {
    githubUrl: string;
    linkedinUrl: string;
    submittedAt: string;
  };
};

export type MockData = {
  user: User;
  progress: DayProgress[];
};
