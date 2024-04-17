import { MessageService } from '@services/message.service';
import { MockBuilder, MockRender, MockedComponentFixture, ngMocks } from 'ng-mocks';

import { MessagesComponent } from '../messages.component';
import { NgFor, NgIf } from '@angular/common';
import { fakeAsync, tick } from '@angular/core/testing';

describe('MessagesComponent', () => {
  let component: MessagesComponent;
  let fixture: MockedComponentFixture<MessagesComponent>;
  let messageService: MessageService;

  beforeEach(async () => {
    await MockBuilder(MessagesComponent)
      .mock(MessageService, {
        messages: [
          'Message 1',
          'Message 2'
        ],
        clear: () => {
          return [];
        }
      })
      .keep(NgIf)
      .keep(NgFor);
    fixture = MockRender(MessagesComponent);
    component = fixture.point.componentInstance;
    messageService = ngMocks.get(MessageService);

  });

  it('should create with messages', () => {
    const messageElements = fixture.nativeElement.querySelectorAll('div > div');

    expect(messageElements.length).toBe(2);
    expect(messageElements[0].textContent).toBe('Message 1');
    expect(messageElements[1].textContent).toBe('Message 2');
  });

  it('should clear messages', fakeAsync(() => {
    const clearButton = fixture.nativeElement.querySelector('button.clear');
    jest.spyOn(messageService, 'clear');

    clearButton.click();
    tick(50);
    fixture.detectChanges();

    expect(messageService.clear).toHaveBeenCalled();
  }));
});
