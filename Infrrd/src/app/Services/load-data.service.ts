import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadDataService {
  constructor() { }
  bookingData = [];
  saveBookingData(obj) {
    var arr = this.getBookingData();
    arr.push(obj);
    localStorage.setItem('booking', JSON.stringify(arr));
  }

  getBookingData() {
    var booking = localStorage.getItem('booking');
    booking = JSON.parse(booking);
    var arr;
    if (booking == null) {
      arr = [];
    } else {
      arr = booking;
    }
    return arr;
  }

  deleteBookingData(obj) {
    localStorage.removeItem('booking');
    localStorage.setItem('booking', JSON.stringify(obj));
  }


}
