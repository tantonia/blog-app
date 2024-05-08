import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', loadComponent:()=>import('./pages/home/home.component').then(c=>c.HomeComponent)},
    {path:'create-post', loadComponent:()=>import('./pages/create-post/create-post.component').then(c=>c.CreatePostComponent)},
    {path:'edit-post/:id', loadComponent:()=>import('./pages/edit-post/edit-post.component').then(c=>c.EditPostComponent)},
    {path:'login', loadComponent:()=>import('./pages/login/login.component').then(c=>c.LoginComponent)},
    {path: 'signup', loadComponent:()=>import('./pages/signup/signup.component').then(c=>c.SignupComponent)},
    {path: 'post-details/:id', loadComponent:()=>import('./pages/post-details/post-details.component').then(c=>c.PostDetailsComponent)} ,
    {path: '**', loadComponent:()=>import('./pages/not-found/not-found.component').then(c=>c.NotFoundComponent)}
];
