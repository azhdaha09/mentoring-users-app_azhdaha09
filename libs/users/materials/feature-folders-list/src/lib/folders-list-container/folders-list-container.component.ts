import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { FoldersListContainerStore } from './folder-list-container.store'
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FoldersFacade } from 'libs/users/materials/data-access/src/lib/+state/folders/folders.facade';
import { Router } from '@angular/router';
import { LetDirective } from '@ngrx/component';
import { FoldersDTO } from '@users/core/data-access';
import { CreateFoldersButtonComponent } from '../../../../feature-folders-create/src/lib/create-folders-button/create-folders-button.component';

@Component({
  selector: 'users-folders-list-container',
  standalone: true,
  imports: [
    CommonModule,
    FoldersListComponent,
    MatButtonModule,
    MatDialogModule,
    LetDirective,
    CreateFoldersButtonComponent,
  ],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FoldersListContainerStore],
})
export class FoldersListContainerComponent {
  private readonly componentStore = inject(FoldersListContainerStore);
  public foldersFacade = inject(FoldersFacade);
  public readonly folders$ = this.componentStore.folders$;
  public readonly status$ = this.componentStore.status$;
  public readonly errors$ = this.componentStore.errors$;
  private readonly router = inject(Router);

  onDeleteFolder(folder: FoldersDTO) {
    this.componentStore.deleteFolder(folder);
  }

  onRedirectToEdit({ id, editMode }: { id: number; editMode: boolean }) {
    this.router.navigate(['/admin/folders', id], {
      queryParams: { edit: editMode },
    });
  }


}
