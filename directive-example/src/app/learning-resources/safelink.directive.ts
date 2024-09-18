import { Directive, input } from "@angular/core";

@Directive({
    selector: 'a[appSafeLink]',
    standalone: true,
    host: {
        '(click)': 'onClick($event)'
    }
})
export class SafeLinkDirective {

    queryParam = input('myApp', { alias: 'appSafeLink' });

    constructor() {
        console.log('SafeLinkDirective instantiated');
    }

    onClick(event: MouseEvent) {
        const wantToNavigate = window.confirm('Are you sure you want to navigate to ' + (event.target as HTMLAnchorElement).href + '?');

        if (wantToNavigate) {
            (event.target as HTMLAnchorElement).href = (event.target as HTMLAnchorElement).href + '?from=' + this.queryParam();
            return;
        }

        event.preventDefault();
    }

}