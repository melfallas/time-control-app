import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';

@Injectable({
providedIn: 'root'
})
export class ProjectPhaseService {

private serviceUrl : string = "http://localhost:5555/projectphase/";

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

public getProjectPhase(pId) {
return this._http.get(this.getElementURL(pId))
.map(result => result.json());
}

public createProjectPhase(pNewProjectPhase) {
let body = JSON.stringify(pNewProjectPhase);
let headers = new Headers({
'Content-Type' : 'application/json'
});
return this._http.post(this.getRootURL(), body, {headers})
.map(result => result.json());
}

public updateProjectPhase(pProjectPhaseData, pId : string) {
let body = JSON.stringify(pProjectPhaseData);
let headers = new Headers({
'Content-Type' : 'application/json'
});
return this._http.put(this.getElementURL(pId), body, {headers})
.map(result => result.json());
}

public deleteProjectPhase(pId : string) {
return this._http.delete(this.getElementURL(pId))
.map(result => result.json());
}

}
