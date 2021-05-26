import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

interface ViacepRetorno {
    cep: string,
    logradouro: string,
    complemento: string,
    bairro: string,
    localidade: string,
    uf: string,
    ibge: string,
    gia: string,
    ddd: string,
    siafi: string,
    erro?: boolean,
}

@Injectable({
  providedIn: 'root'
})
export class CepService {

  constructor(private http: HttpClient) { }

  getAddressByZipcode(zipcode: string): Promise<ViacepRetorno> {
    return this.http.get<ViacepRetorno>(`${environment.viacep}/${zipcode}/json`).toPromise();
  }

  getEstados(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      try {
        const estados = [
          {
            "id": "AC",
            "name": "Acre"
          },
          {
            "id": "AL",
            "name": "Alagoas"
          },
          {
            "id": "AP",
            "name": "Amapá"
          },
          {
            "id": "AM",
            "name": "Amazonas"
          },
          {
            "id": "BA",
            "name": "Bahia"
          },
          {
            "id": "CE",
            "name": "Ceará"
          },
          {
            "id": "DF",
            "name": "Distrito"
          },
          {
            "id": "ES",
            "name": "Espírito"
          },
          {
            "id": "GO",
            "name": "Goiás"
          },
          {
            "id": "MA",
            "name": "Maranhão"
          },
          {
            "id": "MT",
            "name": "Mato"
          },
          {
            "id": "MS",
            "name": "Mato"
          },
          {
            "id": "MG",
            "name": "Minas"
          },
          {
            "id": "PA",
            "name": "Pará"
          },
          {
            "id": "PB",
            "name": "Paraíba"
          },
          {
            "id": "PR",
            "name": "Paraná"
          },
          {
            "id": "PE",
            "name": "Pernambuco"
          },
          {
            "id": "PI",
            "name": "Piauí"
          },
          {
            "id": "RJ",
            "name": "Rio"
          },
          {
            "id": "RN",
            "name": "Rio"
          },
          {
            "id": "RS",
            "name": "Rio"
          },
          {
            "id": "RO",
            "name": "Rondônia"
          },
          {
            "id": "RR",
            "name": "Roraima"
          },
          {
            "id": "SC",
            "name": "Santa"
          },
          {
            "id": "SP",
            "name": "São"
          },
          {
            "id": "SE",
            "name": "Sergipe"
          },
          {
            "id": "TO",
            "name": "Tocantins"
          },
        ];
        resolve(estados);
      } catch (error) {
        reject(error);
      }
    });
  }
}
