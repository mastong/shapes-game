import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
var providers = [{ provide: 'canvasWidth', useValue: 500 }, { provide: 'canvasHeight', useValue: 500 }];
const platform = platformBrowserDynamic(providers);
platform.bootstrapModule(AppModule);
