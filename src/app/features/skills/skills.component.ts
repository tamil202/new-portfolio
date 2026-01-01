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
  selector: 'app-skills',
  standalone: true,
  template: `
    <section class="skills section" id="skills">
      <div class="container">
        <h2 class="section-title">Skills & Technologies</h2>
        <div #skillsGrid class="skills-grid">
          @for (group of skills(); track group.category) {
            <div class="skill-group">
              <h3 class="skill-category">{{ group.category }}</h3>
              <div class="skill-list">
                @for (skill of group.skills; track skill.name) {
                  <span #skillBadge class="skill-badge">{{ skill.name }}</span>
                }
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2.5rem;
    }

    .skill-group {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .skill-category {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--color-text);
      padding-bottom: 0.5rem;
      border-bottom: 2px solid var(--color-accent);
      display: inline-block;
      width: fit-content;
    }

    .skill-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.625rem;
    }

    .skill-badge {
      padding: 0.5rem 1rem;
      background: var(--color-bg-alt);
      border: 1px solid var(--color-border);
      border-radius: 6px;
      font-size: 0.9375rem;
      color: var(--color-text);
      transition: border-color 0.2s ease, background 0.2s ease;
    }

    .skill-badge:hover {
      border-color: var(--color-accent);
      background: rgba(59, 130, 246, 0.05);
    }
  `]
})
export class SkillsComponent {
  private readonly store = inject(PortfolioStore);
  private readonly destroyRef = inject(DestroyRef);

  readonly skillsGrid = viewChild.required<ElementRef>('skillsGrid');
  readonly skillBadges = viewChildren<ElementRef>('skillBadge');

  readonly skills = this.store.skills;

  constructor() {
    afterNextRender(() => {
      this.initAnimation();
    });
  }

  private initAnimation(): void {
    const trigger = scrollStaggerReveal(
      this.skillsGrid(),
      '.skill-badge',
      {
        y: 20,
        duration: 0.4,
        stagger: 0.05,
        ease: 'power3.out'
      }
    );

    this.destroyRef.onDestroy(() => {
      trigger?.kill();
    });
  }
}
