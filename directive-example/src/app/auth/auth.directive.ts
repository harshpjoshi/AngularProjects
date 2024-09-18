import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from './auth.service';
import { Permission } from './auth.model';

@Directive({
  selector: '[appAuth]',
  standalone: true
})
export class AuthDirective {

  userType = input.required<Permission>({ alias: 'appAuth' });
  service = inject(AuthService);
  template = inject(TemplateRef);
  viewContainer = inject(ViewContainerRef);

  constructor() {
    effect(() => {

      if (this.service.activePermission() === this.userType()) {
        this.viewContainer.createEmbeddedView(this.template);
      } else {
        this.viewContainer.clear();
      }

    });
  }

}
