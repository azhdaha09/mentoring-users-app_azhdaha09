import { APP_BOOTSTRAP_LISTENER, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, map, withLatestFrom, filter, tap } from 'rxjs';
import * as FoldersActions from './folders.actions'
import { ApiService } from '@users/core/http';
import { Store, select } from '@ngrx/store';
import { selectFoldersEntities } from './folders.selectors';
import { CreateFoldersDTO, FoldersDTO, selectRouteParams } from '@users/core/data-access';

export const folderEffects = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);

    return actions$.pipe(
      ofType(FoldersActions.initFolders),
      switchMap(() =>
        apiService.get<FoldersDTO[]>('/folder').pipe(
          map((folder) =>
            FoldersActions.loadFoldersSucces({
              folders: folder
            })
          ),
          catchError((error) => {
            console.error('Error', error);
            return of(FoldersActions.loadFolderFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const deleteFolder = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    return actions$.pipe(
      ofType(FoldersActions.deleteFolder),
      switchMap(({ id }) =>
        apiService.delete<void>(`/folder/${id}`).pipe(
          map(() => FoldersActions.deleteFolderSucces({ id })),
          catchError((error) => {
            console.error('Error', error);
            return of(FoldersActions.deleteFolderFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

export const addFolder = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    return actions$.pipe(
      ofType(FoldersActions.addFolder),
      // delay(1500),
      switchMap(({ folderData }) =>
        apiService.post<FoldersDTO, CreateFoldersDTO>('/folder', folderData).pipe(
          map((folder) => folder),
          map((folderDTO) => FoldersActions.addFolderSucces({ folderData: folderDTO })),
          catchError((error) => {
            console.error('Error', error);
            return of(FoldersActions.addFolderFailure({ error }));
          })
        )
      )
    );
  },
  { functional: true }
);

// ДОБАВИТЬ ЭФФЕКТ РЕДАКТИРОВАНИЯ ПАПКИ

export const loadFolder = createEffect(
  () => {
    const actions$ = inject(Actions);
    const apiService = inject(ApiService);
    const store = inject(Store);
    return actions$.pipe(
      ofType(FoldersActions.loadFolder),
      withLatestFrom(store.select(selectRouteParams)),
      switchMap(([, params]) => {
        if (params['id']) {
          return apiService.get<FoldersDTO>(`/users/${params['id']}`).pipe(
            map((folder) => folder),
            map((folderEntity) => FoldersActions.loadFolderSucces({ folderData: folderEntity })),
            catchError((error) => {
              console.error('Error', error);
              return of(FoldersActions.loadFolderFailure({ error }));
            })
          );
        }
        return of(FoldersActions.updateFolderStatus({ status: 'loading' }));
      })
    );
  },
  { functional: true }
);



