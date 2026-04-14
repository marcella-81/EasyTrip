import { Controller, Get, Param } from '@nestjs/common';
import { DestinationService } from './destination.service';

@Controller('destination')
export class DestinationController {
  constructor(private readonly destinationService: DestinationService) {}

  @Get(':name')
  getDestination(@Param('name') name: string) {
    return this.destinationService.getDestination(name);
  }
}
