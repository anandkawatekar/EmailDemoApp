import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { InboxComponent } from './email-app/inbox/inbox.component';
import { AppRoutingModule } from './app-routing.module';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { LoginComponent } from './login/login.component';
import { SentComponent } from './email-app/sent/sent.component';
import { DraftComponent } from './email-app/draft/draft.component';
import { TrashComponent } from './email-app/trash/trash.component';
import { HeaderComponent } from './header/header.component';
import { ComposeComponent } from './email-app/compose/compose.component';
import { ReadMailComponent } from './email-app/read-mail/read-mail.component';

import {AuthenticationService} from './security/authentication.service';
import {MailService} from './email-app/shared/mail.service';
import {FileUploadService} from './file-upload/shared/file-upload.service';

import { AuthGuard } from './security/auth.guard';
import { FileUploadComponent } from './file-upload/file-upload/file-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    InboxComponent,
    PagenotfoundComponent,
    LoginComponent,
    SentComponent,
    DraftComponent,
    TrashComponent,
    HeaderComponent,
    ComposeComponent,
    ReadMailComponent,
    FileUploadComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,ReactiveFormsModule
  ],
  providers: [AuthGuard,AuthenticationService,MailService,FileUploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
