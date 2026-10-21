import { Injectable, signal } from '@angular/core';
import { CURRENT_EMPLOYEE } from './mock-data';
import { Employee } from './models';

/** The signed-in employee. This build has no login screens, so it is the demo employee from mock data. */
@Injectable({ providedIn: 'root' })
export class UserService {
  readonly user = signal<Employee>(CURRENT_EMPLOYEE).asReadonly();
}
