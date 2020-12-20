
import { createAction, props } from '@ngrx/store';
import { Usuario } from '../../models/usuario.model';

export const cargarUsuario = createAction(
    '[Usuario Component] Cargar Usuario',
    props<{ id: string}>()
);

export const cargarUsuarioSuccess = createAction(
    '[Usuario Component] Cargar Usuarios Success',
    props<{ usuario: Usuario }>()
);

export const cargarUsuarioError = createAction(
    '[Usuario Component] Cargar Usuarios Error',
    props<{ payload: any }>()
);