import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { ResourceService } from '../../services/resource.service';
import { ResourceTypeService } from '../../services/resource-type.service'

@Component({
selector: 'app-resource-form',
templateUrl: './resource-form.component.html',
styles: []
})

export class ResourceFormComponent {

id : string;
resource : any;
mainForm : FormGroup;
// Atributos autogenerados para listados de catálogos
resourceTypeList = [];

constructor(
private _resourceTypeService : ResourceTypeService,
private _resourceService : ResourceService,
private _router : Router,
private _activatedRoute : ActivatedRoute
) {
// Procesar parámetros de ruta
this._activatedRoute.params.subscribe(params => this.id = params['id']);
if(this.id != 'new') {
this._resourceService.getResource(this.id)
.subscribe(item => {
this.resource = item.data;
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
'abbreviation' : new FormControl('', [
Validators.required
,Validators.maxLength(5)
]),
'resourceType' : new FormControl('', [
Validators.required
]),
'hourCost' : new FormControl('', [
Validators.required
]),
'extraHourCost' : new FormControl('', [
Validators.required
]),
'useCost' : new FormControl('', [
Validators.required
]),
});
// Llamados autogenerados a carga de catálogos
this.loadResourceType();
}

private loadResourceType() {
this._resourceTypeService.getAll()
.subscribe(item => {
console.log(item);
this.resourceTypeList = item;
});
}

public saveChanges() {
if(this.id == 'new') {
this._resourceService.createResource(this.mainForm.value)
.subscribe(
data => {
console.log(data);
this._router.navigate(['/resource']);
},
error => console.log('ERROR: ', error)
);
} else {
this._resourceService.updateResource(this.mainForm.value, this.id)
.subscribe(
data => {
console.log(data);
this._router.navigate(['/resource']);
},
error => console.log('ERROR: ', error)
);
}
}

}
