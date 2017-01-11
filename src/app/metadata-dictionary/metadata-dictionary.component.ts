import {Component, OnInit, Input} from '@angular/core';
import {Response, Http} from "@angular/http";

@Component({
  selector: 'app-metadata-dictionary',
  templateUrl: `
  <div class="text-center" *ngIf="showingLoading">
    <div class="row">
      <img [src] ="'../../assets/balls-5.svg'" style="margin-top: 3%; height: 100px; width: 50px"><br>
      <h5>Loading content...please wait</h5>
    </div>
  </div>
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
      <h5 class="alert alert-info">{{indicator.name}} Introduction</h5>
      <p>Is of type <strong>{{indicator.indicatorType.name}}</strong> with numerator description of <strong>{{indicator.numeratorDescription}}</strong> and <span *ngIf="indicator.denominatorDescription!=''">denominator description of <strong>{{indicator.denominatorDescription}} </strong></span> having
      a numerator formula of <strong>({{indicator.numerator}})</strong> and denominator formula of  <strong>{{indicator.denominator}}</strong></p>
      <div *ngIf="indicator.dataSets && indicator.dataSets.length > 0">
       <h5 class="alert alert-info">{{indicator.name}} Sources</h5>
       <p>More than <span class="badge">{{indicator.dataSets.length}}</span> dataset ie <strong *ngFor="let dataset of indicator.dataSets">{{dataset.name}},</strong> use this {{indicator.name}} indicator which was created at <a href="#"  data-toggle="popover" title="Created by {{indicator.object.user?.displayName}}" style="cursor:pointer;background:0 0; color:#41b7d8; text-decoration:none;">{{ indicator.object.created | date }}
       </a> <span *ngIf="indicator.object.indicatorGroups && indicator.object.indicatorGroups.length > 0">and it belongs to <strong *ngFor="let indgroup of indicator.object.indicatorGroups">{{indgroup.name}} Group,</strong></span></p>
       <p *ngFor="let datasource of indicator.dataSets"><strong>{{datasource.name}}</strong> Data set with reporting frequency <strong>{{datasource.periodType }}</strong> which is only ontime when get collected before <b>{{datasource.timelyDays}} days</b> from the previous <small *ngIf="datasource.periodType=='Monthly'">Month</small><small *ngIf="datasource.periodType=='Quarterly'">Quarter</small> <small *ngIf="datasource.indicators && datasource.indicators.length > 0">and it has <strong>{{datasource.indicators.length}} Indicators</strong></small>,<small *ngIf="datasource.dataElements && datasource.dataElements.length > 0">and it has <strong>{{datasource.dataElements.length}} Dataelements</strong></small>
       <small *ngIf="datasource.organisationUnits && datasource.organisationUnits.length > 0">Like <strong>{{datasource.organisationUnits.length}} Health facilities report this form {{datasource.periodType }}</strong></small>
       </p>

      </div>
      </div>
    </div>
  </div>
 </div>
  <!--If data elements-->
 <div class="panel-group" id="accordion2" *ngIf="isDataelements">
  <div class="panel panel-default" *ngFor="let dataelement of dataelements let in = first;">
    <div class="panel-heading">
      <h4 class="panel-title">
        <a data-toggle="collapse" data-parent="#accordion2" href="#{{dataelement.id}}">
         {{dataelement.name}}</a>
      </h4>
    </div>
    <div id="{{dataelement.id}}" class="panel-collapse collapse" [ngClass]="{ in: in }">
      <div class="panel-body">
      <h5 class="alert alert-info"> {{dataelement.name}} Introduction</h5>
      <p> This {{dataelement.name}} of this method of data aggregation <strong>{{dataelement.aggregationType}}</strong> created at <a class="text-success" title="Created by ">{{dataelement.created| date}}</a> is only taking <strong>{{dataelement.domainType}}</strong> data.As the culture of helping user not enntering unregnonized data,there fore its only taking <strong>{{dataelement.valueType}}</strong> values from the user input</p>
      <p *ngIf="dataelement.categoryCombo.name!='default'"><strong>{{dataelement.name}}</strong> consists of <strong>{{dataelement.categoryCombo.name}}</strong> category combitions of <strong *ngFor="let cat of dataelement.categoryCombo.categories let i = index">(<span class="text-success" *ngFor="let catoptions of cat.categoryOptions let j = index">{{catoptions.name}},</span>) of the {{cat.name}} Category, </strong></p>
      
      <div *ngIf="dataelement.dataSets && dataelement.dataSets.length > 0">
       <h5 class="alert alert-info">{{dataelement.name}} Sources</h5>
       <p>More than <span class="badge">{{dataelement.dataSets.length}}</span> dataset ie <strong *ngFor="let dataset of dataelement.dataSets">{{dataset.name}},</strong> use this {{dataelement.name}} Data Element 
       <span *ngIf="dataelement.dataElementGroups && dataelement.dataElementGroups.length > 0">and it belongs to <strong *ngFor="let datgroup of dataelement.dataElementGroups">{{datgroup.name}} Group,</strong></span></p>
       <p *ngFor="let datasource of dataelement.dataSets"><strong>{{datasource.name}}</strong> Data set with reporting frequency <strong>{{datasource.periodType }}</strong> which is only ontime when get collected before <b>{{datasource.timelyDays}} days</b> from the previous <small *ngIf="datasource.periodType=='Monthly'">Month</small><small *ngIf="datasource.periodType=='Quarterly'">Quarter</small> <small *ngIf="datasource.indicators && datasource.indicators.length > 0">and it has <strong>{{datasource.indicators.length}} Indicators</strong></small>,<small *ngIf="datasource.dataElements && datasource.dataElements.length > 0">and it has <strong>{{datasource.dataElements.length}} Dataelements</strong></small>
       <small *ngIf="datasource.organisationUnits && datasource.organisationUnits.length > 0">Like <strong>{{datasource.organisationUnits.length}} Health facilities report this form {{datasource.periodType }}</strong></small>
       </p>

      </div>
      </div>
    </div>
  </div>
 </div>
 <!--If dataset-->
  <div class="panel-group" id="accordion3" *ngIf="isDataset">
  <div class="panel panel-default" *ngFor="let dataset of datasets let in = first;">
    <div class="panel-heading">
      <h4 class="panel-title">
        <a data-toggle="collapse" data-parent="#accordion3" href="#{{dataset.id}}">
         {{dataset.name}}</a>
      </h4>
    </div>
    <div id="{{dataset.id}}" class="panel-collapse collapse" [ngClass]="{ in: in }">
      <div class="panel-body">
      <h5 class="alert alert-info">{{dataset.name}} Introduction</h5>
      <p>{{dataset.name}} of the <strong>{{dataset.formType}}</strong> Form created at <a class="text-success" title="Created by {{dataset.user.name}}">{{dataset.created| date}}</a> <span *ngIf="dataset.categoryCombo.name!='default'"><strong>{{dataset.categoryCombo.name}}</strong></span></p>
      <p><strong>{{dataset.name}}</strong> Data set with reporting frequency <strong>{{dataset.periodType }}</strong> which is only ontime when get collected before <b>{{dataset.timelyDays}} days</b> from the previous <small *ngIf="dataset.periodType=='Monthly'">Month</small><small *ngIf="dataset.periodType=='Quarterly'">Quarter</small> <small *ngIf="dataset.indicators && dataset.indicators.length > 0">and it has <strong>{{dataset.indicators.length}} Indicators</strong></small>,<small *ngIf="dataset.dataElements && dataset.dataElements.length > 0">and it has <strong>{{dataset.dataElements.length}} Dataelements</strong></small>
       <small *ngIf="dataset.organisationUnits && dataset.organisationUnits.length > 0">Like <strong>{{dataset.organisationUnits.length}} Health facilities report this form {{dataset.periodType }}</strong></small>
     </p>
      </div>
    </div>
  </div>
 </div>
  `,
  styleUrls: [`
       a:active,a:hover,a:focus{
         text-decoration:none !important
        }
      `]
})
export class MetadataDictionaryComponent implements OnInit {
  private indicators=[];
  private dataelements=[];
  private datasets=[];
  private isIndicator=false;
  private isDataelements=false;
  private isDataset=false;
  private showingLoading:boolean=false;
  @Input() metadataidentifiers:string;

  constructor(private http:Http) {
    this.indicators=[];
    this.dataelements=[];
    this.datasets=[];
  }

  ngOnInit() {
    //console.log(this.metadataidentifiers);
    const uid=this.metadataidentifiers;
    this.displayDetail(uid)

  }
  displayDetail(uid){
    this.showingLoading=true;
    var self=this.http;
    this.metadataFromAnalyticsLink(uid).forEach(value => {
      self.get('../../../api/identifiableObjects/'+value+'.json')
        .map((response:Response)=>response.json())
        .subscribe(data=>{
          const metadataLink=data.href;
          if (metadataLink.indexOf("indicators")>=1){

            const indicatorUrl=metadataLink+'.json?fields=:all,user[:all],indicatorGroups[:all],displayName,id,name,numeratorDescription,denominatorDescription,denominator,numerator,indicatorType[id,name],dataSets[:all]';
            self.get(indicatorUrl)
              .subscribe((data:Response)=>{
                  let indicatorObject=data.json();
                  self.get('../../../api/expressions/description?expression='+encodeURIComponent(data.json().numerator))
                    .subscribe((numExp:Response)=>{
                        let  numerator=numExp.json().description;
                        self.get('../../../api/expressions/description?expression='+encodeURIComponent(data.json().denominator))
                          .subscribe((denoExp:Response)=>{
                            let denominator=denoExp.json().description;
                            this.indicators.push({object:indicatorObject,name:indicatorObject.name,uid:indicatorObject.id,denominatorDescription:indicatorObject.denominatorDescription,numeratorDescription:indicatorObject.numeratorDescription,numerator:numerator,denominator:denominator,indicatorType:indicatorObject.indicatorType,dataSets:indicatorObject.dataSets,numeratorForm:indicatorObject.numerator,demonitorForm:indicatorObject.denominator});
                            //=indicators
                            console.log(this.indicators)// It brings undefined
                          })
                        this.showingLoading=false;
                      }
                    )

                }

              )
            this.isIndicator=true
          }else if(metadataLink.indexOf("dataElements")>=1){
            const dataelementUrl=metadataLink+'.json?fields=:all,id,name,aggregationType,displayName,categoryCombo[id,name,categories[id,name,categoryOptions[id,name]]],dataSets[:all,!compulsoryDataElementOperands]'
            self.get(dataelementUrl)
              .subscribe((dataelement:Response)=>{
                this.dataelements.push(dataelement.json());
                console.log(this.dataelements)// It brings undefined
              })
            this.isDataelements=true;
          }else if(metadataLink.indexOf("dataSets")>=1){
            const datasetUrl=metadataLink+'.json?fields=:all,user[:all],id,name,periodType,shortName,categoryCombo[id,name,categories[id,name,categoryOptions[id,name]]]'
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
