import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DateTimeUtilityService } from '../../services/date-time-utility.service';
import {NgbCalendar, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { TaskControlService } from '../../services/task-control.service';
import { TaskTypeService } from '../../services/task-type.service';
import { ProjectService } from '../../services/project.service';
import { ProjectPhaseService } from '../../services/project-phase.service';

@Component({
    selector: 'app-task-control-form',
    templateUrl: './task-control-form.component.html',
    styles: []
})

export class TaskControlFormComponent {

    private id : string;
    private taskControl : any;
    private mainForm : FormGroup;
    // Atributos autogenerados para listados de catálogos y campos de fecha
    private taskTypeList = [];
    private projectList = [];
    private projectPhaseList = [];
    public startTimeDPModel : NgbDateStruct;
    public startTimeTPModel = {};
    public endDateDPModel : NgbDateStruct;
    public endDateTPModel = {};

    constructor(
        private _taskTypeService : TaskTypeService,
        private _projectService : ProjectService,
        private _projectPhaseService : ProjectPhaseService,
        private _taskControlService : TaskControlService,
        private _dtuService : DateTimeUtilityService,
        private _router : Router,
        private _activatedRoute : ActivatedRoute,
        private _calendar : NgbCalendar
    ) {
        // Procesar parámetros de ruta
        this._activatedRoute.params.subscribe(params => this.id = params['id']);
        if(this.id == 'new') {
            // Setear valores por defecto, en creación de un nuevo elemento
            this.startTimeDPModel = this._calendar.getToday();
            this.startTimeTPModel = this._dtuService.getTimeStruct(new Date());
            this.endDateDPModel = this._calendar.getToday();
            this.endDateTPModel = this._dtuService.getTimeStruct(new Date());
        }
        else {
            // En la edición del formulario, obtener valores del elemento y llenar el formularo
            this._taskControlService.getTaskControl(this.id)
            .subscribe(item => {
                this.taskControl = item.data;
                // Procesar y setear campos de fecha
                let dateStruct, timeStruct;
                dateStruct = this._dtuService.getDateStruct(item.data.startTime);
                this.startTimeDPModel = dateStruct;
                item.data.startTimeDP = dateStruct;
                timeStruct = this._dtuService.getTimeStruct(item.data.startTime);
                item.data.startTimeTP = timeStruct;
                this.startTimeTPModel = timeStruct;
                dateStruct = this._dtuService.getDateStruct(item.data.endDate);
                this.endDateDPModel = dateStruct;
                item.data.endDateDP = dateStruct;
                timeStruct = this._dtuService.getTimeStruct(item.data.endDate);
                item.data.endDateTP = timeStruct;
                this.endDateTPModel = timeStruct;

                // Reemplazar objetos complejos por el id, en caso de existir
                item.data.taskType = item.data.taskType.id;
                item.data.project = item.data.project.id;
                item.data.projectPhase = item.data.projectPhase.id;
                // Borrar el id y las fechas del objeto para ignorarlo en la carga del formulario
                delete item.data.id;
                delete item.data.startTime;
                delete item.data.endDate;
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
        'startTimeDP' : new FormControl(this.startTimeDPModel, [
            Validators.required
        ]),
        'startTimeTP' : new FormControl(this.startTimeTPModel, [
            Validators.required
        ]),
        'endDateDP' : new FormControl(this.endDateDPModel, [
            Validators.required
        ]),
        'endDateTP' : new FormControl(this.endDateTPModel, [
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

// Getters Autogenerados
public getTaskTypeList() {
return this.taskTypeList;
}
public getProjectList() {
    return this.projectList;
}
public getProjectPhaseList() {
    return this.projectPhaseList;
}

public getStartTimeDPModel() : NgbDateStruct {
    return this.startTimeDPModel;
}
public getStartTimeTPModel() : any {
    return this.startTimeTPModel;
}

public getEndDateDPModel() : NgbDateStruct {
    return this.endDateDPModel;
}
public getEndDateTPModel() : any {
    return this.endDateTPModel;
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

public setDateToday(pDatePickerElement, pControlName) {
    this.mainForm.controls[pControlName].setValue(this._calendar.getToday());
    pDatePickerElement.close();
}

public saveChanges() {
    let stringDate : string;
    // Generar cambios en el formulario para campos de fecha
    stringDate = this._dtuService.buildDateString(this.startTimeDPModel, this.startTimeTPModel);
    this.mainForm.value.startTime = new Date(stringDate);
    stringDate = this._dtuService.buildDateString(this.endDateDPModel, this.endDateTPModel);
    this.mainForm.value.endDate = new Date(stringDate);
    // Validar si se debe crear o actualizar el elemento
    if(this.id == 'new') {
    // Para elemento nuevo, se invoca el servicio create
    this._taskControlService.createTaskControl(this.mainForm.value)
    .subscribe(
        data => {
            console.log(data);
            this._router.navigate(['/task-control']);
        },
        error => console.log('ERROR: ', error)
    );
} else {
    // Para elemento existente, se invoca el servicio update
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
