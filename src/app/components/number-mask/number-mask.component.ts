import { Component, OnInit, AfterViewInit ,Input, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-number-mask',
  templateUrl: './number-mask.component.html',
  styleUrls: ['./number-mask.component.scss'],
})
export class NumberMaskComponent implements OnInit, AfterViewInit {

    @ViewChild('inputField') inputField: IonInput;
    @Input('titulo') titulo: string;
    @Input('monto') monto: string; 
    @Input('precision') precision: number; 
    @Input('tipo') tipo: string; 
    @Output() eventEmitterSalidaFormateada = new EventEmitter();
  
    public montoRecibido: any = "" 
    public patron: any
    public comas
    public puntos
    public local;

    constructor() { }

    ngOnInit() {

        console.log("componente, monto=", this.monto)
        console.log("componente, precision=", this.precision)

        this.montoRecibido = this.monto     
        
        if (this.tipo == "I") {
            //Integer
            this.patron = "^[0-9]$";
        }

        if (this.tipo == "F") {
            //Float
            this.patron = "^[0-9]+(\.[0-9]{1,4})?$"
        }
        
    }

    ngAfterViewInit() {
 
        this.eventEmitterSalidaFormateada.emit(this.monto)    
        
    }

    openInput() {

        var numero = this.inputField.value

        this.monto = numero.toString()
        
        this.inputField.setFocus();       
        
    }
          
    validator(event: any) {

        var regexp = new RegExp(this.patron)

        let inputChar = String.fromCharCode(event.charCode);

        if (!regexp.test(inputChar))   //(!this.patron.test(inputChar)) {
            // invalid character, prevent input
            event.preventDefault();
    }


    change($event: KeyboardEvent) { 
       
        console.log("***" + this.inputField.value + "***")

        //tomo el valor del input control
        var numero = this.inputField.value

        this.monto = numero.toString()

        this.eventEmitterSalidaFormateada.emit(+numero)

    }


    formatear() { 

        var numero = this.inputField.value
        
        const noTruncarDecimales = { maximumFractionDigits: this.precision };

        this.comas = +numero.toLocaleString('en-US', noTruncarDecimales);         //123,456.95432
        this.puntos = +numero.toLocaleString('es', noTruncarDecimales);           //123.456,95432
        this.local = +numero.toLocaleString(undefined, noTruncarDecimales);       //123.456,95432

    }

}
