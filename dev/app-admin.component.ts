import {Component} from 'angular2/core';
import {TopBarComponent} from "./top-bar.component";
import {ContentComponent} from "./content.component";

@Component({
    selector: 'my-app',
    template: `
        <top-bar (itemSelected)="onItemSelected($event)"></top-bar>
        <content [menuItemName]="menuItemName"
                 [contents]="contents"
                 [isAdmin]="isAdmin">
        </content>
    `,
    directives: [TopBarComponent, ContentComponent],
})
export class AppAdminComponent {
    menuItemName:string = "nrc code";
    contents:any;
    isFirstLoad:boolean;
    isAdmin:boolean = true;
    
    onItemSelected(item){
        this.menuItemName = item;
        this.initContents();
    }

    initContents(){
        this.isFirstLoad = true;
        this.contents = [];
        var ref = new Firebase('https://nrccode.firebaseio.com/'+
            this.menuItemName.replace(' ','-'));
        ref.on('value', snap =>{
            if(this.isFirstLoad)
                for(var content in snap.val()){
                    this.contents.push(snap.val()[content]);
                }
        });
        ref.on('child_added', snap =>{
            if(!this.isFirstLoad)
                this.contents.push(snap.val());
        });
        this.isFirstLoad = false;
    }

    ngOnInit(){
        this.initContents();
    }
}