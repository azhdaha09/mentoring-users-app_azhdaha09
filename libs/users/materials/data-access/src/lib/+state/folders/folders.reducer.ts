import {createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as FoldersActions from './folders.actions';
import { FoldersDTO } from '@users/core/data-access';
import { LoadingStatus } from '@users/core/data-access';

export const FOLDERS_FEATURE_KEY = 'folders';

export type FoldersErrors = {
  status: number;
  [key: string]: unknown;
};

export interface FoldersState extends EntityState<FoldersDTO> {
  selectedId?: string | number;
  status: LoadingStatus;
  error: FoldersErrors | null;
}

export interface FoldersPartialState {
  readonly [FOLDERS_FEATURE_KEY]: FoldersState;
}

export const foldersAdapter: EntityAdapter<FoldersDTO> = createEntityAdapter<FoldersDTO>();

export const initialFoldersState: FoldersState = foldersAdapter.getInitialState({
  // set initial required properties
  status: 'init',
  error: null,
});

const reducer = createReducer(
  initialFoldersState,
  on(FoldersActions.initFolders, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(FoldersActions.loadFoldersSucces, (state, { folders }) => 
    foldersAdapter.setAll(folders, { ...state, status: 'loaded' as const })
  ),
  on(FoldersActions.loadFolderFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),
  on(FoldersActions.deleteFolderSucces, (state, { id }) => foldersAdapter.removeOne(id, { ...state })),
  on(FoldersActions.addFolderSucces, (state, { folderData }) => foldersAdapter.addOne({ ...folderData }, { ...state })),
  on(FoldersActions.loadFolder, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(FoldersActions.loadFolderSucces, (state, { folderData }) =>
      foldersAdapter.addOne({ ...folderData }, { ...state, status: 'loaded' as const })
    ),
    on(FoldersActions.loadFolderFailure, (state, { error }) => ({
      ...state,
      status: 'error' as const,
      error,
    })),
    on(FoldersActions.updateFolderStatus, (state, { status }) => ({
      ...state,
      status,
    })),


);

export function foldersReducer(state: FoldersState | undefined, action: Action) {
  return reducer(state, action);
}
