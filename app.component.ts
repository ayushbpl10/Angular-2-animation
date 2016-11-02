import { Component } from '@angular/core';
import { DomSanitizer,SafeStyle} from '@angular/platform-browser';

declare const $:any; 
@Component({
    selector: 'my-app',
    template: `

    <div id="sticky1" [style]="trustedStyle" (click)="onclick(1)">Click Me</div> <!-- Circles that move and fade -->

    <div id="sticky2" [style]="trustedStyle" (click)="onclick(2)">Click Me</div> <!-- Circles that move and fade -->


    <div id="region">Region</div>

    `,

    styles: [`

    #region {
        position: absolute;
        top: 0px;
        text-align: center;
        left: 500px;
        width: 300px;
        height: 500px;
        border: solid 2px;
    }

    `]
    
})
export class AppComponent { 

    public dangerousStyle: string;
    public trustedStyle: any;
    constructor(private sanitizer: DomSanitizer){
    this.dangerousStyle = `
                                width: 100px;
                                height: 100px;
                                margin: 5px 5px;
                                padding: 2px;
                                cursor: pointer;
                                text-align: center; 
                                background: #000; 
                                border-radius:50%; 
                                font-size: 22px; 
                                line-height: 100px; 
                                color: #fff;
                            `;
                            
    this.trustedStyle = sanitizer.bypassSecurityTrustStyle(this.dangerousStyle);

    }


    onclick(value: number){

                    var sticky = $('#sticky'+value); //specifying the sticky id with value. eg: sticky1

                    var exact_offset_left = sticky.offset().left;//calculate the position of sticky/original element from left
                    var exact_offset_top = sticky.offset().top;//calculate the position of the sticky/original element from top

                    var offset_left = $('#region').offset().left;//calculate the position of region from left

                    var div = $("#sticky"+value).clone().appendTo("body");//add the element in the body
                    div.css('position','absolute');//set the position to absolute to overlap
                    div.offset({top:exact_offset_top,left:exact_offset_left}); //calculate the position of the clone
                        
                    setTimeout(()=>{
                            div.offset({left:offset_left});//move the element till region
                            div.css('opacity','0');//fade the element while moving
                            div.css({transition : "left 3s ease-in-out, opacity 4s"});//move the element from original position to till region
                    },10);                   

                        setTimeout(()=>{
                            div.remove();//remove the dynamic element
                        },4000);
                        console.log('animater');//print in console
          
    }
  
 
}
