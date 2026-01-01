import { Component, signal, afterNextRender, inject, DestroyRef, viewChild, ElementRef } from '@angular/core';
import { HeroComponent } from '@features/hero/hero.component';
import { AboutComponent } from '@features/about/about.component';
import { SkillsComponent } from '@features/skills/skills.component';
import { ProjectsComponent } from '@features/projects/projects.component';
import { ExperienceComponent } from '@features/experience/experience.component';
import { ContactComponent } from '@features/contact/contact.component';
import { StartButtonComponent } from '@features/start-button/start-button.component';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register GSAP plugin
gsap.registerPlugin(ScrollToPlugin);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    ExperienceComponent,
    ContactComponent,
    StartButtonComponent
  ],
  template: `
    <!-- Start Button + Door Animation Overlay -->
    <app-start-button (started)="onStarted()" />

    <!-- Main Content (always rendered, animated by GSAP) -->
    <header class="header" [class.visible]="hasStarted()">
      <!-- Snake Game Background -->
      <canvas #snakeCanvas class="snake-canvas"></canvas>
      <nav class="nav container">
        <a href="#home" class="nav-logo" (click)="scrollTo($event, 'home')">Tamilvanan</a>
        <ul class="nav-links">
          <li><a href="#about" (click)="scrollTo($event, 'about')">About</a></li>
          <li><a href="#skills" (click)="scrollTo($event, 'skills')">Skills</a></li>
          <li><a href="#projects" (click)="scrollTo($event, 'projects')">Projects</a></li>
          <li><a href="#experience" (click)="scrollTo($event, 'experience')">Experience</a></li>
          <li><a href="#contact" (click)="scrollTo($event, 'contact')">Contact</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <app-hero />
      <app-about />
      <app-skills />
      <app-projects />
      <app-experience />
      <app-contact />
    </main>

    <footer class="footer">
      <div class="container">
        <p>&copy; {{ currentYear }} Tamilvanan. Built with Angular.</p>
      </div>
    </footer>
  `,
  styles: [`
    .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;
      background: rgba(10, 10, 15, 0.6);
      backdrop-filter: blur(4px);
      border-bottom: 1px solid rgba(59, 130, 246, 0.3);
      opacity: 0;
      transform: translateY(-20px);
      transition: opacity 0.5s ease, transform 0.5s ease;
      overflow: hidden;
    }

    .header.visible {
      opacity: 1;
      transform: translateY(0);
    }

    .snake-canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.4;
      z-index: 0;
    }

    .nav {
      position: relative;
      z-index: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
    }

    .nav-logo {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--color-text);
      text-decoration: none;
      cursor: pointer;
    }

    .nav-links {
      display: flex;
      gap: 2rem;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .nav-links a {
      color: var(--color-text-muted);
      text-decoration: none;
      font-weight: 500;
      font-size: 0.9375rem;
      transition: color 0.2s ease;
      cursor: pointer;
    }

    .nav-links a:hover {
      color: var(--color-accent);
    }

    .nav-links a.active {
      color: var(--color-accent);
    }

    main {
      padding-top: 60px;
    }

    .footer {
      padding: 2rem;
      text-align: center;
      border-top: 1px solid var(--color-border);
      color: var(--color-text-muted);
      font-size: 0.875rem;
    }

    @media (max-width: 768px) {
      .nav-links {
        display: none;
      }
    }
  `]
})
export class AppComponent {
  private readonly destroyRef = inject(DestroyRef);

  readonly snakeCanvas = viewChild<ElementRef>('snakeCanvas');
  readonly currentYear = new Date().getFullYear();
  readonly hasStarted = signal(false);
  readonly activeSection = signal('home');

  // Snake game properties
  private snakeGameInterval: any = null;
  private snake: { x: number; y: number }[] = [];
  private food: { x: number; y: number } = { x: 0, y: 0 };
  private direction: { x: number; y: number } = { x: 1, y: 0 };
  private readonly gridSize = 8;

  constructor() {
    afterNextRender(() => {
      // Disable default smooth scroll to let GSAP handle it
      document.documentElement.style.scrollBehavior = 'auto';
    });
  }

  onStarted(): void {
    this.hasStarted.set(true);
    // Start snake game after a short delay
    setTimeout(() => this.startSnakeGame(), 500);
  }

  private startSnakeGame(): void {
    const canvas = this.snakeCanvas()?.nativeElement as HTMLCanvasElement;
    if (!canvas) return;

    // Set canvas size to match header
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Initialize snake in the middle
    const startY = Math.floor(canvas.height / this.gridSize / 2);
    this.snake = [
      { x: 10, y: startY },
      { x: 9, y: startY },
      { x: 8, y: startY },
      { x: 7, y: startY },
      { x: 6, y: startY }
    ];
    this.direction = { x: 1, y: 0 };
    this.spawnFood(canvas);

    // Start game loop
    this.snakeGameInterval = setInterval(() => this.updateSnakeGame(), 80);

    // Handle window resize
    const resizeHandler = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', resizeHandler);

    this.destroyRef.onDestroy(() => {
      if (this.snakeGameInterval) {
        clearInterval(this.snakeGameInterval);
      }
      window.removeEventListener('resize', resizeHandler);
    });
  }

  private spawnFood(canvas: HTMLCanvasElement): void {
    const maxX = Math.floor(canvas.width / this.gridSize);
    const maxY = Math.floor(canvas.height / this.gridSize);
    this.food = {
      x: Math.floor(Math.random() * maxX),
      y: Math.floor(Math.random() * maxY)
    };
  }

  private updateSnakeGame(): void {
    const canvas = this.snakeCanvas()?.nativeElement as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const maxX = Math.floor(canvas.width / this.gridSize);
    const maxY = Math.floor(canvas.height / this.gridSize);

    // Move snake
    const head = {
      x: this.snake[0].x + this.direction.x,
      y: this.snake[0].y + this.direction.y
    };

    // Wrap around edges
    if (head.x >= maxX) head.x = 0;
    if (head.x < 0) head.x = maxX - 1;
    if (head.y >= maxY) head.y = 0;
    if (head.y < 0) head.y = maxY - 1;

    this.snake.unshift(head);

    // Check food collision
    if (head.x === this.food.x && head.y === this.food.y) {
      this.spawnFood(canvas);
      // Random direction change
      if (Math.random() > 0.5) {
        const dirs = [
          { x: 1, y: 0 }, { x: -1, y: 0 },
          { x: 0, y: 1 }, { x: 0, y: -1 }
        ].filter(d => !(d.x === -this.direction.x && d.y === -this.direction.y));
        this.direction = dirs[Math.floor(Math.random() * dirs.length)];
      }
    } else {
      this.snake.pop();
    }

    // Keep snake length reasonable
    if (this.snake.length > 20) {
      this.snake.pop();
    }

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw snake with glow
    this.snake.forEach((segment, i) => {
      const alpha = 0.8 - (i / this.snake.length) * 0.5;
      ctx.fillStyle = `rgba(59, 130, 246, ${alpha})`;
      ctx.shadowColor = 'rgba(59, 130, 246, 0.6)';
      ctx.shadowBlur = i === 0 ? 8 : 4;
      ctx.fillRect(
        segment.x * this.gridSize + 1,
        segment.y * this.gridSize + 1,
        this.gridSize - 2,
        this.gridSize - 2
      );
    });

    // Draw food
    ctx.shadowColor = 'rgba(16, 185, 129, 0.8)';
    ctx.shadowBlur = 8;
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(
      this.food.x * this.gridSize + this.gridSize / 2,
      this.food.y * this.gridSize + this.gridSize / 2,
      this.gridSize / 2 - 1,
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  scrollTo(event: Event, sectionId: string): void {
    event.preventDefault();

    const element = document.getElementById(sectionId);
    if (!element) return;

    // Update active section
    this.activeSection.set(sectionId);

    // GSAP smooth scroll animation
    gsap.to(window, {
      duration: 1.2,
      scrollTo: {
        y: element,
        offsetY: 80 // Header offset
      },
      ease: 'power3.inOut'
    });
  }
}
