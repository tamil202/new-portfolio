import { Project } from '@shared/types/portfolio.types';

export const PROJECTS_DATA: Project[] = [
  // Company Projects
  {
    id: 'exmine',
    title: 'EXMINE Application',
    description: 'Product application within the ULRS ecosystem for business workflow and data-driven operations. Built with modern Angular using Signals for state management and signal-based forms. Worked on both frontend and backend modules, implementing features and fixing bugs.',
    technologies: ['Angular', 'Signals', 'NestJS', 'TypeScript', 'MySQL', 'Prisma'],
    featured: true,
    type: 'company'
  },
  {
    id: 'ultra-table',
    title: 'Ultra-Table Angular Library',
    description: 'High-performance, reusable data table component with virtual scrolling, sorting, filtering, and pagination. Optimized for large datasets. Released internally via GitLab package registry.',
    technologies: ['Angular', 'TypeScript', 'RxJS', 'CDK Virtual Scroll'],
    featured: true,
    type: 'company'
  },
  {
    id: 'ulrs',
    title: 'ULRS - Universal Loan Review System',
    description: 'Enterprise loan review platform handling complex workflows, document processing, and review management. Built with Angular frontend, NestJS backend, and MySQL database, deployed on AWS.',
    technologies: ['Angular', 'NestJS', 'MySQL', 'AWS', 'TypeScript'],
    featured: true,
    type: 'company'
  },
  {
    id: 'attendance-system',
    title: 'Attendance & Server Management',
    description: 'Internal systems for employee attendance tracking and server infrastructure management. Developed features, fixed bugs, and collaborated on testing and deployment.',
    technologies: ['Angular', 'Node.js', 'MySQL', 'REST APIs'],
    featured: true,
    type: 'company'
  },
  // Personal Projects
  {
    id: 'mail-expense',
    title: 'Mail Expense Dashboard',
    description: 'Automated expense tracking system that reads transaction emails via IMAP, parses amounts, categorizes expenses, and generates analytics dashboards. Runs on a self-hosted Raspberry Pi server.',
    technologies: ['Node.js', 'IMAP', 'Raspberry Pi', 'SQLite', 'Analytics'],
    featured: true,
    type: 'personal'
  },
  {
    id: 'tamil-translator',
    title: 'Firefox Tamil Translation Extension',
    description: 'Browser extension for Firefox that translates English text to Tamil. Built to help with quick translations while browsing.',
    technologies: ['JavaScript', 'Firefox WebExtensions', 'Translation API'],
    featured: true,
    type: 'personal'
  },
  {
    id: 'vscode-gemini',
    title: 'VS Code Command Generator',
    description: 'VS Code extension that uses the Gemini API to generate command-line instructions from natural language. Helps speed up terminal workflows.',
    technologies: ['TypeScript', 'VS Code API', 'Gemini API'],
    featured: true,
    type: 'personal'
  },
  {
    id: 'tsc-app',
    title: 'npx tsc-app',
    description: 'CLI tool for scaffolding TypeScript projects with sensible defaults. Generates project structure, tsconfig, and basic setup. Installable via npx.',
    technologies: ['Node.js', 'TypeScript', 'CLI', 'npm'],
    featured: true,
    type: 'personal'
  }
];
