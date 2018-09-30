import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { ProjectPhaseService } from '../../services/project-phase.service';

@Component({
selector: 'app-project-phase-form',
templateUrl: './project-phase-form.component.html',
styles: []
})

export class ProjectPhaseFormComponent {

id : string;
projectPhase : any;
mainForm : FormGroup;

constructor(
private _projectPhaseService : ProjectPhaseService,
private _router : Router,
private _activatedRoute : ActivatedRoute
) {
// Procesar parámetros de ruta
this._activatedRoute.params.subscribe(params => this.id = params['id']);
if(this.id != 'new') {
this._projectPhaseService.getProjectPhase(this.id)
.subscribe(item => {
this.projectPhase = item.data;
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
Validators.required
,Validators.maxLength(50)
]),
});
}

public saveChanges() {
if(this.id == 'new') {
this._projectPhaseService.createProjectPhase(this.mainForm.value)
.subscribe(
data => {
console.log(data);
this._router.navigate(['/project-phase']);
},
error => console.log('ERROR: ', error)
);
} else {
this._projectPhaseService.updateProjectPhase(this.mainForm.value, this.id)
.subscribe(
data => {
console.log(data);
this._router.navigate(['/project-phase']);
},
error => console.log('ERROR: ', error)
);
}
}

}
