import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GithubRepoService } from './githubrepo.service';
import { Repos } from './repos';

@Component({
  selector: 'app-githubrepo',
  templateUrl: './githubrepo.component.html',
  styleUrls: ['./githubrepo.component.css']
})
export class GithubrepoComponent implements OnInit {
  username: string = "santoshpun"

  repos: Repos[];
  repoForm: FormGroup;
  message = '';

  constructor(private githubRepoService: GithubRepoService, private fb: FormBuilder) { }

  ngOnInit() {
    this.initFormFields();

    this.fetchRepos();
  }

  initFormFields() {
    this.repoForm = this.fb.group({
      id: ['1', Validators.required],
      name: ['Angular', Validators.required],
      url: ['https://google.com', Validators.required],
      description: ['Angular kickstarter project', Validators.required]
    });
  }

  get f() {
    return this.repoForm.controls;
  }

  fetchRepos() {
    // The subscribe method has three callback arguments
    //.subscribe(success, error, completed); 

    this.githubRepoService.getRepos(this.username).subscribe(
      (data: Repos[]) => {                      //Next callback
        this.repos = data;
      },
      error => {                                //Error callback
        console.log(error);
      });
  }

  onSubmit(): void {
    console.log(this.repoForm.value);

    // Make sure to create a deep copy of the form-model
    const result: any = Object.assign({}, this.repoForm.value);

    let data: Repos = {
      id: result.id,
      name: result.name,
      html_url: result.url,
      description: result.description
    };

    this.githubRepoService.addRepo(data).subscribe({
      next: result => {
        console.log(JSON.stringify(result));
        this.message = 'Repo added successfully!';
      },
      error: error => {
        console.log(error);
        this.message = error;
      }
    });

    this.initFormFields();
    
  }

  onReset(): void {
    this.initFormFields();
  }
}
