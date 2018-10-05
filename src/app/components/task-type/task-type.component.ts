import { Component, OnInit } from '@angular/core';
import { TaskTypeService } from "../../services/task-type.service";

@Component({
    selector: 'app-task-type',
    templateUrl: './task-type.component.html',
    styles: []
})

export class TaskTypeComponent {

    private taskTypeList : any[] = [];
    private pageIsLoading : boolean = true;

    constructor(private _pTaskType : TaskTypeService) {
        this._pTaskType.getAll().subscribe(data => {
            this.taskTypeList = data;
            console.log(data);
            this.pageIsLoading = false;
        });
    }

    public getTaskTypeList() {
        return this.taskTypeList;
    }

    public getPageIsLoading() {
        return this.pageIsLoading;
    }

    public deleteTaskType(pId : string) {
        this._pTaskType.deleteTaskType(pId)
        .subscribe(result => {
            if (result) {
                this.taskTypeList = this.removeItemList(pId);
            }
        });
    }

    private removeItemList(pItemId : string) {
        return this.taskTypeList.filter(element => element.id != pItemId);
    }
}
