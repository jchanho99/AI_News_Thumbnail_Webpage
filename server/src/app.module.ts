import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UpdateModule } from './update/update.module';
import { ViewModule } from './view/view.module';
import { SummaryModule } from './summary/summary.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    DatabaseModule,
    UpdateModule,
    ViewModule,
    SummaryModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
