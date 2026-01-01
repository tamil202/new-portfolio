import {
  Component,
  ElementRef,
  afterNextRender,
  viewChild,
  viewChildren,
  inject,
  DestroyRef
} from '@angular/core';
import { PortfolioStore } from '@core/data/portfolio.store';
import { scrollStaggerReveal } from '@shared/animations/gsap.utils';

@Component({
  selector: 'app-projects',
  standalone: true,
  template: `
    <section class="projects section" id="projects">
      <div class="container">
        <!-- Company Projects -->
        <div class="section-header">
          <h2 class="section-title">Company Projects</h2>
          <p class="section-subtitle">Professional work and contributions</p>
        </div>
        <div #companyGrid class="projects-grid">
          @for (project of companyProjects(); track project.id; let i = $index) {
            <article #projectCard class="project-card" [class.company]="true" [attr.data-index]="i">
              <div class="card-glow"></div>
              <div class="card-content">
                <div class="card-header">
                  <span class="project-type">Company</span>
                </div>
                <h3 class="project-title">{{ project.title }}</h3>
                <p class="project-description">{{ project.description }}</p>
                <div class="project-tech">
                  @for (tech of project.technologies; track tech) {
                    <span class="tech-tag">{{ tech }}</span>
                  }
                </div>
              </div>
            </article>
          }
        </div>

        <!-- Personal Projects -->
        <div class="section-header personal-header">
          <h2 class="section-title">Personal Projects</h2>
          <p class="section-subtitle">Side projects and experiments</p>
        </div>
        <div #personalGrid class="projects-grid">
          @for (project of personalProjects(); track project.id; let i = $index) {
            <article #projectCard class="project-card" [class.personal]="true" [attr.data-index]="i">
              <div class="card-glow personal-glow"></div>
              <div class="card-content">
                <div class="card-header">
                  <span class="project-type personal-type">Personal</span>
                </div>
                <h3 class="project-title">{{ project.title }}</h3>
                <p class="project-description">{{ project.description }}</p>
                <div class="project-tech">
                  @for (tech of project.technologies; track tech) {
                    <span class="tech-tag personal-tag">{{ tech }}</span>
                  }
                </div>
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .projects {
      background: var(--color-bg);
    }

    .section-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .personal-header {
      margin-top: 5rem;
    }

    .section-title {
      font-size: clamp(1.75rem, 4vw, 2.25rem);
      font-weight: 700;
      color: var(--color-text);
      margin-bottom: 0.75rem;
    }

    .section-title::after {
      content: '';
      display: block;
      width: 60px;
      height: 3px;
      background: var(--color-accent);
      margin: 1rem auto 0;
      border-radius: 2px;
    }

    .section-subtitle {
      color: var(--color-text-muted);
      font-size: 1.0625rem;
    }

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
      gap: 1.5rem;
    }

    .project-card {
      position: relative;
      background: var(--color-bg-alt);
      border: 1px solid var(--color-border);
      border-radius: 16px;
      overflow: hidden;
      transition: border-color 0.3s ease, transform 0.3s ease;
    }

    .project-card:hover {
      border-color: rgba(59, 130, 246, 0.4);
      transform: translateY(-4px);
    }

    .project-card.personal:hover {
      border-color: rgba(16, 185, 129, 0.4);
    }

    .card-glow {
      position: absolute;
      inset: 0;
      background: radial-gradient(
        600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
        rgba(59, 130, 246, 0.06),
        transparent 40%
      );
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
    }

    .card-glow.personal-glow {
      background: radial-gradient(
        600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
        rgba(16, 185, 129, 0.06),
        transparent 40%
      );
    }

    .project-card:hover .card-glow {
      opacity: 1;
    }

    .card-content {
      position: relative;
      padding: 1.75rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      height: 100%;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .project-type {
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--color-accent);
      letter-spacing: 0.1em;
      text-transform: uppercase;
      opacity: 0.8;
    }

    .project-type.personal-type {
      color: #10b981;
    }

    .project-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--color-text);
      line-height: 1.3;
    }

    .project-description {
      color: var(--color-text-muted);
      line-height: 1.7;
      font-size: 0.9375rem;
      flex-grow: 1;
    }

    .project-tech {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: auto;
      padding-top: 1rem;
      border-top: 1px solid var(--color-border);
    }

    .tech-tag {
      font-size: 0.75rem;
      padding: 0.25rem 0.625rem;
      background: rgba(59, 130, 246, 0.1);
      color: var(--color-accent);
      border-radius: 4px;
      font-weight: 500;
    }

    .tech-tag.personal-tag {
      background: rgba(16, 185, 129, 0.1);
      color: #10b981;
    }

    @media (max-width: 400px) {
      .projects-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ProjectsComponent {
  private readonly store = inject(PortfolioStore);
  private readonly destroyRef = inject(DestroyRef);

  readonly companyGrid = viewChild.required<ElementRef>('companyGrid');
  readonly personalGrid = viewChild.required<ElementRef>('personalGrid');
  readonly projectCards = viewChildren<ElementRef>('projectCard');

  readonly companyProjects = this.store.companyProjects;
  readonly personalProjects = this.store.personalProjects;

  private cleanupFns: (() => void)[] = [];

  constructor() {
    afterNextRender(() => {
      this.initAnimation();
      this.initHoverEffects();
    });
  }

  private initAnimation(): void {
    const companyTrigger = scrollStaggerReveal(
      this.companyGrid(),
      '.project-card',
      {
        y: 40,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
      }
    );

    const personalTrigger = scrollStaggerReveal(
      this.personalGrid(),
      '.project-card',
      {
        y: 40,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
      }
    );

    if (companyTrigger) {
      this.cleanupFns.push(() => companyTrigger.kill());
    }
    if (personalTrigger) {
      this.cleanupFns.push(() => personalTrigger.kill());
    }

    this.destroyRef.onDestroy(() => {
      this.cleanupFns.forEach(fn => fn());
    });
  }

  private initHoverEffects(): void {
    const cards = this.projectCards();

    cards.forEach(card => {
      const el = card.nativeElement;

      const onMouseMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        el.style.setProperty('--mouse-x', `${x}%`);
        el.style.setProperty('--mouse-y', `${y}%`);
      };

      el.addEventListener('mousemove', onMouseMove);

      this.cleanupFns.push(() => {
        el.removeEventListener('mousemove', onMouseMove);
      });
    });
  }
}
