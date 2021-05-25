import { Component } from '@angular/core';

import { AppStateService } from './services/app-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  loading: boolean | null = false;

  constructor(private appState: AppStateService) {}

  ngOnInit(): void {
    this.appState.getLoading.subscribe(state => {
      this.loading = state;
    });
  }
}
