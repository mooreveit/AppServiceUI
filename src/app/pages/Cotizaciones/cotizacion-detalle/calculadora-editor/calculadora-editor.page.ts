import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-calculadora-editor',
  templateUrl: './calculadora-editor.page.html',
  styleUrls: ['./calculadora-editor.page.scss'],
})
export class CalculadoraEditorPage implements OnInit {

    descripcion: string;
    valor: number;
    indice: number;

    constructor(private modalCtrl: ModalController, private navPar: NavParams) { }

    ngOnInit() {
        this.descripcion = this.navPar.get('descripcion')
        this.valor = this.navPar.get('valor')
        this.indice = this.navPar.get('indice')
    }
    
    onAceptar() {
        this.modalCtrl.dismiss({
            descripcion: this.descripcion,
            valor: this.valor,
            indice: this.indice
        });
    }
        
    onCancelar() {
        this.modalCtrl.dismiss({            
            valor: this.valor,
            indice: this.indice
        })
    }

}
