import { AppUnitsGetDto } from './app-units-get-dto';
import { MtrTipoMonedaDto } from './mtr-tipo-moneda-dto';

export class AppIngredientsGetDto {

    id: number;
    code: string;
    description: string
    appUnitId: number;
    cost: number;
    prymaryMtrMonedaId: number;
    secundaryMtrMonedaId: number;

    appUnitsGetDto: AppUnitsGetDto;

    prymaryMtrMonedaDto: MtrTipoMonedaDto;
    secundaryMtrMonedaDto: MtrTipoMonedaDto;

}
