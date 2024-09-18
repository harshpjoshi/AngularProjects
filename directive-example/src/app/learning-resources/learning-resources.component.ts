import { Component } from '@angular/core';
import { SafeLinkDirective } from './safelink.directive';

@Component({
  selector: 'app-learning-resources',
  templateUrl: './learning-resources.component.html',
  styleUrl: './learning-resources.component.css',
  standalone: true,
  imports: [
    SafeLinkDirective
  ]
})
export class LearningResourcesComponent { }
