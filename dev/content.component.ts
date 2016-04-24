import {Component} from 'angular2/core';
import {tryCatch} from "rxjs/util/tryCatch";

@Component({
    selector: 'content',
    template: `
    <div class="container">
        <hr id="top">
        <br>
        <h2>{{menuItemName}}</h2>
        <a class="content-list" 
           *ngFor="#content1 of contents; #ind = index" 
           href="#ind{{ind}}">
           <span class="fa fa-rocket"></span> {{content1.title}}
        </a>
        <div *ngFor="#content of contents; #i = index">
            <hr id="ind{{i}}"><br>
            <h4>{{content.title}}</h4>
            <div class="content-text">{{content.text}}</div>
            <pre *ngIf="content.code">
                <code class="prettyprint" [id]=i ></code>
            </pre>
            <div style="width: 100%"> 
                <a href="#top" class="back-2-top"><span class="fa fa-angle-up fa-lg"></span></a>
            </div> 
        </div>
        <h5 (click)="onAddContentClick()" *ngIf="isAdmin" style="cursor: pointer">
            <span *ngIf="!showAddContent" class="fa fa-angle-double-right"></span>
            <span *ngIf="showAddContent" class="fa fa-angle-double-down"></span>
        add content
        </h5>
        <form *ngIf="showAddContent" 
               #f="ngForm" (ngSubmit)="onSubmit(f.value)"> 
            <label>Title: 
            <input type="text" ngControl="title" class="add"></label>
            <label>Content:<br>
                <textarea ngControl="text" cols="30" rows="10" class="add"></textarea>
            </label>
            <label>Code:<br>
                <textarea ngControl="code" cols="30" rows="10" class="add"></textarea>
            </label>
            <input type="submit" class="add button-primary" value="Add">
        </form>
        <!--<h6>{{data}}</h6>-->
    </div>
    <div class="footer"> 
        <div> {nrc code} All contents of this site are under MIT license.</div>
        <div> Code styling comes from google-code-prettify.</div>
        <div> Symbols come from Font Awesome Icons.</div>
        <div> Global styling comes from Skeleton css.</div>
        <span> If you wish you can contact me at my </span>
        <a href="mailto:info@nrccode.com">e-mail</a>
        <span class="fa fa-send"></span>
    </div>
    `,
    inputs:['menuItemName', 'contents', 'isAdmin'],
})
export class ContentComponent {
    showAddContent:boolean = false;
    data:string;
    menuItemName:string;
    contents:any;
    isAdmin:boolean;

    onAddContentClick(){
        this.showAddContent = !this.showAddContent;
    }

    onSubmit(content){
        var ref = new Firebase('https://nrccode.firebaseio.com/'+
        this.menuItemName.replace(' ','-'));

        content.menuitem = this.menuItemName;
        var newRef = ref.push();
        content.key = newRef.toString();
        newRef.set(content);
        this.data = JSON.stringify(content);
        this.showAddContent = false;
    }

    ngOnChanges(){

        setTimeout(()=>(this.timeOutAction()), 100);
    }

    timeOutAction(){
        if(this.contents.length !== 0){
            for(var f=0; f<this.contents.length;f++){
                if(this.contents[f].code) {
                    document.getElementById(f).
                        innerHTML = prettyPrintOne(this.contents[f].code);
                }
            }
        } else {
            setTimeout(()=>(this.timeOutAction()), 100);
        }
    }
}