import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersListVM } from './folder-list-view-model';
import { FoldersVM } from '../../../../feature-folders-create/folder-vm';
import { FoldersCardComponent } from '../folders-card/folders-card.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'folders-list-ui',
  standalone: true,
  imports: [CommonModule, FoldersCardComponent, MatProgressBarModule],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListComponent {
  ngOnInit() {
    console.log(this.vm)
  }


  @Input({ required: true })
  vm!: FoldersListVM;

  @Output() deleteFolder = new EventEmitter();
  @Output() redirectToEdit = new EventEmitter();

  onDeleteFolder(folder: FoldersVM) {
    this.deleteFolder.emit(folder);
  }

  onRedirectToEdit(editData: { id: number; editMode: boolean }) {
    this.redirectToEdit.emit(editData);
  }

}
