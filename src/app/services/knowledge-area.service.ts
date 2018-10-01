import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';

@Injectable({
    providedIn: 'root'
})
export class KnowledgeAreaService {

    private serviceUrl : string = "https://time-control-app.herokuapp.com/knowledgearea/";

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

    public getKnowledgeArea(pId) {
        return this._http.get(this.getElementURL(pId))
        .map(result => result.json());
    }

    public createKnowledgeArea(pNewKnowledgeArea) {
        let body = JSON.stringify(pNewKnowledgeArea);
        let headers = new Headers({
            'Content-Type' : 'application/json'
        });
        return this._http.post(this.getRootURL(), body, {headers})
        .map(result => result.json());
    }
    
    public updateKnowledgeArea(pKnowledgeAreaData, pId : string) {
        let body = JSON.stringify(pKnowledgeAreaData);
        let headers = new Headers({
            'Content-Type' : 'application/json'
        });
        return this._http.put(this.getElementURL(pId), body, {headers})
        .map(result => result.json());
    }

    public deleteKnowledgeArea(pId : string) {
        return this._http.delete(this.getElementURL(pId))
        .map(result => result.json());
    }

}
