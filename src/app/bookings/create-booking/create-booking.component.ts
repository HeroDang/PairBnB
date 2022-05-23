import { Component, Input, OnInit } from '@angular/core';
import {format, parseISO} from 'date-fns';
import { ModalController } from '@ionic/angular';

import { Place } from '../../places/place.module';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  @Input() selectedPlace: Place;
  @Input() selectedMode: 'select' | 'random';
  dateValue = '';
  dateValue2 = '';
  startDate: string;
  endDate: string;

  constructor(private modalCtrl: ModalController) { }
  ngOnInit() {
    const availableFrom = new Date(this.selectedPlace.availableFrom);
    const availableTo = new Date(this.selectedPlace.availableTo);
    if(this.selectedMode === 'random'){
      this.startDate = new Date(
        availableFrom.getTime() +
          Math.random() *
            (availableTo.getTime() -
              7*24*60*60*1000 -
              availableFrom.getTime())
      ).toISOString();

      this.endDate = new Date(
        new Date(this.startDate).getTime() +
          Math.random() *
            (new Date(this.startDate).getTime() +
              6*24*60*60*1000 -
              new Date(this.startDate).getTime())
      ).toISOString();
    }
  }

  onCancel(){
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onBookPlace(){
    this.modalCtrl.dismiss({message: 'This is a dummy message!'},'confirm');
  }

  formatDate(value: string) {
    return format(parseISO(value), 'MMM dd yyyy');
  }

}