import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { GithubService } from './app/services/github.service';

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(), GithubService]
}).catch(err => console.error(err));
