import { DeepReadonly } from '@users/core/utils';
import { FoldersVM } from '../../../../folder-vm';
import { FoldersErrors } from 'libs/users/materials/data-access/src/lib/+state/folders/folders.reducer';
import { LoadingStatus } from '@users/core/data-access';

export type FoldersListVM = DeepReadonly<{
  folders: FoldersVM[];
  status: LoadingStatus;
  errors: FoldersErrors | null;
}>;