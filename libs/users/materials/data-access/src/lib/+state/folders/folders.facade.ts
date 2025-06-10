import { inject, Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import * as FoldersActions from './folders.actions';
import * as FoldersSelectors from './folders.selectors';
import { FoldersErrors } from "./folders.reducer";
import { Observable, of, switchMap } from "rxjs";
import { CreateFoldersDTO, FoldersDTO } from "@users/core/data-access";


@Injectable({ providedIn: 'root' })
export class FoldersFacade {
    private readonly store = inject(Store);

    public readonly status$ = this.store.pipe(select(FoldersSelectors.selectFoldersStatus));
    public readonly allFolders$ = this.store.pipe(select(FoldersSelectors.selectAllFolders));
    public readonly selectedFolders$ = this.store.pipe(select(FoldersSelectors.selectEntity))
    public readonly openedFolder$ = this.store.pipe(select(FoldersSelectors.selectOpenedFolder));
    public readonly errors$: Observable<FoldersErrors | null> = this.store.pipe(select(FoldersSelectors.selectFoldersError));


    init() {
        this.store.dispatch(FoldersActions.initFolders());
    }

    deleteFolder(id: number) {
        this.store.dispatch(FoldersActions.deleteFolder({ id }));
    }

    addFolder(folderData: CreateFoldersDTO) {
        this.store.dispatch(FoldersActions.addFolder({ folderData }));
    }

    // РЕДАКТРИРОВАНИЕ

    getFolderFromStore(id: number) {
        return this.store.select(FoldersSelectors.selectFolderById(id)).pipe(
          switchMap((folder: FoldersDTO | undefined): Observable<FoldersDTO | null> => {
            if (folder) {
              return of(folder);
            } else {
              return of(null);
            }
          })
        );
    }

    loadFolder() {
        this.store.dispatch(FoldersActions.loadFolder());
    }

}