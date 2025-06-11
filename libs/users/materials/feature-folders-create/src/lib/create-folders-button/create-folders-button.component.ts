import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CreateFoldersDialogComponent } from '../create-folders-dialog/create-folders-dialog.component';
import { FoldersFacade } from '../../../../data-access/src/lib/+state/folders/folders.facade';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CreateFoldersDTO} from '../../../../../../core/data-access/src';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'create-folders-button',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './create-folders-button.component.html',
  styleUrls: ['./create-folders-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateFoldersButtonComponent {
  private title!: string;
  public dialog = inject(MatDialog);
  private readonly foldersFacade = inject(FoldersFacade);
  private readonly destroyRef = inject(DestroyRef);

  openAddFolderDialog(): void {
    const dialogRef: MatDialogRef<CreateFoldersDialogComponent> = this.dialog.open(CreateFoldersDialogComponent, {
      data: { title: this.title },
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result) {
          const newFolderData: CreateFoldersDTO = {
            title: result.title,
            create_at: Date.now().toString(),
            id: Math.random()
          };

          this.foldersFacade.addFolder(newFolderData);
        }
      });
  }
}
