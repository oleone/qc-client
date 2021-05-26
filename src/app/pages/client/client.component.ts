import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppStateService } from 'src/app/services/app-state.service';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  apiResult: any[] | any = null;
  apiResultMessage: string;

  constructor(private service: ClientService, private appState: AppStateService, private router: Router) { }

  ngOnInit(): void {
    this.getClients();
  }

  doDetail(client?: any) {
    this.appState.setParam(null);
    
    this.appState.setParam(client).then(state => {
      if (state && client) {
        this.router.navigate([`clients/${client._id}`]);
      } else {
        this.router.navigate([`clients/new`]);
      }
    });
  }

  getClients() {
    this.appState.setLoading(true).then(state => {
      this.service.find().subscribe(result => {
        this.apiResult = result.data;
        this.apiResultMessage = result.message;
        this.appState.setLoading(false);
      })
    })
  }

}
