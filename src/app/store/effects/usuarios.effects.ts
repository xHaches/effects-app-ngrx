import { Injectable } from "@angular/core";

import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as usuariosActions from '../actions';
import { mergeMap, map, catchError, tap, delay } from 'rxjs/operators';
import { UsuarioService } from '../../services/usuario.service';
import { of } from "rxjs";

@Injectable()
export class UsuariosEffects {

    constructor(
        private actions$: Actions,
        private usuarioService: UsuarioService
    ){}

    cargarUsuarios$ = createEffect(
        () => this.actions$.pipe(
            ofType( usuariosActions.cargarUsuarios ),
            mergeMap(
                () => this.usuarioService.getUsers()
                .pipe(
                    map( users => usuariosActions.cargarUsuariosSuccess({ usuarios: users }) ),
                    delay(500),
                    catchError( err => of(usuariosActions.cargarUsuariosError({ payload: err })) )
                )
            )
        )
    );
}