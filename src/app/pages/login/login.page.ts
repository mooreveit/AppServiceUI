import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from '../../services/general.service';
import { ToastController } from '@ionic/angular';
import { NetworkService } from '../../services/network.service';
import { PageMenuQueryFilter } from '../../interfaces/page-menu-query-filter';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  show: boolean;
  usuario = {
    User: '',
    Password: '',
  };
  isConnected = false;

  //todo para corregir detalle en password 
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  pageMenuQueryFilter: PageMenuQueryFilter;
  constructor(public loginService: LoginService,
    public activateRoute: ActivatedRoute,
    public router: Router, public gs: GeneralService,
    public toastController: ToastController) { }

  ngOnInit() {

    //TODO poner en blanco para produccion

    this.show = false;
    this.usuario.User = '';
    this.usuario.Password = '';

    /* this.networkService.getNetworkStatus().subscribe((connected: boolean) => {
        this.isConnected = connected;
        if (!this.isConnected) {
            alert('Por favor enciende tu conexión a Internet');
     
        }
        }); 
    */
  }

  //para mostrar u ocultar el password 
  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }


  async openToast(message, color) {
    const toast = await this.toastController.create({
      message,
      duration: 5000,
      position: 'top',
      color

    });
    toast.present();
  }
  onSubmitLogin() {

    console.log(this.usuario);
    this.show = true;


    this.loginService.login(this.usuario).subscribe(response => {
      console.log("response en login", response);

      if (response.validate) {

        localStorage.setItem('Validate', 'true');
        localStorage.setItem('Token', response.token);
        localStorage.setItem('User', response.user);

        localStorage.setItem('Role', response.role);
        localStorage.setItem("menu", JSON.stringify(response.pageMenuDto));

        /*this.pageMenuQueryFilter = {
          role: +localStorage.getItem('Role')
        };


        console.log("role desede el login", this.pageMenuQueryFilter);
        this.loginService.GetMenu(this.pageMenuQueryFilter).subscribe(response => {
          console.log("Menu desde la api", response);
          localStorage.setItem("menu", JSON.stringify(response));
        });*/



        this.router.navigateByUrl('/menu/main');
        this.show = false;
      } else {
        alert("Cuando la respuesta es No valida " + response.validate);
        localStorage.setItem('Validate', 'false');
        this.gs.KillUsuario();
        this.openToast('Usuario o Clave Invalida', 'danger');
        this.show = false;

      }

    },
      error => {
        this.openToast(error, 'danger');
        this.show = false;
        console.log("en el error del login: ", error);
      });




  }

}
