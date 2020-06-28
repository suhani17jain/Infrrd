import { Component, OnInit } from '@angular/core';
import { RoomService } from '../Services/room-service.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  minDate = new Date();

  dateFilter = date => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  }
  constructor(public roomService: RoomService) { }
  data;
  reservedSlots;
  showSlots = false;
  ngOnInit(): void {

  }

  addEvent(event) {
    this.roomService.slotData.date = '';
    // @ts-ignore
    const date = new Date(event.value).toDateString("dd mm yyyy");
    this.roomService.slotData.date = date;
    this.roomService.slotData.room = false;
    this.showSlots = true;
    this.roomService.setDate(this.roomService.slotData);
  }


}
