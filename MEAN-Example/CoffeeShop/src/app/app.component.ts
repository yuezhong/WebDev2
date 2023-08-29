import { Component } from '@angular/core';

/**
 * The default component. Can be renamed and redirect.
 * However, for this example, just using this as part of the base
 * framework. Using the top part of the page to act as our Web App
 * Navigation.
 * @export
 * @class AppComponent
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'App2';
}
