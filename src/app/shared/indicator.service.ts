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
      let indicators=this.http.get('../../../api/indicators.json?fields=id,name,numerator,denominator,indicatorType[name],denominatorDescription,numeratorDescription,user[name],lastUpdated&paging=true&pageSize=4').map((res:Response)=>res.json())
      let indicatorGroups=this.http.get('../../../api/indicatorGroups.json?fields=created,user[id,name],id,name,indicators[id,name,numerator,denominator,indicatorType[name],denominatorDescription,numeratorDescription,user[name],lastUpdated]&paging=true&pageSize=4').map((res:Response)=>res.json())
      let indicatorGroupSet=this.http.get('../../../api/indicatorGroupSets.json?fields=id,created,lastUpdated,name,indicatorGroups[id,name]&paging=true&pageSize=4').map((res:Response)=>res.json())
   return Observable.forkJoin(indicators,indicatorGroups,indicatorGroupSet)
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
