import { Component, OnInit } from '@angular/core';
import { LoginService } from './loginService';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  logIn(rut: string, password: string) {

    this.loginService.login(rut, password).subscribe(

      res => { // una vez que el login service valide la entrada, res guarda lo que retorn.
        for (var i in res) {
        }
        //console.log(res);
        localStorage.setItem('Usuario', JSON.stringify(res));// guarda el objeto usuario en el local storage
        //console.log(localStorage.getItem('Usuario'));
      },
      error => {
        console.error(error);
      },
      () => this.navigate()
    );
  }
  navigate() {
    if (localStorage.getItem("Usuario") == null) {
      this.router.navigateByUrl('');
    }
    else {
      var item = JSON.parse(localStorage.getItem('Usuario'));
      if (item.role == "Estudiante") {
        this.router.navigateByUrl('/home');
      }
      else {
        this.router.navigateByUrl('/home');
      }

    }

  }

}
