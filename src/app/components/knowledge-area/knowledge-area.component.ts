import { Component, OnInit } from '@angular/core';
import { KnowledgeAreaService } from "../../services/knowledge-area.service";

@Component({
selector: 'app-knowledge-area',
templateUrl: './knowledge-area.component.html',
styles: []
})

export class KnowledgeAreaComponent {

private knowledgeAreaList : any[] = [];

constructor(private _pKnowledgeArea : KnowledgeAreaService) {
this._pKnowledgeArea.getAll().subscribe(data => {
this.knowledgeAreaList = data;
console.log(data);
});
}

public getKnowledgeAreaList() {
return this.knowledgeAreaList;
}

public deleteKnowledgeArea(pId : string) {
this._pKnowledgeArea.deleteKnowledgeArea(pId)
.subscribe(result => {
if (result) {
this.knowledgeAreaList = this.removeItemList(pId);
}
});
}

private removeItemList(pItemId : string) {
return this.knowledgeAreaList.filter(element => element.id != pItemId);
}
}
