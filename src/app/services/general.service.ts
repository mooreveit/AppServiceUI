import { Injectable } from '@angular/core';
import { IUsuario } from '../interfaces/iusuario';
import { ToastController, AlertController } from '@ionic/angular';
import { MathService } from './math.service';
@Injectable({
    providedIn: 'root'
})
export class GeneralService {

    basePath: string;
    basePathHub: string;

    // objeto usuario de tipo IUsuario
    usuario: IUsuario;

    constructor(public toastCtrl: ToastController,
        public mathService: MathService,
        public alertCtrl: AlertController) {

        //development mode

       // this.basePath = 'http://localhost:44314/api/';
        //this.basePathHub = 'http://localhost:44314/';

        //para produccion       
       this.basePath = 'https://mooreapps.com.ve/AppServiceBack/api/';
       this.basePathHub = 'https://mooreapps.com.ve/AppServiceBack/';

        //para desarrollo       
        //this.basePath = 'https://mooreapps.com.ve/AppServiceBackDV/api/';
        //this.basePathHub = 'https://mooreapps.com.ve/AppServiceBackDV/';
        
        //sitio QA
        //http://172.28.107.18:8087/AppServiceUi/menu/main
        
    }



    // Establace valores individualmente en localstorage
    SetItem(clave: string, valor: any): void {

        localStorage.setItem(clave, valor);

    }

    // resetea el objeto usuario
    KillUsuario(): void {

        // inicializo valores en localstorage
        this.SetItem('User', '');
        this.SetItem('Password', '');
        this.SetItem('Token', '');
        this.SetItem('Validate', 'false');
        this.SetItem('Role', '');
        this.SetItem('menu', '');


        // resetea objeto usuario
        this.ResetUsuario();

    }

    // resetea el objeto usuario
    ResetUsuario(): void {

        // reseteo objeto usuario
        this.usuario = {
            user: '',
            password: '',
            token: '',
            validate: 'false',
            role: '',
            Page: 1,
            ResultsCount: 0,
            TotalPages: 1,
            PageSize: 20,
            PageNumber: 1,
            pageMenuDto: null,

        };

    }

    // Devuelve objeto usuario con datos de localstorage
    GetUsuario(): IUsuario {
        this.ResetUsuario();

        this.usuario = {
            user: localStorage.getItem('User'),
            password: '',
            token: localStorage.getItem('Token'),
            validate: localStorage.getItem('Validate'),
            role: localStorage.getItem('Role'),
            Page: 1,
            ResultsCount: 0,
            TotalPages: 1,
            PageSize: 20,
            PageNumber: 1,
            pageMenuDto: JSON.parse(localStorage.getItem("menu")),
        };

        return this.usuario;
    }

    //Se encarga de la presentación de mensajes al usuario
    async presentToast(message: string, color?: string) {
        const toast = await this.toastCtrl.create({
            message,
            duration: 2000,
            position: 'middle',
            color
        });

        toast.present();
    }

    //Confirm
    async presentConfirm(header: any, message: any, cancelText: any, okText: any): Promise<any> {
        return new Promise(async (resolve) => {
            const alert = await this.alertCtrl.create({
                header: header,
                message: message,
                buttons: [
                    {
                        text: cancelText,
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: (cancel) => {
                            resolve(false);
                        }
                    }, {
                        text: okText,
                        handler: (ok) => {
                            resolve(true);
                        }
                    }
                ]
            });
            alert.present();
        });
    }

    //Formatea un entero como un string
    //1234567 -> 1.234.567
    //recibe un numero entero devuelve un string
    private PonerMascaraInteger(n: number): string {

        //numero convertido a cadena
        let cadena = n.toString();
        //console.log("cadena nstr=", cadena);

        //longitud de la cadena
        let longitudCadena = cadena.length;

        //longitud grupo
        let longitudGrupo = 3;

        //grupos completos
        let gruposCompletos = Math.floor(longitudCadena / longitudGrupo);

        //grupo adicional
        var hayGrupoAdicional: boolean = longitudCadena % longitudGrupo > 0;

        //fuente de datos
        let output = [];

        let p = longitudCadena;

        var grupo = "";

        let fuente = cadena;

        for (let i = 0; i < gruposCompletos; i++) {

            let inicioGrupo = fuente.length - longitudGrupo;

            var grupo = fuente.substr(inicioGrupo);

            //guarda cada grupo en un arreglo
            output.push(grupo)

            //refresco la nueva fuente de datos
            fuente = cadena.substr(0, inicioGrupo);

        }

        if (hayGrupoAdicional) {
            //el ultimo grupo
            grupo = fuente
            output.push(grupo)
        }

        //aplica un reverse al arreglo
        output = output.reverse()

        //genera el numero pero ya formateado
        let formattedNumber = ""
        output.forEach(i => {
            formattedNumber = formattedNumber + i + "."
        })

        //quite el . de de derecha
        formattedNumber = formattedNumber.substr(0, formattedNumber.length - 1)

        //muestra resultado por consola
        //console.log(n)
        //console.log(formattedNumber)

        //devuelve numero formateado
        return formattedNumber

    }

    //Quita el formato a una cadena Integer y la devuelve como integer
    //Recibe 123.456.789 -> 123456789 como Int

    private QuitarMascaraInteger(n: string): string {

        let nSinFormato: string

        while (n.indexOf(".") != -1) {
            n = n.replace(".", "")
        }

        nSinFormato = n

        //console.log(nSinFormato)

        return nSinFormato

    }

    private PonerMascaraFloat(n: number, decimales: number = 2): string {

        //console.log("n float",n)

        let output = ""

        let cadena = n.toFixed()
        //console.log("cadena del n float", cadena)

        let posicionSeparador = cadena.indexOf(".")

        let parteEntera = cadena.substring(0, posicionSeparador)
        //console.log("parteEnterastr")
        //console.log(parteEntera)

        let parteDecimal = cadena.substring(posicionSeparador + 1)
        //console.log("parteDecimalstr")
        //console.log(parteDecimal)

        let nToInt = parseInt(parteEntera)
        //console.log("toInt")
        //console.log(nToInt)

        output = this.PonerMascaraInteger(nToInt) + "," + parteDecimal
        //console.log(output)

        return output
    }

    private QuitarMascaraFloat(n: string): string {

        let nSinFormato = n.replace(",", "*");

        while (nSinFormato.indexOf(".") != -1) {
            nSinFormato = nSinFormato.replace(".", "")
        }

        nSinFormato = nSinFormato.replace("*", ".");

        return nSinFormato;
    }


    public maskInt(n: number): string {

        //Enmascara un entero
        let mascara: any = ''

        if (n > 0) {
            mascara = this.PonerMascaraInteger(n)
        }

        return mascara
    }

    public unMaskInt(n: string): string {

        //Desenmascara un entero
        let output: any = ''

        if (n != "") {
            output = this.QuitarMascaraInteger(n)
        }

        return output
    }


    public maskFloat(n: number, decimales: number = 2): string {

        //Enmascara un float
        let mascara: any = ''

        if (n > 0) {

            n = this.mathService.round10(n, -decimales)

            let output = ""

            let cadenaStr = n.toString()
            //console.log("cadena float de n:", cadenaStr)

            let posicionSeparador = cadenaStr.indexOf(".")
            //console.log("posicion separador", posicionSeparador)

            if (posicionSeparador == -1) {
                let separador = "."
                cadenaStr = cadenaStr + separador + "0"
                posicionSeparador = cadenaStr.indexOf(".")
            }

            let parteEnteraStr = cadenaStr.substring(0, posicionSeparador)
            //console.log("parteEnteraStr: ", parteEnteraStr)

            let parteDecimalStr = cadenaStr.substring(posicionSeparador + 1)
            //console.log("parteDecimalstr: ", parteDecimalStr)

            let nToInt = parseInt(parteEnteraStr)
            //console.log("toInt")
            //console.log(nToInt)

            mascara = this.PonerMascaraInteger(nToInt) + "," + parteDecimalStr

        }

        //console.log("mascara float: ",mascara)
        return mascara
    }

    public unMaskFloat(n: string): string {

        //Desenmascara un float
        let output: any = ''

        if (n != "") {
            output = this.QuitarMascaraFloat(n)
        }

        return output
    }

    public noImageUrl(): string {
        return "https://mooreapps.com.ve/ArchivosAdjuntos/NoImage.png"
    }
}
