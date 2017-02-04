import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {Constants} from "./costants";

@Injectable()
export class DashboardSearchService {

  constructor(
    private constant: Constants,
    private http: Http
  ) {

  }

  getMessageCount(): Observable<number> {
    return Observable.create(observer => {
      this.http.get(this.constant.root_dir + '/api/messageConversations.json?fields=none&paging=true&pageSize=1')
        .map((res: Response) => res.json())
        .subscribe(
          message => {
            observer.next(message.pager.total);
            observer.complete()
          }, error => {
            observer.next(error);
          })
    })
  }
  search(terms: Observable<string>) {
    return terms.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => this.searchEntries(term));
  }

  searchEntries(term) {
     if(term!=''){
       let indicatorSearch=this.http.get('../../../api/indicators.json?fields=name,created,lastUpdated,externalAccess,displayName,id&filter=name:ilike:'+term+'&paging=false').map((res:Response)=>res.json())
       let dataElementSearch=this.http.get('../../../api/dataElements.json?fields=name,created,lastUpdated,externalAccess,displayName,id&filter=name:ilike:'+term+'&paging=false').map((res:Response)=>res.json())
       let dataSetSearch=this.http.get('../../../api/dataSets.json?fields=name,created,lastUpdated,externalAccess,displayName,id&filter=name:ilike:'+term+'&paging=false').map((res:Response)=>res.json())
       let eventDataSearch=this.http.get('../../../api/programs.json?fields=name,created,lastUpdated,externalAccess,displayName,id&filter=name:ilike:'+term+'&paging=false').map((res:Response)=>res.json())
       let programIndicatorSearch=this.http.get('../../../api/programIndicators.json?fields=name,created,lastUpdated,externalAccess,displayName,id&filter=name:ilike:'+term+'&paging=false').map((res:Response)=>res.json())
       return Observable.forkJoin(indicatorSearch,dataElementSearch,dataSetSearch,eventDataSearch,programIndicatorSearch)

         .catch(this.handleError);
     }else{
       let indicatorSearch=this.http.get('../../../api/indicators.json?fields=name,created,lastUpdated,externalAccess,displayName,id&paging=true&pageSize=5').map((res:Response)=>res.json())
       let dataElementSearch=this.http.get('../../../api/dataElements.json?fields=name,created,lastUpdated,externalAccess,displayName,id&&paging=true&pageSize=5').map((res:Response)=>res.json())
       let dataSetSearch=this.http.get('../../../api/dataSets.json?fields=name,created,lastUpdated,externalAccess,displayName,id&&paging=true&pageSize=5').map((res:Response)=>res.json())
       let eventDataSearch=this.http.get('../../../api/programs.json?fields=name,created,lastUpdated,externalAccess,displayName,id&&paging=true&pageSize=5').map((res:Response)=>res.json())
       let programIndicatorSearch=this.http.get('../../../api/programIndicators.json?fields=name,created,lastUpdated,externalAccess,displayName,id&&paging=true&pageSize=5').map((res:Response)=>res.json())
       return Observable.forkJoin(indicatorSearch,dataElementSearch,dataSetSearch,eventDataSearch,programIndicatorSearch)

         .catch(this.handleError);
     }

    // return this.http
    //   .get(this.constant.root_dir + 'api/dashboards/q/' + term + '.json')
    //   .map(res => res.json());
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
