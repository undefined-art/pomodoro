import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('health', () => {
    it('should return a healthy status payload', () => {
      const result = appController.health();

      expect(result.status).toBe('ok');
      expect(result.service).toBe('tempo-pomodoro-api');
      expect(typeof result.uptime).toBe('number');
      expect(new Date(result.timestamp).getTime()).not.toBeNaN();
    });
  });
});
