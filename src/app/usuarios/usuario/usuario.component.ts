import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { cargarUsuario } from '../../store/actions/usuario.actions';
import { Usuario } from '../../models/usuario.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: [
  ]
})
export class UsuarioComponent implements OnInit, OnDestroy {

  usuario: Usuario;
  loading: boolean = false;
  error: any;


  usuarioSubscription: Subscription;
  routerSubscription: Subscription;

  constructor(
    private router: ActivatedRoute,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.usuarioSubscription = this.store.select('usuario').subscribe(({user, loading, error }) => {
      this.usuario = user;
      this.loading = loading;
      this.error = error;
    });

    this.routerSubscription = this.router.params.subscribe( ({ id }) => {
      this.store.dispatch(cargarUsuario({ id }) )
    });
  }

  ngOnDestroy() {
    this.usuarioSubscription.unsubscribe();
    this.routerSubscription.unsubscribe();
  }

}
