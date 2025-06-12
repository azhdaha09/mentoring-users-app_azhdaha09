import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, map, of, withLatestFrom, tap, filter  } from 'rxjs';
import * as MaterialsActions from './materials.actions';
import {ApiService} from '@users/core/http';
import { Store } from '@ngrx/store';
import { selectRouteParams, materialsDTOAdapter, CreateMaterialsDTO, MaterialsDTO } from '@users/core/data-access';

export const materialEffects = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(MaterialsActions.initMaterials),
      // delay(1500),
      switchMap(() =>
        apiService.get<MaterialsDTO[]>('/materials').pipe(
          map((materials) =>
            MaterialsActions.loadMaterialsSucces({
              materials: materials.map((material) => materialsDTOAdapter.DTOtoEntity(material)),
            })
          ),
          catchError((error) => {
            console.error('Error', error);
            return of(MaterialsActions.loadMaterialsFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const deleteMaterial = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    return actions$.pipe(
      ofType(MaterialsActions.deleteMaterial),
      // delay(1500),
      switchMap(({ id }) =>
        apiService.delete<void>(`/materials/${id}`).pipe(
          map(() => MaterialsActions.deleteMaterialSucces({ id })),
          catchError((error) => {
            console.error('Error', error);
            return of(MaterialsActions.deleteMaterialFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const addMaterial = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    return actions$.pipe(
      ofType(MaterialsActions.addMaterial),
      // delay(1500),
      switchMap(({ materialData }) =>
        apiService.post<MaterialsDTO, CreateMaterialsDTO>('/materials', materialData).pipe(
          map((material) => materialsDTOAdapter.DTOtoEntity(material)),
          map((materialEntity) => MaterialsActions.addMaterialSucces({ materialData: materialEntity })),
          catchError((error) => {
            console.error('Error', error);
            return of(MaterialsActions.addMaterialFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);


export const loadMaterial = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    const store = inject(Store);
    return actions$.pipe(
      ofType(MaterialsActions.loadMaterial),
      withLatestFrom(store.select(selectRouteParams)),
      switchMap(([, params]) => {
        if (params['id']) {
          return apiService.get<MaterialsDTO>(`/materials/${params['id']}`).pipe(
            map((material) => materialsDTOAdapter.DTOtoEntity(material)),
            map((materialEntity) => MaterialsActions.loadMaterialSucces({ materialData: materialEntity })),
            catchError((error) => {
              console.error('Error', error);
              return of(MaterialsActions.loadMaterialFailure({ error }));
            })
          );
        }
        return of(MaterialsActions.updateMaterialStatus({ status: 'loading' }));
      })
    );
  },
  { functional: true }
);
