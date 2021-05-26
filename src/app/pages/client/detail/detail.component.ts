import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { take } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';

import { AppStateService } from 'src/app/services/app-state.service';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private appState: AppStateService,
    private location: Location,
    private service: ClientService,
    private toastr: ToastrService,) {
    this.form = this.formBuilder.group({
      _id: [null, []],
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      cpf: [null, [Validators.required]],
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

  save() {
    this.appState.setLoading(true)
      .then(loading => {
        this.service.save(this.form.value)
          .subscribe(result => {
            this.form.patchValue(result);
            this.toastr.success('Registro criado com sucesso!');
            this.appState.setLoading(false);
          }, error => {
            this.toastr.error('Erro ao efetuar registro!');
            this.appState.setLoading(false);
          });
      });
  }

}
