
import { MockBuilder, MockRender } from 'ng-mocks';

import { InMemoryDataService } from '../in-memory-data.service';
import { Hero } from '@model/hero';

describe('InMemoryDataService', () => {
  let service: InMemoryDataService;

  beforeEach(async () => {
    await MockBuilder(InMemoryDataService);

    service = MockRender(InMemoryDataService).point.componentInstance;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create DB', () => {
    const { heroes } = service.createDb();

    expect(heroes.length).toBe(9);
    expect(heroes).toMatchSnapshot();
  });

  it('should generate id as default start value when array is empty', () => {
    const heroes: Hero[] = [];

    const id = service.genId(heroes);

    expect(id).toBe(11);
  });

  it('should generate id as next incremented value when ids are present', () => {
    const heroes: Hero[] = [
      { id: 12, name: 'Dr. Nice' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr. IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' },
      { id: 21, name: 'Manya' }
    ];

    const id = service.genId(heroes);

    expect(id).toBe(22);
  });
});
