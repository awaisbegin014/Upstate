import { Controller, Get, Global, Module } from '@nestjs/common';
import { SettingsService } from './settings.service.js';

@Controller('store')
class StoreSettingsController {
  constructor(private readonly settings: SettingsService) {}

  @Get('settings')
  get() {
    return this.settings.publicSettings();
  }
}

@Global()
@Module({
  controllers: [StoreSettingsController],
  providers: [SettingsService],
  exports: [SettingsService],
})
export class SettingsModule {}
