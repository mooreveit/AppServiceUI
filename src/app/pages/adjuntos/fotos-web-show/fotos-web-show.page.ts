import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-fotos-web-show',
  templateUrl: './fotos-web-show.page.html',
  styleUrls: ['./fotos-web-show.page.scss'],
})
export class FotosWebShowPage implements OnInit {

    link: any;

    constructor(private np: NavParams, private modalCtrl: ModalController) { }

    ngOnInit() {
        this.link = this.np.get('link')
    }

    closeModal() {
        this.modalCtrl.dismiss();
    }
}
