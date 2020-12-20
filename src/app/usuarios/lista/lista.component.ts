import { Component, OnInit, OnDestroy } from '@angular/core';

import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { cargarUsuarios } from '../../store/actions/usuarios.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: [
  ]
})
export class ListaComponent implements OnInit, OnDestroy {

  usuarios: Usuario[] = [];
  loading: boolean = false;
  error: any;

  usuariosSubs: Subscription;

  constructor(
    // sin nrgx effects
    // private usuarioService: UsuarioService

    // Con ngrx effects
    private store: Store<AppState>
    ) { }
    
    ngOnInit(): void {
      // sin nrgx effects
      // this.usuarioService.getUsers().subscribe( (usuarios : Usuario[] ) => {
      //   this.usuarios = usuarios;
      // });
      
      this.usuariosSubs = this.store.select('usuarios').subscribe( ({ users, loading, error } )=> {
        this.usuarios = users;
        this.loading = loading;
        this.error = error;
      });
      
      // Con ngrx effects
      this.store.dispatch( cargarUsuarios() )
    }

    ngOnDestroy() {
      this.usuariosSubs.unsubscribe();
    }

}
