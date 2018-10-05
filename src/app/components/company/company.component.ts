import { Component, OnInit } from '@angular/core';
import { CompanyService } from "../../services/company.service";

@Component({
    selector: 'app-company',
    templateUrl: './company.component.html',
    styles: []
})

export class CompanyComponent {

    private companyList : any[] = [];
    private pageIsLoading : boolean = true;

    constructor(private _pCompany : CompanyService) {
        this._pCompany.getAll().subscribe(data => {
            this.companyList = data;
            console.log(data);
            this.pageIsLoading = false;
        });
    }

    public getCompanyList() {
        return this.companyList;
    }

    public getPageIsLoading() {
        return this.pageIsLoading;
    }

    public deleteCompany(pId : string) {
        this._pCompany.deleteCompany(pId)
        .subscribe(result => {
            if (result) {
                this.companyList = this.removeItemList(pId);
            }
        });
    }

    private removeItemList(pItemId : string) {
        return this.companyList.filter(element => element.id != pItemId);
    }
}
