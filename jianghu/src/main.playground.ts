import { CustomPlaygroundModule } from './custom-playground.module';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { initializePlayground } from 'angular-playground';

initializePlayground('app-root');
platformBrowserDynamic().bootstrapModule(CustomPlaygroundModule);
