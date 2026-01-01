import { signal, Signal } from '@angular/core';

/**
 * Creates a reactive signal that tracks user's motion preference
 * Respects prefers-reduced-motion media query for accessibility
 */
export function createReducedMotionSignal(): Signal<boolean> {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const prefersReducedMotion = signal(mediaQuery.matches);

  mediaQuery.addEventListener('change', (event) => {
    prefersReducedMotion.set(event.matches);
  });

  return prefersReducedMotion.asReadonly();
}

/**
 * Singleton instance for reduced motion preference
 */
let _reducedMotionSignal: Signal<boolean> | null = null;

export function prefersReducedMotion(): Signal<boolean> {
  if (!_reducedMotionSignal) {
    _reducedMotionSignal = createReducedMotionSignal();
  }
  return _reducedMotionSignal;
}
