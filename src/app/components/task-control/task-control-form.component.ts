import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { TaskControlService } from '../../services/task-control.service';
import { TaskTypeService } from '../../services/task-type.service'
import { ProjectService } from '../../services/project.service'
import { ProjectPhaseService } from '../../services/project-phase.service'

@Component({
    selector: 'app-task-control-form',
    templateUrl: './task-control-form.component.html',
    styles: []
})

export class TaskControlFormComponent {

    private id : string;
    private taskControl : any;
    private mainForm : FormGroup;
    // Atributos autogenerados para listados de catálogos
    private taskTypeList = [];
    private projectList = [];
    private projectPhaseList = [];

    constructor(
        private _taskTypeService : TaskTypeService,
        private _projectService : ProjectService,
        private _projectPhaseService : ProjectPhaseService,
        private _taskControlService : TaskControlService,
        private _router : Router,
        private _activatedRoute : ActivatedRoute
    ) {
        // Procesar parámetros de ruta
        this._activatedRoute.params.subscribe(params => this.id = params['id']);
        if(this.id != 'new') {
            this._taskControlService.getTaskControl(this.id)
            .subscribe(item => {
                this.taskControl = item.data;
                delete item.data.id;				// Borrar e id del objeto para ignorarlo en la carga del formulario
                // Reemplazar objetos complejos por el id, si existen
                item.data.taskType = item.data.taskType.id;
                item.data.project = item.data.project.id;
                item.data.projectPhase = item.data.projectPhase.id;
                console.log(item.data);
                this.mainForm.setValue(item.data);
            });
        }
        // Crear controles y validaciones de formulario
        this.mainForm = new FormGroup({
        'taskType' : new FormControl('', [
            Validators.required
        ]),
        'displayName' : new FormControl('', [
            ,Validators.maxLength(50)
        ]),
        'description' : new FormControl('', [
            ,Validators.maxLength(50)
        ]),
        'project' : new FormControl('', [
            Validators.required
        ]),
        'projectPhase' : new FormControl('', [
            Validators.required
        ]),
        'startTime' : new FormControl('', [
            Validators.required
        ]),
        'endDate' : new FormControl('', [
            Validators.required
        ]),
        'isOutTime' : new FormControl('', [
            Validators.required
        ]),
        'isPaid' : new FormControl('', [
            Validators.required
        ]),
    });
    // Llamados autogenerados a carga de catálogos
    this.loadTaskType();
    this.loadProject();
    this.loadProjectPhase();
}

public getMainForm() : FormGroup {
    return this.mainForm;
}

public getTaskTypeList() {
    return this.taskTypeList;
}
public getProjectList() {
    return this.projectList;
}
public getProjectPhaseList() {
    return this.projectPhaseList;
}

private loadTaskType() {
    this._taskTypeService.getAll()
    .subscribe(item => {
        console.log(item);
        this.taskTypeList = item;
    });
}
private loadProject() {
    this._projectService.getAll()
    .subscribe(item => {
        console.log(item);
        this.projectList = item;
    });
}
private loadProjectPhase() {
    this._projectPhaseService.getAll()
    .subscribe(item => {
        console.log(item);
        this.projectPhaseList = item;
    });
}

public saveChanges() {
    if(this.id == 'new') {
        this._taskControlService.createTaskControl(this.mainForm.value)
        .subscribe(
            data => {
                console.log(data);
                this._router.navigate(['/task-control']);
            },
            error => console.log('ERROR: ', error)
        );
    } else {
        this._taskControlService.updateTaskControl(this.mainForm.value, this.id)
        .subscribe(
            data => {
                console.log(data);
                this._router.navigate(['/task-control']);
            },
            error => console.log('ERROR: ', error)
        );
    }
}

}
