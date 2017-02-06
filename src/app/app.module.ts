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
import {Ng2HighchartsModule} from "ng2-highcharts";
import {ChartModule} from "angular2-highcharts";
import {Routes, PreloadAllModules, RouterModule} from "@angular/router";
import { IndicatortogroupComponent } from './indicatortogroup/indicatortogroup.component';
import {CanActivateViaIndicators} from "./shared/can-activate-via-indicators";
import { HomeComponent } from './home/home.component';
import {MetadataDictionaryComponent} from "./metadatadictionarycomponent/metadata-dictionary.component";
import {Constants} from "./shared/costants";
import {DashboardItemSearchComponent} from "./dashboard-item-search/dashboard-item-search.component";
import {DashboardSearchService} from "./shared/dashboard-search.service";
import {ReadableNamePipe} from "./shared/pipes/readable-name.pipe";
import {TruncatePipe} from "./shared/pipes/truncate.pipe";
import {FilterService} from "./shared/filter.service";
import {VisulizerService} from "./ng2-dhis-visualizer/visulizer.service";
import {Ng2DhisVisualizerComponent} from "./ng2-dhis-visualizer/ng2-dhis-visulizer.component";
import {DataService} from "./shared/data.service";
import {IndicatorCardComponent} from "./indicator-card/indicator-card.component";
import {TreeModule} from "angular2-tree-component/dist/angular2-tree-component";
import {OrgUnitService} from "./shared/org-unit.service";
const routes: Routes = [
  { path: '', component: HomeComponent , pathMatch: 'full', children:[
    { path: '', component:IndicatorgroupsComponent},

  ] },
  { path: 'metadata/:metadataid', component:IndicatortogroupComponent}
  //{ path: 'indicators/:indgroupId', component:IndicatortogroupComponent}
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
    MetadataDictionaryComponent,
    DashboardItemSearchComponent,
    ReadableNamePipe,
    TruncatePipe,
    Ng2DhisVisualizerComponent,
    IndicatorCardComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    TreeModule,
    RouterModule.forRoot(routes, { useHash: true}),
    Ng2PaginationModule,
    Ng2HighchartsModule,
    ChartModule

  ],
  providers: [IndicatorService,CanActivateViaIndicators,Constants,DashboardSearchService,FilterService,VisulizerService,DataService,OrgUnitService],
  bootstrap: [AppComponent]
})
export class AppModule { }
