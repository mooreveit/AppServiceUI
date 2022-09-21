import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-fotos-show',
  templateUrl: './fotos-show.page.html',
  styleUrls: ['./fotos-show.page.scss'],
})
export class FotosShowPage implements OnInit {

    link: any;

    constructor(private np: NavParams, private modalCtrl: ModalController) { }

    ngOnInit() {
        this.link = this.np.get('link')
    }

    closeModal() {
        this.modalCtrl.dismiss();
    }

}
