import { Component, OnInit } from '@angular/core';
import {IndicatorService} from "../shared/indicator.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {error} from "util";
import {MenuItem} from "primeng/components/common/api";

@Component({
  selector: 'app-indicatorgroups',
  templateUrl: './indicatorgroups.component.html',
  styleUrls: ['./indicatorgroups.component.css']
})
export class IndicatorgroupsComponent implements OnInit {
    private indicatorName:string
    search = "";
    private loading:boolean;
    private indicatorGroups=[];
    private dataElementSummary=[];
    private eventDataSummary=[];
    private programIndicatorSummary=[];
    private dataSetSummary=[];
    private indicatorSummary=[];
    private params:boolean;
    display: boolean = false;
    private indicatorIdentifier:string
    private indicatorDetail:string
    private items: MenuItem[];
  private subscription :Subscription
  constructor(private indicatorGroupService:IndicatorService,private route:ActivatedRoute,private router:Router) {
    this.loading=false
    this.indicatorName=''
    this.indicatorGroups=[];
    this.dataElementSummary=[];
    this.indicatorSummary=[];
    this.dataSetSummary=[];
    this.eventDataSummary=[];
    this.programIndicatorSummary=[];
    this.params=false
    this.indicatorDetail=''
    this.indicatorIdentifier='';
  }

  ngOnInit() {
    this.loading=true
    this.indicatorGroupService.loadBothIndicatorGroupsAndGroupSet()
        .subscribe(groupresult=>{
            this.dataElementSummary=groupresult[1];
            this.indicatorSummary=groupresult[0];
            this.dataSetSummary=groupresult[2];
            this.eventDataSummary=groupresult[3];
            this.programIndicatorSummary=groupresult[4];
        },
        error=>{
            console.log("Something wrong need to be fixed");
        },

        ()=>{
            this.loading=false
        })
  }
  initHomeLoad(){

  }
  loadIndicatorGroup(){
      this.indicatorGroupService.allIndicatorGroups()
          .subscribe(indicator=>{
              this.indicatorGroups=indicator.indicatorGroups
              this.loading=false
          })
  }
  getUrlParameter(){
    this.subscription=this.route.params.subscribe(
      (params:any)=>{
        if(params.hasOwnProperty('indgroupId')){
          this.params=true;
        }

      }
    )
  }
    loadAllIndicators(){
    this.params=true
    this.router.navigate(["/indicators"])
  }
    indicatorToDetail(indUid,name,info){
        this.indicatorName=name
        this.indicatorDetail=info
        this.indicatorIdentifier=indUid;
        console.log(indUid);
        this.display = true;
    }
    cancelDialog(){
        this.display = false;
        this.indicatorDetail='';
    }
}
