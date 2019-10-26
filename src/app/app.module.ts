import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

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
import { FileUploadComponent } from './file-upload/file-upload/file-upload.component';

import { AuthGuard } from './security/auth.guard';

import {AuthenticationService} from './security/authentication.service';
import {MailService} from './email-app/shared/mail.service';
import {FileUploadService} from './file-upload/shared/file-upload.service';
import { ErrorHandlerService } from './error-handler/error-handler.service';

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
    FormsModule,ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
          timeOut:  3000,
          positionClass:  'toast-top-full-width',
          preventDuplicates:  true,
          progressBar: true,
          progressAnimation: 'increasing',
          closeButton: true
        })
  ],
  providers: [AuthGuard,AuthenticationService,
    MailService,FileUploadService,
    { provide: ErrorHandler, useClass: ErrorHandlerService},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
