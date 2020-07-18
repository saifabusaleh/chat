import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from '@components/app/app.component';
import { LoginComponent } from '@components/login/login.component';
import { RoomComponent } from '@components/room/room.component';
import { TopBarComponent } from '@components/room/top-bar/top-bar.component';
import { RoomsComponent } from '@components/rooms/rooms.component';
import { AppRoutingModule } from '@components/app-routing.module';
import { MessagesComponent } from '@components/room/messages/messages.component';
import { BottomBarComponent } from '@components/room/bottom-bar/bottom-bar.component';



@NgModule({
  declarations: [
    RoomsComponent,
    LoginComponent,
    AppComponent,
    RoomComponent,
    TopBarComponent,
    MessagesComponent,
    BottomBarComponent
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
