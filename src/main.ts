import { bootstrapApplication } from '@angular/platform-browser';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Register GSAP plugins globally
gsap.registerPlugin(ScrollTrigger);

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
