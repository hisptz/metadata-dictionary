import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {DhisMenuComponent} from "./dhis-menu/ng2-dhis-menu";
import { MetadataDictionaryComponent } from './metadata-dictionary/metadata-dictionary.component';
import {MetadataDictionaryService} from "./metadata-dictionary/metadata-dictionary.service";

@NgModule({
  declarations: [
    AppComponent,
    DhisMenuComponent,
    MetadataDictionaryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [MetadataDictionaryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
