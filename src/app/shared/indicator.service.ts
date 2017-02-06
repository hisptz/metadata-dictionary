import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()
export class IndicatorService {

  constructor(private http:Http) { }
  // Getting all indicator groups that exists
  allIndicatorGroups(){
    const indGroupUrl='../../../api/indicatorGroups.json?fields=created,user[id,name],id,name,indicators[id,name,numerator,denominator,indicatorType[name],denominatorDescription,numeratorDescription,user[name],lastUpdated]&paging=false';
    return this.http.get(indGroupUrl)
      .map((indicatorObject:Response)=>indicatorObject.json())
      .catch(this.handleError)
  }
  //Get all indicators
  loadAllIndicators(){
    const indicatorUrl='../../../api/indicators.json?fields=id,name,numerator,denominator,indicatorType[name],denominatorDescription,numeratorDescription,user[name],lastUpdated&paging=false';
    return this.http.get(indicatorUrl)
      .map((indicators:Response)=>indicators.json())
      .catch(this.handleError)
  }
  // Get both,indicators,group and groupset
  loadBothIndicatorGroupsAndGroupSet(){
      let indicators=this.http.get('../../../api/indicators.json?paging=true&pageSize=4').map((res:Response)=>res.json())
      let dataElements=this.http.get('../../../api/dataElements.json?paging=true&pageSize=4').map((res:Response)=>res.json())
      let dataSets=this.http.get('../../../api/dataSets.json?paging=true&pageSize=4').map((res:Response)=>res.json())
      let eventData=this.http.get('../../../api/programs.json?paging=true&pageSize=4').map((res:Response)=>res.json())
      let programIndicator=this.http.get('../../../api/programIndicators.json?paging=true&pageSize=4').map((res:Response)=>res.json())
   return Observable.forkJoin(indicators,dataElements,dataSets,eventData,programIndicator)
       .catch(this.handleError)
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
