import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { DestinationService } from './destination.service';

@ApiTags('Destination')
@Controller('destination')
export class DestinationController {
  constructor(private readonly destinationService: DestinationService) {}

  @Get(':name')
  @ApiOperation({
    summary: 'Retorna informações agregadas de um destino',
    description:
      'Endpoint público. Agrega RestCountries (capital, idioma, moeda, população, continente), OpenWeatherMap (clima da capital) e ExchangeRate (conversão para BRL).',
  })
  @ApiParam({
    name: 'name',
    example: 'Brazil',
    description: 'Nome do país em inglês (ou formato aceito pelo RestCountries)',
  })
  getDestination(@Param('name') name: string) {
    return this.destinationService.getDestination(name);
  }
}
