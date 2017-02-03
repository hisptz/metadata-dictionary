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
    private indicatorGroupsSummary=[];
    private indicatorGroupSetSummary=[];
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
    this.indicatorGroupsSummary=[];
    this.indicatorSummary=[];
    this.indicatorGroupSetSummary=[];
    this.params=false
    this.indicatorDetail=''
    this.indicatorIdentifier='';
  }

  ngOnInit() {
    this.loading=true
    this.indicatorGroupService.loadBothIndicatorGroupsAndGroupSet()
        .subscribe(groupresult=>{
            this.indicatorGroupsSummary=groupresult[1];
            this.indicatorSummary=groupresult[0];
            this.indicatorGroupSetSummary=groupresult[2];
            console.log(this.indicatorGroupsSummary);
            console.log(this.indicatorSummary);
            console.log(this.indicatorGroupSetSummary);
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
