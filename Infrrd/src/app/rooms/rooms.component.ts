import { Component, OnInit } from '@angular/core';
import { RoomService } from '../Services/room-service.service';
import { LoadDataService } from '../Services/load-data.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  bookedSlots;
  reservedRooms;
  filteredSlot;
  showForm = false;
  rooms = [];
  constructor(public roomService: RoomService,
    public loadData: LoadDataService) { }
  bookRooms = {
    bookingId: 0,
    date: '',
    roomId: '',
    userName: '',
    agenda: '',
    slotName: '',
    slotTimmings: '',
  }
  ngOnInit(): void {
    this.filterRooms();

  }

  filterRooms() {
    this.roomService.castSlot.subscribe((slotData) => {
      this.showForm = false;
      this.rooms = [];
      this.getRooms();
      this.filteredSlot = slotData;
      this.bookedSlots = this.loadData.getBookingData();
      this.reservedRooms = this.bookedSlots.filter((data) => {
        return data.date == this.filteredSlot.date && data.slotName == this.filteredSlot.slot;
      });
      this.getReservedRooms();

    })
  }

  getRooms() {
    for (let i = 1; i < 11; i++) {
      var roomData = {
        id: 0,
        name: '',
        status: 'Available',
        bookingId: 0,
      }
      roomData.id = i;
      this.rooms.push(roomData);
    }
  }

  getReservedRooms() {
    this.rooms.map((roomData) => {
      var count = this.reservedRooms.filter((d) => {
        return d.roomId == roomData.id;
      });
      if (count.length > 0) {
        roomData.status = 'Booked';
        roomData.name = count[0].userName;
        roomData.bookingId = count[0].bookingId;
      } else {
        roomData.status = 'Available';
      }
    });
  }

  bookRoom(room) {
    this.bookRooms.roomId = room.id;
    room.status == 'Available' ? this.showForm = true : this.showForm = false;
  }

  formSubmit(value: any) {
    this.showForm = false;
    this.bookRooms.userName = value.name;
    this.bookRooms.agenda = value.agenda;
    this.bookRooms.date = this.filteredSlot.date;
    this.bookRooms.slotName = this.filteredSlot.slot;
    this.bookRooms.slotTimmings = this.filteredSlot.slotTimmings;
    this.bookRooms.bookingId = Math.floor((Math.random() * 100) + 1);
    this.loadData.saveBookingData(this.bookRooms);
    this.filterRooms();
    this.roomService.slotData.room = true;
    this.roomService.setDate(this.roomService.slotData);
  }

  deleteSlot(room) {
    var bookingData = this.loadData.getBookingData();
    bookingData = bookingData.filter((data) => {
      return data.bookingId !== room.bookingId;
    });
    if (bookingData !== []) {
      this.loadData.deleteBookingData(bookingData);
      this.filterRooms();
      this.roomService.slotData.room = true;
      this.roomService.setDate(this.roomService.slotData);
    }
  }

}
