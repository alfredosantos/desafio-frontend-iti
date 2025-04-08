import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { GithubService } from './github.service';
import { of, throwError } from 'rxjs';
import { UserSearchComponent } from '../components/user-search/user-search.component';

describe('UserSearchComponent', () => {
  let component: UserSearchComponent;
  let fixture: ComponentFixture<UserSearchComponent>;
  let githubServiceSpy: jasmine.SpyObj<GithubService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('GithubService', ['getUser', 'getUserRepos']);

    await TestBed.configureTestingModule({
      imports: [UserSearchComponent, FormsModule],
      providers: [{ provide: GithubService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(UserSearchComponent);
    component = fixture.componentInstance;
    githubServiceSpy = TestBed.inject(GithubService) as jasmine.SpyObj<GithubService>;

    githubServiceSpy.getUserRepos.and.returnValue(of([]));
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve exibir mensagem de erro se o campo de entrada estiver vazio', () => {
    component.username = '';
    component.searchUser();
    expect(component.error).toBe('Por favor, insira um nome de usuário.');
  });

  it('deve buscar informações do usuário ao chamar searchUser', () => {
    const mockUserData = { login: 'octocat', name: 'The Octocat' };
    githubServiceSpy.getUser.and.returnValue(of(mockUserData));

    component.username = 'octocat';
    component.searchUser();

    expect(githubServiceSpy.getUser).toHaveBeenCalledWith('octocat');
    expect(component.userData).toEqual(mockUserData);
    expect(component.error).toBeNull();
  });

  it('deve exibir mensagem de erro se o usuário não for encontrado', () => {
    githubServiceSpy.getUser.and.returnValue(throwError(() => new Error('Usuário não encontrado')));

    component.username = 'invalido';
    component.searchUser();

    expect(githubServiceSpy.getUser).toHaveBeenCalledWith('invalido');
    expect(component.error).toBe('Usuário não encontrado.');
    expect(component.userData).toBeNull();
  });

  it('deve buscar repositórios do usuário ao chamar fetchRepos', () => {
    const mockRepos = [{ name: 'repo1', stargazers_count: 10 }];
    githubServiceSpy.getUserRepos.and.returnValue(of(mockRepos));

    component.username = 'octocat';
    component.fetchRepos();

    expect(githubServiceSpy.getUserRepos).toHaveBeenCalledWith('octocat');
    expect(component.repos).toEqual(mockRepos);
  });

  it('deve filtrar repositórios corretamente', () => {
    component.repos = [
      { name: 'repo1', stargazers_count: 10 },
      { name: 'repo2', stargazers_count: 5 },
    ];
    component.filterRepos('repo1');

    expect(component.filteredRepos).toEqual([{ name: 'repo1', stargazers_count: 10 }]);
  });

  it('deve ordenar repositórios por estrelas em ordem decrescente', () => {
    component.filteredRepos = [
      { name: 'repo1', stargazers_count: 5 },
      { name: 'repo2', stargazers_count: 10 },
    ];
    component.sortOption = 'stars-desc';
    component.sortRepos();

    expect(component.filteredRepos).toEqual([
      { name: 'repo2', stargazers_count: 10 },
      { name: 'repo1', stargazers_count: 5 },
    ]);
  });
});
