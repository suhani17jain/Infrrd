import { Component, OnInit } from '@angular/core';
import { LoadDataService } from '../Services/load-data.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  rooms = [];
  bookedSlots;
  reservedRooms;
  showSchedule = false;
  constructor(public loadData: LoadDataService) { }

  ngOnInit(): void {
    this.getRooms();
  }

  getRooms() {
    for (let i = 1; i < 11; i++) {
      var roomData = {
        id: 0,
      }
      roomData.id = i;
      this.rooms.push(roomData);
    }
  }

  getSchedule(id) {
    this.bookedSlots = this.loadData.getBookingData();
    this.reservedRooms = this.bookedSlots.filter((data) => {
      return data.roomId == id;
    });
    this.showSchedule = true;
  }


}
