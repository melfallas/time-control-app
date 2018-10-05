import { Component, OnInit } from '@angular/core';
import { ProjectService } from "../../services/project.service";

@Component({
    selector: 'app-project',
    templateUrl: './project.component.html',
    styles: []
})

export class ProjectComponent {

    private projectList : any[] = [];
    private pageIsLoading : boolean = true;

    constructor(private _pProject : ProjectService) {
        this._pProject.getAll().subscribe(data => {
            this.projectList = data;
            console.log(data);
            this.pageIsLoading = false;
        });
    }

    public getProjectList() {
        return this.projectList;
    }

    public getPageIsLoading() {
        return this.pageIsLoading;
    }

    public deleteProject(pId : string) {
        this._pProject.deleteProject(pId)
        .subscribe(result => {
            if (result) {
                this.projectList = this.removeItemList(pId);
            }
        });
    }

    private removeItemList(pItemId : string) {
        return this.projectList.filter(element => element.id != pItemId);
    }
}
