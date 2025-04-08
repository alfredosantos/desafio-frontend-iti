import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GithubService } from '../../services/github.service';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class UserSearchComponent {
  username: string = '';
  userData: any = null;
  repos: any[] = [];
  filteredRepos: any[] = [];
  error: string | null = null;
  sortOption: string = 'name-asc';

  constructor(private githubService: GithubService) {}

  searchUser(): void {
    if (this.username) {
      this.githubService.getUser(this.username).subscribe({
        next: (data) => {
          this.userData = data;
          this.error = null;
          this.fetchRepos();
          setTimeout(() => this.scrollToResults(), 0);
        },
        error: (err) => {
          this.error = 'Usuário não encontrado.';
          this.userData = null;
          this.repos = [];
          this.filteredRepos = [];
        },
      });
    } else {
      this.error = 'Por favor, insira um nome de usuário.';
    }
  }

  fetchRepos(): void {
    if (this.username) {
      this.githubService.getUserRepos(this.username).subscribe({
        next: (repos) => {
          this.repos = repos;
          this.filteredRepos = repos;
        },
        error: (err) => {
          console.error('Erro ao buscar repositórios:', err);
        },
      });
    }
  }

  sortRepos(): void {
    if (this.sortOption === 'name-asc') {
      this.filteredRepos.sort((a, b) => a.name.localeCompare(b.name));
    } else if (this.sortOption === 'name-desc') {
      this.filteredRepos.sort((a, b) => b.name.localeCompare(a.name));
    } else if (this.sortOption === 'stars-asc') {
      this.filteredRepos.sort((a, b) => a.stargazers_count - b.stargazers_count);
    } else if (this.sortOption === 'stars-desc') {
      this.filteredRepos.sort((a, b) => b.stargazers_count - a.stargazers_count);
    }
  }

  filterRepos(query: string): void {
    this.filteredRepos = this.repos.filter((repo) =>
      repo.name.toLowerCase().includes(query.toLowerCase())
    );
    this.sortRepos();
  }

  onFilterInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    console.log('Input value:', input.value);
    const value = input ? input.value : '';
    this.filterRepos(value);
  }

  scrollToResults(): void {
    const resultsElement = document.getElementById('search-results');
    if (resultsElement) {
      resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
