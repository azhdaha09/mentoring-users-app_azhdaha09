import { FoldersDTO } from '../../../core/data-access/src';
import { DeepReadonly } from '../../../core/utils/src';

export type FoldersVM = DeepReadonly<Pick<FoldersDTO, 'id' | 'created_at' | 'title'>>;
