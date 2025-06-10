import { createAction, emptyProps, props } from '@ngrx/store';
import { CreateFoldersDTO, FoldersDTO, LoadingStatus } from '@users/core/data-access';

export const initFolders = createAction('[Folders Page] Init');

export const loadFoldersSucces = createAction('[Folders/API] Load Folders Succes', props<{ folders: FoldersDTO[] }>());
export const loadFoldersFailure = createAction('[Folders/Api] Load Folders Failed', props<{ error: any }>());

export const deleteFolder = createAction('[Folders Page] Delete Folder', props<{ id: number }>());
export const deleteFolderSucces = createAction('[Folders/Api] Delete Folder Succes', props<{ id: number }>());
export const deleteFolderFailure = createAction('[Folders/Api] Delete Folder Failed', props<{ error: any }>());

export const addFolder = createAction('[Folder Page] Add Folder', props<{ folderData: CreateFoldersDTO }>());
export const addFolderSucces = createAction('[Folder/Api] Add Folder Succes', props<{ folderData: FoldersDTO }>());
export const addFolderFailure = createAction('[Folder/Api] Add Folder Failed', props<{ error: any }>());

export const loadFolder = createAction('[Folder Page] Load Folder');
export const loadFolderSucces = createAction('[Folder/Api] Load Folder Succes', props<{ folderData: FoldersDTO }>());
export const loadFolderFailure = createAction('[Folder/Api] LOad Folder Failed', props<{ error: any }>());

export const updateFolderStatus = createAction('[Folders Detail] Update Folder Status', props<{ status: LoadingStatus }>());