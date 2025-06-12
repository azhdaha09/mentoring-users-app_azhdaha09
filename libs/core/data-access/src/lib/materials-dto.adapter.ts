import { MaterialsDTO } from './materials-dto.model';
import { MaterialsEntity } from './materials.entity';

type MaterialsDTOAdapter = {
  DTOtoEntity(dto: MaterialsDTO): MaterialsEntity;
  EntitytoDTO(entity: MaterialsEntity): MaterialsDTO;
}

export const materialsDTOAdapter: MaterialsDTOAdapter = {
  DTOtoEntity(dto) {
    return dto
  },
  EntitytoDTO(entity) {
    return entity
  },
};
