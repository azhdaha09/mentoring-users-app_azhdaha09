import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersVM } from 'libs/users/materials/folder-vm';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatMenuTrigger } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'folders-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule, MatIconModule, MatTooltipModule, MatMenuModule],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersCardComponent {
  @Input({ required: true })
  folder!: FoldersVM;

  @Output() deleteFolder = new EventEmitter();
  @Output() redirectToEdit = new EventEmitter();

  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;

  onOpenMenu(event: Event) {
    event.stopPropagation();
    this.trigger.openMenu();
  }

  onDeleteFolder(event: Event) {
    this.deleteFolder.emit();
  }

  redirectToEditPage(editMode: boolean, event: Event) {
    const emitData = {
      id: this.folder.id,
      editMode,
    };
    this.redirectToEdit.emit(emitData);
  }
}
