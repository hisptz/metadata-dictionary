import { Component, OnInit } from '@angular/core';
import {Response, Http} from "@angular/http";

@Component({
  selector: 'app-metadata-dictionary',
  templateUrl: `
 <div class="panel-group" id="accordion">
  <div class="panel panel-default" *ngFor="let indicator of indicators">
    <div class="panel-heading">
      <h4 class="panel-title">
        <a data-toggle="collapse" data-parent="#accordion" href="#{{indicator.uid}}">
        C{{indicator.name}}</a>
      </h4>
    </div>
    <div id="{{indicator.uid}}" class="panel-collapse collapse">
      <div class="panel-body">
      <p><b>Description:</b> {{indicator.name}}</p>
      <p><b>Indicator Type:</b> {{indicator.indicatorType.name}}</p>
      <p><b>Numerator:</b> <u>{{indicator.numeratorDescription}}</u></p>
      <p>{{indicator.numerator}}</p>
      <p><b>Denominator:</b> <u>{{indicator.denominatorDescription}}</u></p>
      <p>{{indicator.denominator}}</p>
      <p><b>Data Set</b></p>
      <p *ngFor="let dataset of indicator.dataSets">
        {{dataset.name}} <span class="tooltip">({{dataset.periodType}})</span> 
      </p>
      </div>
    </div>
  </div>
 </div>
  `,
  styleUrls: [`

     `]
})
export class MetadataDictionaryComponent implements OnInit {
  private indicators=[];
  private dataelements=[];
  private datasets=[];
  private isIndicator:boolean=false;
  private isDataelements:boolean=false;
  private isDataset:boolean=false;

  constructor(private http:Http) {
    this.indicators=[];
    this.dataelements=[];
    this.datasets=[];
  }

  ngOnInit() {
    const uid='UbnP1Kth7oJ;hk8DwZuW4Ay;m5WIYYiOtSp';
    var self=this.http;
    this.metadataFromAnalyticsLink(uid).forEach(value => {
       self.get('../../../api/identifiableObjects/'+value+'.json')
         .map((response:Response)=>response.json())
         .subscribe(data=>{
           const metadataLink=data.href;
           if (metadataLink.indexOf("indicators")>=1){

             const indicatorUrl=metadataLink+'.json?fields=displayName,id,name,numeratorDescription,denominatorDescription,denominator,numerator,indicatorType[id,name],dataSets[id,name,periodType]';
             self.get(indicatorUrl)
               .subscribe((data:Response)=>{
                   let indicatorObject=data.json();
                   self.get('../../../api/expressions/description?expression='+encodeURIComponent(data.json().numerator))
                     .subscribe((numExp:Response)=>{
                      let  numerator=numExp.json().description;
                      self.get('../../../api/expressions/description?expression='+encodeURIComponent(data.json().denominator))
                          .subscribe((denoExp:Response)=>{
                        let denominator=denoExp.json().description;
                            this.indicators.push({name:indicatorObject.name,uid:indicatorObject.id,denominatorDescription:indicatorObject.denominatorDescription,numeratorDescription:indicatorObject.numeratorDescription,numerator:numerator,denominator:denominator,indicatorType:indicatorObject.indicatorType,dataSets:indicatorObject.dataSets,numeratorForm:indicatorObject.numerator,demonitorForm:indicatorObject.denominator});
                             //=indicators
                            console.log(this.indicators)// It brings undefined
                      })
                       //Here you do yor stuff.
                       //console.log(numExp.json())
                     }
                   )

                 }

               )
             this.isIndicator=true
            }else if(metadataLink.indexOf("dataElements")>=1){
              const dataelementUrl=metadataLink+'.json?id,name,aggregationType,displayName,categoryCombo[id,name,categories[id,name,categoryOptions[id,name]]],dataSets[id,name,periodType]'
              self.get(dataelementUrl)
                .subscribe((dataelement:Response)=>{
                   this.dataelements.push(dataelement.json());
                 })
             this.isDataelements=true;
            }else if(metadataLink.indexOf("dataSets")>=1){
                 const datasetUrl=metadataLink+'.json?fields=id,name,periodType,shortName,categoryCombo[id,name,categories[id,name,categoryOptions[id,name]]]'
                 self.get(datasetUrl)
                   .subscribe((dataset:Response)=>{
                     this.datasets.push(dataset.json())
                   })
             this.isDataset=true;
             }

             })
          })

  }
  metadataFromAnalyticsLink(dx){
    var separatedx=[]
    if(dx.indexOf(';')>=1){
      separatedx=dx.split(';')
    }else{
      separatedx.push(dx);
    }
    return separatedx;

  }
}
