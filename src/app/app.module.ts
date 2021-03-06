
// Importación de Módulos
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Importación de Rutas
import { APP_ROUTING } from './app.routes';

// providers
import { DatePipe } from '@angular/common';

// Importación de Componentes
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { KnowledgeAreaComponent } from './components/knowledge-area/knowledge-area.component';
import { KnowledgeAreaFormComponent } from './components/knowledge-area/knowledge-area-form.component';
import { KnowledgeAreaService } from "./services/knowledge-area.service";
import { ProjectPhaseComponent } from './components/project-phase/project-phase.component';
import { ProjectPhaseFormComponent } from './components/project-phase/project-phase-form.component';
import { ResourceTypeComponent } from './components/resource-type/resource-type.component';
import { ResourceTypeFormComponent } from './components/resource-type/resource-type-form.component';
import { ResourceComponent } from './components/resource/resource.component';
import { ResourceFormComponent } from './components/resource/resource-form.component';
import { TaskTypeComponent } from './components/task-type/task-type.component';
import { TaskTypeFormComponent } from './components/task-type/task-type-form.component';
import { CompanyComponent } from './components/company/company.component';
import { CompanyFormComponent } from './components/company/company-form.component';
import { ProjectComponent } from './components/project/project.component';
import { ProjectFormComponent } from './components/project/project-form.component';
import { TaskControlComponent } from './components/task-control/task-control.component';
import { TaskControlFormComponent } from './components/task-control/task-control-form.component';


@NgModule({
    declarations: [
        AppComponent,
        KnowledgeAreaComponent,
        KnowledgeAreaFormComponent,
        NavbarComponent,
        HomeComponent,
        ProjectPhaseComponent,
        ProjectPhaseFormComponent,
        ResourceTypeComponent,
        ResourceTypeFormComponent,
        ResourceComponent,
        ResourceFormComponent,
        TaskTypeComponent,
        TaskTypeFormComponent,
        CompanyComponent,
        CompanyFormComponent,
        ProjectComponent,
        ProjectFormComponent,
        TaskControlComponent,
        TaskControlFormComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        APP_ROUTING
    ],
    providers: [
        KnowledgeAreaService,
        DatePipe
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
