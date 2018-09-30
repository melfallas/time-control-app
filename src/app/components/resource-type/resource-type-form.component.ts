import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { ResourceTypeService } from '../../services/resource-type.service';

@Component({
    selector: 'app-resource-type-form',
    templateUrl: './resource-type-form.component.html',
    styles: []
})

export class ResourceTypeFormComponent {

    private id : string;
    private resourceType : any;
    private mainForm : FormGroup;
    // Atributos autogenerados para listados de catálogos

    constructor(
        private _resourceTypeService : ResourceTypeService,
        private _router : Router,
        private _activatedRoute : ActivatedRoute
    ) {
        // Procesar parámetros de ruta
        this._activatedRoute.params.subscribe(params => this.id = params['id']);
        if(this.id != 'new') {
            this._resourceTypeService.getResourceType(this.id)
            .subscribe(item => {
                this.resourceType = item.data;
                delete item.data.id;
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
        this._resourceTypeService.createResourceType(this.mainForm.value)
        .subscribe(
            data => {
                console.log(data);
                this._router.navigate(['/resource-type']);
            },
            error => console.log('ERROR: ', error)
        );
    } else {
        this._resourceTypeService.updateResourceType(this.mainForm.value, this.id)
        .subscribe(
            data => {
                console.log(data);
                this._router.navigate(['/resource-type']);
            },
            error => console.log('ERROR: ', error)
        );
    }
}

}
