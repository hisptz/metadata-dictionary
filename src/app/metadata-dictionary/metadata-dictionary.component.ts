import { Component, OnInit } from '@angular/core';
import {Response, Http} from "@angular/http";

@Component({
  selector: 'app-metadata-dictionary',
  templateUrl: `
 <!--If indicators-->
 <div class="panel-group" id="accordion" *ngIf="isIndicator">
  <div class="panel panel-default" *ngFor="let indicator of indicators let in = first;">
    <div class="panel-heading">
      <h4 class="panel-title">
        <a data-toggle="collapse" data-parent="#accordion" href="#{{indicator.uid}}">
         {{indicator.name}}</a>
      </h4>
    </div>
    <div id="{{indicator.uid}}" class="panel-collapse collapse" [ngClass]="{ in: in }">
      <div class="panel-body">
      <p><b>Description:</b> {{indicator.name}}</p>
      <p><b>Indicator Type:</b> {{indicator.indicatorType.name}}</p>
      <p><b>Numerator:</b> <u>{{indicator.numeratorDescription}}</u></p>
      <p>{{indicator.numerator}}</p>
      <p><b>Denominator:</b> <u>{{indicator.denominatorDescription}}</u></p>
      <p>{{indicator.denominator}}</p>
      <div *ngIf="indicator.dataSets && indicator.dataSets.length > 0">
      <p><b>Data Set</b></p>
      <p *ngFor="let dataset of indicator.dataSets">
        {{dataset.name}} <span class="tooltip">({{dataset.periodType}})</span> 
      </p>
      </div>
      </div>
    </div>
  </div>
 </div>
  <!--If data elements-->
 <div class="panel-group" id="accordion2" *ngIf="isDataelements">
  <div class="panel panel-default" *ngFor="let dataelement of dataelements">
    <div class="panel-heading">
      <h4 class="panel-title">
        <a data-toggle="collapse" data-parent="#accordion2" href="#{{dataelement.id}}">
         {{dataelement.name}}</a>
      </h4>
    </div>
    <div id="{{dataelement.id}}" class="panel-collapse collapse">
      <div class="panel-body">
      <p><b>Description:</b> {{dataelement.name}}</p>
      <p><b>Aggregation Type:</b> {{dataelement.aggregationType}}</p>
      <p><b>Category Combination:</b> <u>{{dataelement.categoryCombo.name}}</u></p>
      <u>Categories:</u>
      <ul class="list-unstyled">
      <li *ngFor="let cat of dataelement.categoryCombo.categories let i = index">Category#{{i+1}}:{{cat.name}}
          <dl class="dl-horizontal" *ngFor="let catoptions of cat.categoryOptions let j = index">
            <dt><u>Option#{{j+1}}</u></dt>
            <dd>{{catoptions.name}}</dd>
          </dl>
      </li>
      </ul>
      <div *ngIf="dataelement.dataSets && dataelement.dataSets.length > 0">
      <p><b>Data Sets</b></p>
      <p *ngFor="let dataset of dataelement.dataSets">
        {{dataset.name}} <span class="tooltip">({{dataset.periodType}})</span> 
      </p>
      </div>
      </div>
    </div>
  </div>
 </div>
 <!--If dataset-->
  <div class="panel-group" id="accordion3" *ngIf="isDataset">
  <div class="panel panel-default" *ngFor="let dataset of datasets">
    <div class="panel-heading">
      <h4 class="panel-title">
        <a data-toggle="collapse" data-parent="#accordion3" href="#{{dataset.id}}">
         {{dataset.name}}</a>
      </h4>
    </div>
    <div id="{{dataset.id}}" class="panel-collapse collapse">
      <div class="panel-body">
      <p><b>Description:</b> {{dataset.name}}</p>
      <p><b>Period Type:</b> {{dataset.periodType}}</p>
      <p><b>Category Combination:</b> <u>{{dataset.categoryCombo.name}}</u></p>
      <u>Categories:</u>
      <ul class="list-unstyled">
      <li *ngFor="let cat of dataset.categoryCombo.categories let i = index">Category#{{i+1}}:{{cat.name}}
          <dl class="dl-horizontal" *ngFor="let catoptions of cat.categoryOptions let j = index">
            <dt><u>Option#{{j+1}}</u></dt>
            <dd>{{catoptions.name}}</dd>
          </dl>
      </li>
      </ul>
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
  private isIndicator=false;
  private isDataelements=false;
  private isDataset=false;

  constructor(private http:Http) {
    this.indicators=[];
    this.dataelements=[];
    this.datasets=[];
  }

  ngOnInit() {
    const uid='UbnP1Kth7oJ;hk8DwZuW4Ay;tl85FnvL8do;Q7zFIIoqCdI;zeEp4Xu2GOm;GzvLb3XVZbR';
    this.displayDetail(uid)

  }
  displayDetail(uid){
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
            const dataelementUrl=metadataLink+'.json?fields=id,name,aggregationType,displayName,categoryCombo[id,name,categories[id,name,categoryOptions[id,name]]],dataSets[id,name,periodType]'
            self.get(dataelementUrl)
              .subscribe((dataelement:Response)=>{
                this.dataelements.push(dataelement.json());
                console.log(this.dataelements)// It brings undefined
              })
            this.isDataelements=true;
          }else if(metadataLink.indexOf("dataSets")>=1){
            const datasetUrl=metadataLink+'.json?fields=id,name,periodType,shortName,categoryCombo[id,name,categories[id,name,categoryOptions[id,name]]]'
            self.get(datasetUrl)
              .subscribe((dataset:Response)=>{
                this.datasets.push(dataset.json())
                console.log(this.datasets)// It brings undefined
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
