import {CanActivate, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {Subscription} from "rxjs";

@Injectable()
export class CanActivateViaIndicators implements CanActivate {
  private subscription :Subscription
  constructor(private router:Router,private routes:ActivatedRoute) {}
  canActivate() {
    console.log('#canActivate called');
    return true;
  }



}

