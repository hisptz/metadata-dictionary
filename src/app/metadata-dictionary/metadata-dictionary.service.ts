import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";

export interface indicators {
  name:string
  uid : string;
  denominatorDescription:string;
  numeratorDescription:string;
  numerator:string;
  denominator:string;
  indicatorType:string;
  dataSets: any;
  numeratorForm:string;
  demonitorForm:string;

}

@Injectable()
export class MetadataDictionaryService {
  _indicators:indicators[]

  constructor(private http:Http) { }

  identifyMetadataByuid(metadataUid){
      return this.http.get('../../../api/identifiableObjects/'+metadataUid+'.json')
        .map((response:Response)=>response.json())
        .catch(this.HandleError)

   }
   separateMetadataWithIndicatorAndDataElement(identifiedObject){
      const metadataLink=identifiedObject.href;
      var indicators=[];
       if (metadataLink.indexOf("indicators")>=1){
          const indicatorUrl=metadataLink+'.json?fields=displayName,id,name,numeratorDescription,denominatorDescription,denominator,numerator,indicatorType[id,name],dataSets[id,name,periodType]';
          this.http.get(indicatorUrl)
            .map((data:Response)=>console.log(data.json())

            )
       }
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
  private HandleError(error:any){
    console.log(error);
    return Observable.throw(error.json())
  }

}
