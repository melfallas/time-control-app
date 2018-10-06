import { Component, OnInit } from '@angular/core';
import { TaskControlService } from "../../services/task-control.service";

@Component({
    selector: 'app-task-control',
    templateUrl: './task-control.component.html',
    styles: []
})

export class TaskControlComponent {

    private taskControlList : any[] = [];
    private pageIsLoading : boolean = true;

    constructor(private _pTaskControl : TaskControlService) {
        this._pTaskControl.getAll().subscribe(data => {
            this.taskControlList = data;
            console.log(data);
            this.pageIsLoading = false;
        });
    }

    public getTaskControlList() {
        return this.taskControlList;
    }

    public getPageIsLoading() {
        return this.pageIsLoading;
    }

    public deleteTaskControl(pId : string) {
        this._pTaskControl.deleteTaskControl(pId)
        .subscribe(result => {
            if (result) {
                this.taskControlList = this.removeItemList(pId);
            }
        });
    }

    private removeItemList(pItemId : string) {
        return this.taskControlList.filter(element => element.id != pItemId);
    }
}
