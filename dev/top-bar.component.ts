import {Component, EventEmitter} from 'angular2/core';

@Component({
    selector: 'top-bar',
    template: `
<div class="nav-bar">
    <span (click)="onNrcClicked()" class="brackets">{nrc}</span>
    <span (click)="onBarsClicked()" class="bars fa fa-bars fa-2x"></span>
    <nav *ngIf="showMenu" class="nav-main">
      <ul>
        <li *ngFor="#item of menuItems" 
        class="nav-item"
        (click)="onItemClicked(item)"
        >{{item}}</li>
      </ul>
    </nav>
  </div>
`,
    outputs:['itemSelected']
})
export class TopBarComponent {
    showMenu: boolean;
    menuItems:Array = ['dsd','sddsf','gfgf'];
    itemSelected = new EventEmitter<string>();

    constructor(){
        var ref = new Firebase('https://nrccode.firebaseio.com/menu/');
        ref.on('value', snap =>{
           this.menuItems = snap.val();
        });
    }
    
    onBarsClicked(){
        this.showMenu = !this.showMenu;
    }

    onItemClicked(item){
        this.itemSelected.emit(item);
        this.showMenu = false;
    }

    onNrcClicked(){
        this.showMenu = false;
        this.itemSelected.emit('nrc code');
    }
}