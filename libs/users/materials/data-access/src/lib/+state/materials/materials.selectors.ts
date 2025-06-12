import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MATERIALS_FEATURE_KEY, MaterialsState, materialsAdapter } from './materials.reducer';
import { selectRouteParams } from '@users/core/data-access';

export const selectMaterialsState = createFeatureSelector<MaterialsState>(MATERIALS_FEATURE_KEY);

const { selectAll, selectEntities } = materialsAdapter.getSelectors();

export const selectMaterialsStatus = createSelector(selectMaterialsState, (state: MaterialsState) => state.status);

export const selectMaterialsError = createSelector(selectMaterialsState, (state: MaterialsState) => state.error);

export const selectAllMaterials = createSelector(selectMaterialsState, (state: MaterialsState) => selectAll(state));

export const selectMaterialsEntities = createSelector(selectMaterialsState, (state: MaterialsState) => selectEntities(state));

export const selectSelectedId = createSelector(selectMaterialsState, (state: MaterialsState) => state.selectedId);

export const selectEntity = createSelector(selectMaterialsEntities, selectSelectedId, (entities, selectedId) =>
  selectedId ? entities[selectedId] : undefined
);

export const selectMaterialById = (id: number) => createSelector(selectMaterialsEntities, (entities) => entities[id]);

export const selectOpenedMaterial = createSelector(
  selectRouteParams,
  selectMaterialsEntities,
  ({ id }, entities) => entities[id] || null
);
