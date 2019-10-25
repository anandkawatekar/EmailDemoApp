import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { InboxComponent } from './email-app/inbox/inbox.component';
import { SentComponent } from './email-app/sent/sent.component';
import { DraftComponent } from './email-app/draft/draft.component';
import { TrashComponent } from './email-app/trash/trash.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ComposeComponent } from './email-app/compose/compose.component';
import { ReadMailComponent } from './email-app/read-mail/read-mail.component';
import { AuthGuard } from './security/auth.guard';


const appRoutes: Routes = [
  {path: 'inbox', component: InboxComponent,canActivate: [AuthGuard]},
  {path: 'detail/:id', component: ReadMailComponent,canActivate: [AuthGuard]},
  {path: 'inbox/:id', component: ReadMailComponent,canActivate: [AuthGuard]},
  {path: 'sent', component: SentComponent,canActivate: [AuthGuard]},
  {path: 'sent/:id', component: ReadMailComponent,canActivate: [AuthGuard]},
  {path: 'draft', component: DraftComponent,canActivate: [AuthGuard]},
  {path: 'draft/:id', component: ComposeComponent,canActivate: [AuthGuard]},
  {path: 'trash', component: TrashComponent,canActivate: [AuthGuard]},
  {path: 'trash/:id', component: ReadMailComponent,canActivate: [AuthGuard]},
  {path: 'compose', component: ComposeComponent,canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: '/inbox', pathMatch: 'full'},
  {path: '**', component: PagenotfoundComponent}
];

@NgModule({
  imports: [ CommonModule, RouterModule.forRoot(appRoutes) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
