import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { take } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';

import { AppStateService } from 'src/app/services/app-state.service';
import { ClientService } from 'src/app/services/client.service';
import { CepService } from 'src/app/services/cep.service';

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
    private toastr: ToastrService,
    private cep: CepService) {
    this.form = this.formBuilder.group({
      _id: [null, []],
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      cpf: [null, [Validators.required]],
      phone: [null, []],
      cep: [null, []],
      numero: [null, []],
      logradouro: [null, []],
      complemento: [null, []],
      bairro: [null, []],
      localidade: [null, []],
      uf: [null, []]
    });
  }

  ngOnInit(): void {
    this.appState.getParam.pipe(take(1))
      .subscribe((result: any) => {
        console.log(result);

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
            this.appState.setLoading(false);
            this.form.patchValue(result);
            this.appState.setParam(result);

            if (!this.form.get('_id')) {
              this.toastr.success('Registro criado com sucesso!');
            } else {
              this.toastr.success('Registro atualizado com sucesso!');
            }
          }, error => {
            this.toastr.error('Erro ao efetuar registro!');
            this.appState.setLoading(false);
          });
      });
  }

  remove() {
    // Como esse projeto é apenas uma pequena exemplificação, o registro será mesmo removido
    // Para projetos reais, aconcelhamos apenas inativar o usuário.

    let confirmation = confirm('Deseja mesmo remover o registro? Isso não terá mais volta.');

    if (confirmation) {
      this.appState.setLoading(true)
        .then(loading => {
          this.service.delete(this.form.get('_id').value)
            .subscribe(result => {
              this.appState.setLoading(false);
              this.toastr.success('Registro deletado com sucesso!');
              setTimeout(() => {
                this.goBack();
              }, 3000);
            }, error => {
              this.toastr.error('Erro ao efetuar registro!');
              this.appState.setLoading(false);
            })
        });
    }
  }

  getCep() {
    this.cep.getAddressByZipcode(this.form.get('cep').value)
      .then(result => {
        this.form.patchValue(result);
      });
  }

}
