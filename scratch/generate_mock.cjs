const fs = require('fs');

const baseProgress = [
  {
    id: 1,
    status: 'completed',
    taskTitle: 'Setup GitHub & LinkedIn',
    taskDescription: 'Create your GitHub repository for the 60 days of code challenge. Make your first commit. Post on LinkedIn about your commitment.',
    submission: {
      githubUrl: 'https://github.com/arjun/60-days',
      linkedinUrl: 'https://linkedin.com/post/arjun/1',
      submittedAt: '2023-10-01T10:00:00Z'
    }
  },
  {
    id: 2,
    status: 'completed',
    taskTitle: 'Variables and Data Types',
    taskDescription: 'Learn about variables, data types, and basic operators. Write a program to calculate compound interest.',
    submission: {
      githubUrl: 'https://github.com/arjun/60-days/day2',
      linkedinUrl: 'https://linkedin.com/post/arjun/2',
      submittedAt: '2023-10-02T10:00:00Z'
    }
  },
  ...Array.from({ length: 9 }).map((_, i) => ({
    id: i + 3,
    status: 'completed',
    taskTitle: `Day ${i + 3} Challenge`,
    taskDescription: `Solve 3 problems focusing on intermediate concepts for day ${i + 3}.`,
    submission: {
      githubUrl: `https://github.com/arjun/60-days/day${i+3}`,
      linkedinUrl: `https://linkedin.com/post/arjun/${i+3}`,
      submittedAt: `2023-10-0${(i+3).toString().padStart(2, '0')}T10:00:00Z`
    }
  })),
  {
    id: 12,
    status: 'pending',
    taskTitle: 'Introduction to React',
    taskDescription: 'Understand components, state, and props. Build a simple counter application.',
    submission: null
  },
  ...Array.from({ length: 48 }).map((_, i) => ({
    id: i + 13,
    status: 'locked',
    taskTitle: `Advanced Topic ${i + 1}`,
    taskDescription: 'Locked content for future days.',
    submission: null
  }))
];

const mockData = {
  students: {
    active: {
      user: {
        id: 'u123',
        name: 'Arjun Kumar',
        avatar: 'https://i.pravatar.cc/150?u=arjun',
        currentStreak: 11,
        longestStreak: 11,
        joinDate: '2023-10-01',
        needsComeback: false,
        isFirstTime: false,
        freezes: 2
      },
      progress: baseProgress
    },
    new: {
      user: {
        id: 'u124',
        name: 'Priya Sharma',
        avatar: 'https://i.pravatar.cc/150?u=priya',
        currentStreak: 0,
        longestStreak: 0,
        joinDate: '2023-10-15',
        needsComeback: false,
        isFirstTime: true,
        freezes: 2
      },
      progress: baseProgress.map(p => ({
        ...p,
        status: p.id === 1 ? 'pending' : 'locked',
        submission: null
      }))
    },
    missed: {
      user: {
        id: 'u125',
        name: 'Rahul Singh',
        avatar: 'https://i.pravatar.cc/150?u=rahul',
        currentStreak: 9,
        longestStreak: 9,
        joinDate: '2023-10-01',
        needsComeback: true,
        isFirstTime: false,
        freezes: 2
      },
      progress: baseProgress.map(p => {
        if (p.id <= 9) return { ...p, status: 'completed' };
        if (p.id === 10) return { ...p, status: 'missed', submission: null };
        if (p.id === 11) return { ...p, status: 'pending', submission: null };
        return { ...p, status: 'locked', submission: null };
      })
    },
    empty: {
      user: {
        id: 'u126',
        name: 'New Student',
        currentStreak: 0,
        longestStreak: 0,
        joinDate: '2023-10-16',
        needsComeback: false,
        isFirstTime: true,
        freezes: 2
      },
      progress: []
    }
  }
};

fs.writeFileSync('src/mock-data.json', JSON.stringify(mockData, null, 2));
console.log('Mock data written to src/mock-data.json');
