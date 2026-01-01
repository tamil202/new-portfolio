import { SkillGroup } from '@shared/types/portfolio.types';

export const SKILLS_DATA: SkillGroup[] = [
  {
    category: 'Frontend',
    skills: [
      { name: 'HTML/CSS/JavaScript' },
      { name: 'Angular' },
      { name: 'TypeScript' },
      { name: 'RxJS' },
      { name: 'NgRx' },
      { name: 'Angular Signals' },
      { name: 'Signal Forms' },
      { name: 'Angular CDK' },
      { name: 'Tailwind CSS' },
      { name: 'Component Design' }
    ]
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js' },
      { name: 'Express' },
      { name: 'NestJS' },
      { name: 'REST APIs' },
      { name: 'MySQL' },
      { name: 'SQLite' },
      { name: 'Prisma' },
      { name: 'Sequelize' },
      { name: 'Docker' },
      { name: 'Redis' },
      { name: 'System Design' }
    ]
  },
  {
    category: 'Tools & Systems',
    skills: [
      { name: 'VS Code' },
      { name: 'Git/GitLab' },
      { name: 'Linux' },
      { name: 'Raspberry Pi' },
      { name: 'Gemini API' },
      { name: 'Claude CLI' }
    ]
  }
];
