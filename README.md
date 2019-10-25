# MailClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.5.

This repository contains E-Mail Client web application like Gmail app, developed using Visual Studio Code and angular 6.
EmailDemoApi Rest Service is used as backend to store data. API url is configured in environment.ts file

Steps to Run Application:
1) Pre-RequirementsInstall Visual Studio Code, Node.js, Angular 6, Angular-CLI.
2) Clone/Download the source code in to native PC.
3)Install all dependencies using commands:
	$ npm install -g @angular/cli
	$ npm install -g typescript
	
4) Once All setup is complete, then go to downloaded project folder and Open Project in visual studio code.
5) Open environment.ts file located at src/environments/environment.ts.
6) Change "MailApiUrl" value to path of the Rest api. Example:'http://localhost:22359/api'. Save and close file.
7) Now you can run this project using 'ng serve -o' command from terminal.




## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
