import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';

@Injectable({
    providedIn: 'root'
})
export class TaskTypeService {

    private serviceUrl : string = "https://time-control-app.herokuapp.com/tasktype/";

    constructor(private _http : Http) { }

    private getRootURL() {
        return `${ this.serviceUrl }`;
    }

    private getElementURL(pId : string) {
        return `${ this.serviceUrl }${ pId }`;
    }

    public getAll() {
        return this._http.get(this.getRootURL())
        .map(result => result.json().data);
    }

    public getTaskType(pId) {
        return this._http.get(this.getElementURL(pId))
        .map(result => result.json());
    }

    public createTaskType(pNewTaskType) {
        let body = JSON.stringify(pNewTaskType);
        let headers = new Headers({
            'Content-Type' : 'application/json'
        });
        return this._http.post(this.getRootURL(), body, {headers})
        .map(result => result.json());
    }

    public updateTaskType(pTaskTypeData, pId : string) {
        let body = JSON.stringify(pTaskTypeData);
        let headers = new Headers({
            'Content-Type' : 'application/json'
        });
        return this._http.put(this.getElementURL(pId), body, {headers})
        .map(result => result.json());
    }

    public deleteTaskType(pId : string) {
        return this._http.delete(this.getElementURL(pId))
        .map(result => result.json());
    }

}
