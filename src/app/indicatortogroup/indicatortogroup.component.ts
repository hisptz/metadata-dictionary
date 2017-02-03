import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {IndicatorService} from "../shared/indicator.service";
import {error} from "util";

@Component({
  selector: 'app-indicatortogroup',
  templateUrl: './indicatortogroup.component.html',
  styleUrls: ['./indicatortogroup.component.css']
})
export class IndicatortogroupComponent implements OnInit {
  search = "";
  myList = 'grid';
  defaultClass='col-sm-12'
 actvalteLink:string
  breadCrum:boolean
  indicatorNameInList:string
  defaultClassWhenActivated:string
  private showloading:boolean
  private indicators=[];
  private message:string;
  private indicatorIdentifier:string
  private indicatorDetail:string
  private indicatorName:string
  displayIndicator: boolean = false;
  private subscription :Subscription
  constructor(private route:ActivatedRoute,private router:Router,private indicatorService:IndicatorService) {
    this.indicators=[];
    this.message='';
    this.indicatorDetail=''
    this.indicatorIdentifier='';
    this.indicatorName='',
    this.actvalteLink=''
  }
  @ViewChild('actvaltedLink') MetadataDictionaryComponent;
  ngOnInit() {
    this.showloading=true
    this.subscription=this.indicatorService.loadAllIndicators()
            .subscribe(indicators=>{
                this.indicators=indicators.indicators
                console.log(indicators)
              },
              error=>{
                this.message='Somethings is wrong but is getting fixed soon'
              },
              ()=>{
                this.showloading=false;
              }
            )




  }

  viewIndicatorDetail(indUid,name,info){
    this.indicatorName=name
    this.indicatorDetail=info
    this.indicatorIdentifier=indUid;
    console.log(indUid);
    this.displayIndicator = true;
  }
  cancelDialog(){
    this.displayIndicator = false;
    this.indicatorDetail='';
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  indicatorDetailsinList(indUid,name,info){
    this.breadCrum=true;
    this.indicatorDetail=info
    this.indicatorNameInList=name;
    this.myList='order';
    this.actvalteLink=indUid
    this.router.navigate(["/indicators",indUid])
    this.defaultClass='col-sm-6'
    this.defaultClassWhenActivated='col-sm-6'
    console.log(this.actvalteLink);
  }
  getUrlParameter(){
    this.subscription=this.route.params.subscribe(
      (params)=>{
        if(params.hasOwnProperty('indgroupId')){
          this.myList='order';
          this.defaultClass='col-sm-6'
          this.breadCrum=true;
          console.log(params['indgroupId']);
        }
      })
  }
}
