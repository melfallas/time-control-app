import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { TaskTypeService } from '../../services/task-type.service';

@Component({
    selector: 'app-task-type-form',
    templateUrl: './task-type-form.component.html',
    styles: []
})

export class TaskTypeFormComponent {

    private id : string;
    private taskType : any;
    private mainForm : FormGroup;
    // Atributos autogenerados para listados de catálogos

    constructor(
        private _taskTypeService : TaskTypeService,
        private _router : Router,
        private _activatedRoute : ActivatedRoute
    ) {
        // Procesar parámetros de ruta
        this._activatedRoute.params.subscribe(params => this.id = params['id']);
        if(this.id != 'new') {
            this._taskTypeService.getTaskType(this.id)
            .subscribe(item => {
                this.taskType = item.data;
                delete item.data.id;				// Borrar e id del objeto para ignorarlo en la carga del formulario
                // Reemplazar objetos complejos por el id, si existen
                console.log(item.data);
                this.mainForm.setValue(item.data);
            });
        }
        // Crear controles y validaciones de formulario
        this.mainForm = new FormGroup({
        'code' : new FormControl('', [
            Validators.required
            ,Validators.maxLength(5)
        ]),
        'displayName' : new FormControl('', [
            Validators.required
            ,Validators.maxLength(50)
        ]),
        'description' : new FormControl('', [
            Validators.required
            ,Validators.maxLength(50)
        ]),
    });
    // Llamados autogenerados a carga de catálogos
}

public getMainForm() : FormGroup {
    return this.mainForm;
}



public saveChanges() {
    if(this.id == 'new') {
        this._taskTypeService.createTaskType(this.mainForm.value)
        .subscribe(
            data => {
                console.log(data);
                this._router.navigate(['/task-type']);
            },
            error => console.log('ERROR: ', error)
        );
    } else {
        this._taskTypeService.updateTaskType(this.mainForm.value, this.id)
        .subscribe(
            data => {
                console.log(data);
                this._router.navigate(['/task-type']);
            },
            error => console.log('ERROR: ', error)
        );
    }
}

}
