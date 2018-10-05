import { RouterModule, Routes } from '@angular/router';

// Importación de Componentes
import { HomeComponent } from './components/home/home.component';
import { KnowledgeAreaComponent } from './components/knowledge-area/knowledge-area.component';
import { KnowledgeAreaFormComponent } from './components/knowledge-area/knowledge-area-form.component';
import { ProjectPhaseComponent } from './components/project-phase/project-phase.component';
import { ProjectPhaseFormComponent } from './components/project-phase/project-phase-form.component';
import { ResourceTypeComponent } from './components/resource-type/resource-type.component';
import { ResourceTypeFormComponent } from './components/resource-type/resource-type-form.component';
import { ResourceComponent } from './components/resource/resource.component';
import { ResourceFormComponent } from './components/resource/resource-form.component';
import { TaskTypeComponent } from './components/task-type/task-type.component';
import { TaskTypeFormComponent } from './components/task-type/task-type-form.component';

const APP_ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'knowledge-area', component: KnowledgeAreaComponent },
    {
        path: 'knowledge-area/:id',
        component: KnowledgeAreaFormComponent/*,
        children: [

    ]*/
},
{ path: 'project-phase', component: ProjectPhaseComponent },
{ path: 'project-phase/:id', component: ProjectPhaseFormComponent },
{ path: 'resource-type', component: ResourceTypeComponent },
{ path: 'resource-type/:id', component: ResourceTypeFormComponent },
{ path: 'resource', component: ResourceComponent },
{ path: 'resource/:id', component: ResourceFormComponent },
{ path: 'task-type', component: TaskTypeComponent },
{ path: 'task-type/:id', component: TaskTypeFormComponent },
{ path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
