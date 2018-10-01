import { Component, OnInit } from '@angular/core';
import { ProjectPhaseService } from "../../services/project-phase.service";

@Component({
selector: 'app-project-phase',
templateUrl: './project-phase.component.html',
styles: []
})

export class ProjectPhaseComponent {

private projectPhaseList : any[] = [];

constructor(private _pProjectPhase : ProjectPhaseService) {
this._pProjectPhase.getAll().subscribe(data => {
this.projectPhaseList = data;
console.log(data);
});
}

public getProjectPhaseList() {
return this.projectPhaseList;
}

public deleteProjectPhase(pId : string) {
this._pProjectPhase.deleteProjectPhase(pId)
.subscribe(result => {
if (result) {
this.projectPhaseList = this.removeItemList(pId);
}
});
}

private removeItemList(pItemId : string) {
return this.projectPhaseList.filter(element => element.id != pItemId);
}
}
