import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoomsComponent } from './components/rooms/rooms.component';
import { LoginComponent } from './components/login/login.component';
import { RoomComponent } from './components/room/room.component';
import {
  AuthGuard
} from './auth.guard';

const routes: Routes = [
  { path: 'rooms', component: RoomsComponent },
  { path: 'room/:name', component: RoomComponent, canActivate: [AuthGuard] },

  { path: '', component: LoginComponent },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
