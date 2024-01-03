import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { shareReplay } from 'rxjs';

import { Plan } from '../utils/models/plan.model';
import { AddOn } from '../utils/models/add-on.model';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {

  // Deps
  private http = inject(HttpClient);

  getPlans() {
    return this.http.get<Omit<Plan, "selected">[]>("assets/data/plans.json")
      .pipe(shareReplay(1));
  }

  getAddOns() {
    return this.http.get<Omit<AddOn, "included">[]>("assets/data/add-ons.json")
      .pipe(shareReplay(1));
  }

}
