import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { ProjectService } from '../../services/project.service';

@Component({
    selector: 'app-project-form',
    templateUrl: './project-form.component.html',
    styles: []
})

export class ProjectFormComponent {

    private id : string;
    private project : any;
    private mainForm : FormGroup;
    // Atributos autogenerados para listados de catálogos

    constructor(
        private _projectService : ProjectService,
        private _router : Router,
        private _activatedRoute : ActivatedRoute
    ) {
        // Procesar parámetros de ruta
        this._activatedRoute.params.subscribe(params => this.id = params['id']);
        if(this.id != 'new') {
            this._projectService.getProject(this.id)
            .subscribe(item => {
                this.project = item.data;
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
            ,Validators.maxLength(15)
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
        this._projectService.createProject(this.mainForm.value)
        .subscribe(
            data => {
                console.log(data);
                this._router.navigate(['/project']);
            },
            error => console.log('ERROR: ', error)
        );
    } else {
        this._projectService.updateProject(this.mainForm.value, this.id)
        .subscribe(
            data => {
                console.log(data);
                this._router.navigate(['/project']);
            },
            error => console.log('ERROR: ', error)
        );
    }
}

}
