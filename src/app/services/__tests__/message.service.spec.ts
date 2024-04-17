import { MockBuilder, MockRender } from 'ng-mocks';

import { MessageService } from '../message.service';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(async () => {
    await MockBuilder(MessageService);

    service = MockRender(MessageService).point.componentInstance;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service.messages.length).toBe(0);
  });

  it('should add a message', () => {
    service.add('Message 1');

    expect(service.messages.length).toBe(1);
    expect(service.messages[0]).toBe('Message 1');
  });

  it('should clear all messages', () => {
    service.messages = [
      'Message 1',
      'Message 2'
    ];

    service.clear();

    expect(service.messages.length).toBe(0);
  });
});
