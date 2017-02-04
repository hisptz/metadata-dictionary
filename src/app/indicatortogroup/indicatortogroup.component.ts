import {Component, OnInit, ViewChild, SimpleChange, Input} from '@angular/core';
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

  private subscription :Subscription;
  private metadataUid:string
  constructor(private route:ActivatedRoute,private router:Router,private indicatorService:IndicatorService) {

  }
  ngOnInit() {
     this.subscription=this.route.params.subscribe(
       (params:any)=>{
         this.metadataUid=params['metadataid'];
         console.log(this.metadataUid);
       })
  }
}
