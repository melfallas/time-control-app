import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { KnowledgeAreaService } from '../../services/knowledge-area.service';

@Component({
selector: 'app-knowledge-area-form',
templateUrl: './knowledge-area.form.component.html',
styles: []
})

export class KnowledgeAreaFormComponent {

private id : string;
private knowledgeArea : any;
private mainForm : FormGroup;

constructor(
private _knowledgeAreaService : KnowledgeAreaService,
private _router : Router,
private _activatedRoute : ActivatedRoute
) {
// Procesar parámetros de ruta
this._activatedRoute.params.subscribe(params => this.id = params['id']);
if(this.id != 'new') {
this._knowledgeAreaService.getKnowledgeArea(this.id)
.subscribe(item => {
this.knowledgeArea = item.data;
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
}

public saveChanges() {
if(this.id == 'new') {
this._knowledgeAreaService.createKnowledgeArea(this.mainForm.value)
.subscribe(
data => {
console.log(data);
this._router.navigate(['/knowledge-area']);
},
error => console.log('ERROR: ', error)
);
} else {
this._knowledgeAreaService.updateKnowledgeArea(this.mainForm.value, this.id)
.subscribe(
data => {
console.log(data);
this._router.navigate(['/knowledge-area']);
},
error => console.log('ERROR: ', error)
);
}
}

}
