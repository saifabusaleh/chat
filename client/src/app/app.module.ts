import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { RoomsComponent } from '@components/rooms/rooms.component';
import { LoginComponent } from '@components/login/login.component';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '@components/app/app.component';
import { HttpClientModule } from '@angular/common/http';
import { RoomComponent } from '@components/room/room.component';
import { TopBarComponent } from '@components/room/top-bar/top-bar.component';
import { BottomBarComponent } from '@components/room/bottom-bar/bottom-bar.component';
import { MessagesComponent } from './components/room/messages/messages.component';


@NgModule({
  declarations: [
    RoomsComponent,
    LoginComponent,
    AppComponent,
    RoomComponent,
    TopBarComponent,
    BottomBarComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
