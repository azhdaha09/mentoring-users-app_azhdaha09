import { Injectable, inject } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { UsersFacade } from '@users/users/data-access';
import { DeepReadonly } from '@users/core/utils';
import { tap } from 'rxjs';
import { FoldersFacade } from '../../../../data-access/src/lib/+state/folders/folders.facade'
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { FoldersDTO } from '@users/core/data-access';

type FoldersListState = DeepReadonly<{
  folders: FoldersDTO[];
}>;

const initialState: FoldersListState = {
  folders: [],
};

@Injectable()
export class FoldersListContainerStore extends ComponentStore<FoldersListState> {
  private readonly foldersFacade = inject(FoldersFacade)
  private readonly dialog = inject(MatDialog);
  public readonly folders$ = this.select(({ folders }) => folders);
  public readonly status$ = this.select(this.foldersFacade.status$, (status) => status);
  public errors$ = this.select(this.foldersFacade.errors$, (error) => error);

  constructor() {
    super(initialState);
    this.foldersFacade.init();
    this.setFoldersFromGlobalToLocalStore();
  }

  private setFoldersFromGlobalToLocalStore(): void {
    this.effect(() => this.foldersFacade.allFolders$.pipe(tap((folders: FoldersDTO[]) => this.patchFolders(folders))));
  }

  private patchFolders(folders: FoldersDTO[]): void {
    this.patchState({
      folders: folders,
    });
  }

  public deleteFolder(folder: FoldersDTO): void {
    const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: { dialogText: `Вы уверены, что хотите удалить ${folder.title}` },
    });
    this.effect(() =>
      dialogRef.afterClosed().pipe(
        tap((result: boolean) => {
          if (result) this.foldersFacade.deleteFolder(folder.id);
        })
      )
    );
  }
}