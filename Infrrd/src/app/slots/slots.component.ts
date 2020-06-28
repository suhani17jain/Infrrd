import { Component, OnInit } from '@angular/core';
import { RoomService } from '../Services/room-service.service';
import { LoadDataService } from '../Services/load-data.service';

@Component({
  selector: 'app-slots',
  templateUrl: './slots.component.html',
  styleUrls: ['./slots.component.css']
})
export class SlotsComponent implements OnInit {
  roomsAvailable;
  bookedSlots;
  selectedDates;
  reservedSlots;
  showRooms = false;
  slots = [
    {
      name: 'slot1',
      statTime: '9:00',
      endTime: '9:30',
      count: 0,
      status: ''
    },
    {
      name: 'slot2',
      statTime: '9:30',
      endTime: '10:00',
      count: 0,
      status: ''
    },
    {
      name: 'slot3',
      statTime: '10:00',
      endTime: '10:30',
      count: 0,
      status: ''
    },
    {
      name: 'slot4',
      statTime: '10:30',
      endTime: '11:00',
      count: 0,
      status: ''
    },
    {
      name: 'slot5',
      statTime: '11:00',
      endTime: '11:30',
      count: 0,
      status: ''
    },
    {
      name: 'slot6',
      statTime: '11:30',
      endTime: '12:00',
      count: 0,
      status: ''
    },
    {
      name: 'slot7',
      statTime: '12:00',
      endTime: '12:30',
      count: 0,
      status: ''
    },
    {
      name: 'slot8',
      statTime: '12:30',
      endTime: '13:00',
      count: 0,
      status: ''
    },
    {
      name: 'slot9',
      statTime: '13:00',
      endTime: '13:30',
      count: 0,
      status: ''
    },
    {
      name: 'slot10',
      statTime: '13:30',
      endTime: '14:00',
      count: 0,
      status: ''
    },
    {
      name: 'slot11',
      statTime: '14:00',
      endTime: '14:30',
      count: 0,
      status: ''
    },
    {
      name: 'slot12',
      statTime: '14:30',
      endTime: '15:00',
      count: 0,
      status: ''
    },
    {
      name: 'slot13',
      statTime: '15:00',
      endTime: '15:30',
      count: 0,
      status: ''
    },
    {
      name: 'slot14',
      statTime: '15:30',
      endTime: '16:00',
      count: 0,
      status: ''
    },
    {
      name: 'slot15',
      statTime: '16:00',
      endTime: '16:30',
      count: 0,
      status: ''
    },
    {
      name: 'slot16',
      statTime: '16:30',
      endTime: '17:00',
      count: 0,
      status: ''
    },
    {
      name: 'slot17',
      statTime: '17:00',
      endTime: '17:30',
      count: 0,
      status: ''
    },
    {
      name: 'slot18',
      statTime: '17:30',
      endTime: '18:00',
      count: 0,
      status: ''
    }
  ];
  constructor(public roomService: RoomService,
    public loadData: LoadDataService) { }

  ngOnInit(): void {
    this.roomService.cast.subscribe((selectedDate) => {
      this.selectedDates = selectedDate;
      this.selectedDates.room == true ? this.showRooms = true : this.showRooms = false;
      this.bookedSlots = this.loadData.getBookingData();
      this.reservedSlots = this.bookedSlots.filter((data) => {
        return data.date == this.selectedDates.date;
      });
      this.countRooms();
    })

  }

  countRooms() {
    this.slots.map((slotData) => {
      var count = this.reservedSlots.filter((d) => {
        return d.slotName == slotData.name;
      });
      slotData.count = count.length;
    });
  }

  getAvailableRooms(slot) {
    this.showRooms = true;
    this.roomService.slotData.slot = slot.name;
    this.roomService.slotData.slotTimmings = slot.statTime + '-' + slot.endTime;
    this.roomService.setSlot(this.roomService.slotData);
  }

}