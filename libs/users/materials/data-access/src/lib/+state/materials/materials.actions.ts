import { createAction, emptyProps, props } from '@ngrx/store';
import { CreateMaterialsDTO, MaterialsDTO, LoadingStatus } from '@users/core/data-access';

export const initMaterials = createAction('[Materials Page] Init');

export const loadUsersSucces = createAction('[Materials/API] Load Materials Succes', props<{ materials: MaterialsDTO[] }>());
export const loadUsersFailure = createAction('[Materials/Api] Load Materials Failed', props<{ error: any }>());

export const deleteMaterial = createAction('[Materials Page] Delete Material', props<{ id: number }>());
export const deleteMaterialSucces = createAction('[Materials/Api] Delete Material Succes', props<{ id: number }>());
export const deleteMaterialFailure = createAction('[Materials/Api] Delete Material Failed', props<{ error: any }>());

export const addMaterial = createAction('[Material Page] Add Material', props<{ materialData: CreateMaterialsDTO }>());
export const addMaterialSucces = createAction('[Material/Api] Add Material Succes', props<{ materialData: MaterialsDTO }>());
export const addMaterialFailure = createAction('[Material/Api] Add Material Failed', props<{ error: any }>());

export const loadMaterial = createAction('[Material Page] Load Material');
export const loadMaterialSucces = createAction('[Material/Api] Load Material Succes', props<{ materialData: MaterialsDTO }>());
export const loadMaterialFailure = createAction('[Material/Api] LOad Material Failed', props<{ error: any }>());

export const updateMaterialStatus = createAction('[Materials Detail] Update Material Status', props<{ status: LoadingStatus }>());