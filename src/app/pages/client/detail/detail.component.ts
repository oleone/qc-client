import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';

import { AppStateService } from 'src/app/services/app-state.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private appState: AppStateService, private location: Location) {
    this.form = this.formBuilder.group({
      name: [null, []],
      email: [null, []],
      cpf: [null, []],
      phone: [null, []],
    });
  }

  ngOnInit(): void {
    this.appState.getParam.pipe(take(1))
      .subscribe((result: any) => {        
        if (result) {
          try {
            result = JSON.parse(result);
            this.form.patchValue(result);
          } catch (error) {
            this.form.patchValue(result);
          }
          this.appState.setLoading(false);
        }
      });
  }

  goBack() {
    this.location.back();
  }

}
