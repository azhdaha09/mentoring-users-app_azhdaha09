import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as MaterialsActions from './materials.actions';
import * as MaterialsSelectors from './materials.selectors';
import { Observable, of, switchMap } from 'rxjs';
import { MaterialsErrors } from './materials.reducer';
import { CreateMaterialsDTO, MaterialsEntity } from '@users/core/data-access';

@Injectable({ providedIn: 'root' })
export class MaterialsFacade {
  private readonly store = inject(Store);

  public readonly status$ = this.store.pipe(select(MaterialsSelectors.selectMaterialsStatus));
  public readonly allUsers$ = this.store.pipe(select(MaterialsSelectors.selectAllMaterials));
  public readonly selectedUsers$ = this.store.pipe(select(MaterialsSelectors.selectEntity));
  public readonly openedUser$ = this.store.select(MaterialsSelectors.selectOpenedMaterial);
  public readonly errors$: Observable<MaterialsErrors | null> = this.store.pipe(select(MaterialsSelectors.selectMaterialsError));

  init() {
    this.store.dispatch(MaterialsActions.initMaterials());
  }

  deleteMaterial(id: number) {
    this.store.dispatch(MaterialsActions.deleteMaterial({ id }));
  }

  addUser(materialData: CreateMaterialsDTO) {
    this.store.dispatch(MaterialsActions.addMaterial({ materialData }));
  }

  getMaterialFromStore(id: number) {
    return this.store.select(MaterialsSelectors.selectMaterialById(id)).pipe(
      switchMap((material: MaterialsEntity | undefined): Observable<MaterialsEntity | null> => {
        if (material) {
          return of(material);
        } else {
          return of(null);
        }
      })
    );
  }

  loadUser() {
    this.store.dispatch(MaterialsActions.loadMaterial());
  }
}
