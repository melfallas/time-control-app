import { Component, OnInit } from '@angular/core';
import { ResourceService } from "../../services/resource.service";

@Component({
    selector: 'app-resource',
    templateUrl: './resource.component.html',
    styles: []
})

export class ResourceComponent {

    private resourceList : any[] = [];

    constructor(private _pResource : ResourceService) {
        this._pResource.getAll().subscribe(data => {
            this.resourceList = data;
            console.log(data);
        });
    }
    
    public deleteResource(pId : string) {
        this._pResource.deleteResource(pId)
        .subscribe(result => {
            if (result) {
                this.resourceList = this.removeItemList(pId);
            }
        });
    }

    private removeItemList(pItemId : string) {
        return this.resourceList.filter(element => element.id != pItemId);
    }
}
