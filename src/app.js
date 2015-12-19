import 'zone.js/lib/browser/zone-microtask';
import 'reflect-metadata';
import 'babel-polyfill';

import {
  Component, View, Attribute,
  provide
} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {
  Router, RouteConfig, RouteParams,
  LocationStrategy, HashLocationStrategy,
  ROUTER_PROVIDERS, ROUTER_DIRECTIVES, ROUTER_PRIMARY_COMPONENT
} from 'angular2/router';

import { Greeter } from './services';

@Component({
  selector: 'hello',
  template: '<p>{{ message }}</p>'
})
class Hello {
  constructor(greeter: Greeter) {
    this.message = greeter.say('hello', 'Angular 2');
  }
}

@Component({
  selector: 'ciao',
  template: '<p>{{ message }}</p>'
})
class Ciao {
  constructor(greeter: Greeter, routeParams: RouteParams) {
    this.message = greeter.say('ciao', routeParams.get('name'));
  }
}

@Component({
  selector: 'linker',
  inputs: ['name', 'url'],
  template: '<p><a [href]="url" [title]="name">{{ name }}</a></p>'
})
class Linker {
  constructor(@Attribute('name') name, @Attribute('url') url) {
    this.name = name;
    this.url = url;
  }
}

@Component({
  selector: 'hello-app',
  viewProviders: [Greeter]
})
@View({
  directives: [ROUTER_DIRECTIVES, Linker],
  template: `
    <ul>
      <li><a [routerLink]="['/Hello']">Hello</a></li>
      <li><a [routerLink]="['/Ciao', { name: 'ng2' }]">Ciao</a></li>
    </ul>
    <router-outlet></router-outlet>
    <linker name="GitHub" url="https://github.com/shuhei/babel-angular2-app"></linker>
  `
})
@RouteConfig([
  { path: '/', component: Hello, as: 'Hello' },
  { path: '/ciao/:name', component: Ciao, as: 'Ciao' }
])
class HelloApp {
}

bootstrap(HelloApp, [
  ROUTER_PROVIDERS,
  provide(LocationStrategy, { useClass: HashLocationStrategy })
]);
