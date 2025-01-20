import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';
import '@angular/localize/init';

setupZoneTestEnv();

HTMLCanvasElement.prototype.getContext = jest.fn();
