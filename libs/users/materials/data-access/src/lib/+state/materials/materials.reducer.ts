import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as MaterialsActions from './materials.actions';
import { LoadingStatus } from '@users/core/data-access';
import { MaterialsEntity} from '@users/core/data-access';

export const MATERIALS_FEATURE_KEY = 'materials';

export type MaterialsErrors = {
  status: number;
  [key: string]: unknown;
};

export interface MaterialsState extends EntityState<MaterialsEntity> {
  selectedId?: string | number;
  status: LoadingStatus;
  error: MaterialsErrors | null;
}

export interface MaterialsPartialState {
  readonly [MATERIALS_FEATURE_KEY]: MaterialsState;
}

export const materialsAdapter: EntityAdapter<MaterialsEntity> = createEntityAdapter<MaterialsEntity>();

export const initialMaterialsState: MaterialsState = materialsAdapter.getInitialState({
  status: 'init',
  error: null,
})

const reducer = createReducer(
  initialMaterialsState,
  on(MaterialsActions.initMaterials, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(MaterialsActions.loadMaterialsSucces, (state, { materials }) =>
    materialsAdapter.setAll(materials, { ...state, status: 'loaded' as const })
  ),
  on(MaterialsActions.loadMaterialFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),
  on(MaterialsActions.deleteMaterialSucces, (state, { id }) => materialsAdapter.removeOne(id, { ...state })),
  on(MaterialsActions.addMaterialSucces, (state, { materialData }) => materialsAdapter.addOne({ ...materialData }, { ...state })),
  on(MaterialsActions.loadMaterial, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(MaterialsActions.loadMaterialSucces, (state, { materialData }) =>
      materialsAdapter.addOne({ ...materialData }, { ...state, status: 'loaded' as const })
    ),
    on(MaterialsActions.loadMaterialFailure, (state, { error }) => ({
      ...state,
      status: 'error' as const,
      error,
    })),
    on(MaterialsActions.updateMaterialStatus, (state, { status }) => ({
      ...state,
      status,
    })),
);

export function materialsReducer(state: MaterialsState | undefined, action: Action) {
  return reducer(state, action);
}
