import { Component, OnInit } from '@angular/core';
import { ResourceTypeService } from "../../services/resource-type.service";

@Component({
    selector: 'app-resource-type',
    templateUrl: './resource-type.component.html',
    styles: []
})

export class ResourceTypeComponent {

    resourceTypeList : any[] = [];

    constructor(private _pResourceType : ResourceTypeService) {
        this._pResourceType.getAll().subscribe(data => {
            this.resourceTypeList = data;
            console.log(data);
        });
    }

    public deleteResourceType(pId : string) {
        this._pResourceType.deleteResourceType(pId)
        .subscribe(result => {
            if (result) {
                this.resourceTypeList = this.removeItemList(pId);
            }
        });
    }

    private removeItemList(pItemId : string) {
        return this.resourceTypeList.filter(element => element.id != pItemId);
    }
}
