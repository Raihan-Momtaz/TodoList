**Todo List Appplication**

The Todo List application built with latest **Angular 20** and **ASP.NET Core 9**. 

Users can add, view, delete, update status of tasks in a clean, responsive interface using Angular Materials.

**Tech Stack**
- **Frontend:** Angular 20, Angular Material, SCSS
- **Backend:** .NET 9 
- **API Communication:** RESTful HTTP
- **Build Tools:** Node.js, .NET SDK
- **UI Framework:** Angular Material

**Prerequisites**  
Before running the project, install these tools:

  1. **Node.js** (JavaScript runtime)  v22.17.1  
     Download & install latest from: https://nodejs.org/
     
  2. **Angular CLI** (Command-line tool for Angular)  v20.1.4  
     npm install -g @angular/cli
     
  3. **NET 9 SDK** (for running the backend)  
  Download & install from: https://dotnet.microsoft.com/download/dotnet/9.0
  
  4. **VS code**  
  Download from: https://code.visualstudio.com/download
  
  5. **Git**  
  Download from https://git-scm.com/downloads
  
  6. **C# Dev Kit Extension**  
  Download from VS code extensions
  
  7. **NuGet Gallery Extension**  
  Download from VS code extensions

**Clone the Repository**  
Open a terminal or command prompt and run:  
**git clone  https://github.com/Raihan-Momtaz/TodoList.git**

**Backend Setup (.NET Core)**  
cd Backend  
dotnet restore  
dotnet build  
dotnet run  

This starts the backend API on https://localhost:5001  

**Frontend Setup (Angular)**  
cd todo-app  
npm install  

( Note, **If your system has script execution disabled**, open PowerShell as Administrator and enter:  
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned  
now try npm install )  

Install  **Angular Material**  
  ng add @angular/material  
  -for theme choose magenta/purple

Install  **Moment** for Date&Timepicker  
  npm install @angular/material-moment-adapter moment  

Install **Angular Component Dev Kit (CDK)** for drag and drop functionality  
npm install @angular/cdk  

**Start the Angular App**  
  ng serve  

Navigate to http://localhost:4200 in your browser  

