import { Component } from '@angular/core';

@Component({
    selector: 'app',
    moduleId: module.id+'',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    name: string;

    constructor() {
        this.name = 'Angular 2';
    }
}
