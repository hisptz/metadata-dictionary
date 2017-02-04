import { Component, OnInit } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {isObject} from "util";
import {ActivatedRoute} from "@angular/router";
import {DashboardSearchService} from "../shared/dashboard-search.service";

@Component({
  selector: 'app-dashboard-item-search',
  templateUrl: './dashboard-item-search.component.html',
  styleUrls: ['./dashboard-item-search.component.css']
})
export class DashboardItemSearchComponent implements OnInit {

  showBody; boolean;
  searchTerm$ = new Subject<string>();
  results: any;
  headers: Array<any>;
  messageCount: number;
  indicators=[];
  dataset=[];
  dataelements=[];
  eventdata=[];
  programdata=[];
  totalCount:number
  overallcontainer={
    indicatorsCount:0,
    dataSetsCount:0,
    programIndicatorsCount:0,
    dataElementsCount:0,
    eventDataCount:0,
    searchCount:0,
    indicators:[],
    dataElements:[],
    dataSets:[],
    eventData:[],
    programIndicators:[]
  }
  constructor(
    private searchService: DashboardSearchService,
    private route: ActivatedRoute,
  ) {
    this.showBody = false;
    this.headers = [];
    this.messageCount = 0;
  }

  ngOnInit() {

    // this.searchService.getMessageCount().subscribe(count => {
    //   console.log(count)
    // });
    this.searchTerm$.subscribe(terms => {
      if(terms.match(/^[mM]/)) {
        this.searchService.getMessageCount()
          .subscribe(count => {
            this.messageCount = count;
          })
      } else {
        this.messageCount = 0;
      }
    })
    this.searchService.search(this.searchTerm$)
      .subscribe(results => {

        this.totalCount=parseInt(results[0].indicators.length) + parseInt(results[1].dataElements.length)+parseInt(results[2].dataSets.length)+parseInt(results[3].programs.length)+parseInt(results[4].programIndicators.length)
        this.overallcontainer.indicatorsCount=parseInt(results[0].indicators.length);
        this.overallcontainer.dataElementsCount=parseInt(results[1].dataElements.length);
        this.overallcontainer.dataSetsCount=parseInt(results[2].dataSets.length);
        this.overallcontainer.eventDataCount=parseInt(results[3].programs.length);
        this.overallcontainer.programIndicatorsCount=parseInt(results[4].programIndicators.length);
        this.overallcontainer.searchCount=this.totalCount;
        this.overallcontainer.indicators=results[0].indicators
        this.overallcontainer.dataElements=results[1].dataElements
        this.overallcontainer.dataSets=results[2].dataSets
        this.overallcontainer.eventData=results[3].programs
        this.overallcontainer.programIndicators=results[4].programIndicators
        this.results = this.overallcontainer;
        //console.log(this.overallcontainer);
        this.headers = this.getResultHeaders(this.overallcontainer);
        //console.log(this.headers);
        this.showBody = true;
      });
  }

  getResultHeaders(results): Array<any> {
    let headers = [];
    if(this.headers.length > 0) {
      Object.keys(results).map(key => {
        if(isObject(results[key])) {
          let showBlockStatus = true;
          for(let header of this.headers) {
            if(header.name == key) {
              showBlockStatus = header.showBlock
              break;
            }
          }
          headers.push({name: key, count: results[key.slice(0, key.length-1) + 'Count'], showBlock: showBlockStatus})
        }
      });
    } else {
      Object.keys(results).map(key => {
        if(isObject(results[key])) {
          headers.push({name: key, count: results[key.slice(0, key.length-1) + 'Count'], showBlock: true})
        }
      });
    }
    return headers;
  }

  getIcon(name): string {
    let icon = '';
    if(name == 'users') {
      icon = 'user'
    } else if(name == 'charts' || name == 'eventCharts') {
      icon = 'line-chart'
    } else {
      icon = 'table'
    }
    return icon
  }

  toggleBlock(name, showStatus) {
    for(let header of this.headers) {
      if(header.name == name) {
        header.showBlock = !showStatus;
      }
    }
  }



  isPlural(type):boolean {
    //@todo find the best way to deal with plural form items
    let plural = false;
    let pluralTypes = ['indicators','program','resources'];
    for (let itemType of pluralTypes) {
        if(itemType == type){
          plural = true;
          break;
        }
    }
    return plural
  }

}
