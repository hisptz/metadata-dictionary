import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import {DhisMenuComponent} from "./dhis-menu/ng2-dhis-menu";
import { IndicatorgroupsComponent } from './indicatorgroups/indicatorgroups.component';
import {IndicatorService} from "./shared/indicator.service";
import {Ng2PaginationModule} from "ng2-pagination";
import { SearchPipe } from './shared/search.pipe';
import {Routes, PreloadAllModules, RouterModule} from "@angular/router";
import { IndicatortogroupComponent } from './indicatortogroup/indicatortogroup.component';
import {CanActivateViaIndicators} from "./shared/can-activate-via-indicators";
import { HomeComponent } from './home/home.component';
import {DialogModule} from "primeng/components/dialog/dialog";
import {MetadataDictionaryComponent} from "./metadatadictionarycomponent/metadata-dictionary.component";
import {TabViewModule} from "primeng/components/tabview/tabview";
import {TooltipModule} from "primeng/components/tooltip/tooltip";
import {PanelMenuModule} from "primeng/components/panelmenu/panelmenu";
import {ToolbarModule} from "primeng/components/toolbar/toolbar";

const routes: Routes = [
  { path: '', component: HomeComponent , pathMatch: 'full', children:[
    { path: '', component:IndicatorgroupsComponent},

  ] },
  { path: 'indicators', component:IndicatortogroupComponent},
  { path: 'indicators/:indgroupId', component:IndicatortogroupComponent}
  //{ path: '**',redirectTo: 'IndicatorgroupsComponent' }
]
@NgModule({
  declarations: [
    AppComponent,
    DhisMenuComponent,
    IndicatorgroupsComponent,
    SearchPipe,
    IndicatortogroupComponent,
    HomeComponent,
    MetadataDictionaryComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes, { useHash: true}),
    Ng2PaginationModule,
    DialogModule,
    TabViewModule,
    TooltipModule,
    PanelMenuModule,
    ToolbarModule

  ],
  providers: [IndicatorService,CanActivateViaIndicators],
  bootstrap: [AppComponent]
})
export class AppModule { }
