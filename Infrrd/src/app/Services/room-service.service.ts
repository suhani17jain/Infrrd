import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RoomService {
  slotData = {
    date: '',
    slot: '',
    room: true,
    slotTimmings: ''
  }
  private date = new BehaviorSubject<Object>('dafault message');
  private slotBooked = new BehaviorSubject<Object>('dafault message');
  cast = this.date.asObservable();
  castSlot = this.slotBooked.asObservable();
  constructor() { }

  setDate(data: object) {
    this.date.next(data);
  };

  setSlot(data: object) {
    this.slotBooked.next(data);
  };


}
