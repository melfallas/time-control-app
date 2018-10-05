
// Importación de Módulos
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Importación de Rutas
import { APP_ROUTING } from './app.routes';

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
        TaskTypeFormComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        APP_ROUTING
    ],
    providers: [
        KnowledgeAreaService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
