
import { provideHttpClient } from '@angular/common/http';
import { fakeAsync } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';

import { MessageService } from '@services/message.service';
import { Hero } from '@model/hero';
import { HeroService } from '../hero.service';

describe('HeroService', () => {
  let service: HeroService;
  let httpMock: HttpTestingController;
  let messageServiceMock: {
    add: jest.Mock<any>
  };

  beforeEach(async () => {
    messageServiceMock = {
      add: jest.fn(),
    };
    console.error = jest.fn();

    await MockBuilder(HeroService)
      .provide(provideHttpClient())
      .provide(provideHttpClientTesting())
      .mock(MessageService, messageServiceMock);

    service = MockRender(HeroService).point.componentInstance;
    httpMock = ngMocks.findInstance(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all heroes', fakeAsync(() => {
    const heroes: Hero[] = [
      {
        id: 1,
        name: 'Hero'
      }
    ];

    service.getHeroes().subscribe(value => {
      expect(messageServiceMock.add).toHaveBeenCalledWith('HeroService: fetched heroes');
      expect(value).toEqual(heroes);
    });


    const req = httpMock.expectOne('api/heroes');
    expect(req.request.method).toEqual('GET');
    req.flush(heroes);
  }));

  it('should get empty list when error happens', fakeAsync(() => {
    const heroes: Hero[] = [];
    const emsg = 'deliberate 404 error';

    service.getHeroes().subscribe(value => {
      expect(messageServiceMock.add).toHaveBeenCalledWith('HeroService: getHeroes failed: Http failure response for api/heroes: 404 Not Found');
      expect(value).toEqual(heroes);
    });


    const req = httpMock.expectOne('api/heroes');
    expect(req.request.method).toEqual('GET');
    req.flush(emsg, { status: 404, statusText: 'Not Found'});
  }));

  it('should get hero by id', fakeAsync(() => {
    const hero: Hero = {
      id: 1,
      name: 'Hero'
    };

    service.getHero(1).subscribe(value => {
      expect(messageServiceMock.add).toHaveBeenCalledWith('HeroService: fetched hero id=1');
      expect(value).toEqual(hero);
    });


    const req = httpMock.expectOne('api/heroes/1');
    expect(req.request.method).toEqual('GET');
    req.flush(hero);
  }));

  it('should log error when unable to fetch hero by id', fakeAsync(() => {
    const emsg = 'deliberate 400 error';

    service.getHero(1).subscribe(() => {
      expect(messageServiceMock.add).toHaveBeenCalledWith('HeroService: getHero id=1 failed: Http failure response for api/heroes/1: 400 Bad Request');
    });


    const req = httpMock.expectOne('api/heroes/1');
    expect(req.request.method).toEqual('GET');
    req.flush(emsg, { status: 400, statusText: 'Bad Request'});
  }));

  it('should add hero', fakeAsync(() => {
    const hero: Hero = {
      id: 1,
      name: 'Hero'
    };

    service.addHero(hero).subscribe(value => {
      expect(messageServiceMock.add).toHaveBeenCalledWith('HeroService: added hero w/ id=1');
      expect(value).toEqual(hero);
    });


    const req = httpMock.expectOne('api/heroes');
    expect(req.request.method).toEqual('POST');
    req.flush(hero);
  }));

  it('should log error when unable to add a hero', fakeAsync(() => {
    const hero: Hero = {
      id: 1,
      name: 'Hero'
    };
    const emsg = 'deliberate 500 error';

    service.addHero(hero).subscribe(() => {
      expect(messageServiceMock.add).toHaveBeenCalledWith('HeroService: addHero failed: Http failure response for api/heroes: 500 Internal Server Error');
    });


    const req = httpMock.expectOne('api/heroes');
    expect(req.request.method).toEqual('POST');
    req.flush(emsg, { status: 500, statusText: 'Internal Server Error'});
  }));

  it('should update hero', fakeAsync(() => {
    const hero: Hero = {
      id: 1,
      name: 'Hero'
    };

    service.updateHero(hero).subscribe(value => {
      expect(messageServiceMock.add).toHaveBeenCalledWith('HeroService: updated hero id=1');
      expect(value).toEqual(hero);
    });


    const req = httpMock.expectOne('api/heroes');
    expect(req.request.method).toEqual('PUT');
    req.flush(hero);
  }));

  it('should log error when unable to fetch hero by id', fakeAsync(() => {
    const hero: Hero = {
      id: 1,
      name: 'Hero'
    };
    const emsg = 'deliberate 400 error';

    service.updateHero(hero).subscribe(() => {
      expect(messageServiceMock.add).toHaveBeenCalledWith('HeroService: updateHero failed: Http failure response for api/heroes: 400 Bad Request');
    });


    const req = httpMock.expectOne('api/heroes');
    expect(req.request.method).toEqual('PUT');
    req.flush(emsg, { status: 400, statusText: 'Bad Request'});
  }));

  it('should delete hero by id', fakeAsync(() => {
    const hero: Hero = {
      id: 1,
      name: 'Hero'
    };

    service.deleteHero(1).subscribe(value => {
      expect(messageServiceMock.add).toHaveBeenCalledWith('HeroService: deleted hero id=1');
      expect(value).toEqual(hero);
    });


    const req = httpMock.expectOne('api/heroes/1');
    expect(req.request.method).toEqual('DELETE');
    req.flush(hero);
  }));

  it('should log error when unable to fetch hero by id', fakeAsync(() => {
    const emsg = 'deliberate 400 error';

    service.deleteHero(1).subscribe(() => {
      expect(messageServiceMock.add).toHaveBeenCalledWith('HeroService: deleteHero failed: Http failure response for api/heroes/1: 400 Bad Request');
    });


    const req = httpMock.expectOne('api/heroes/1');
    expect(req.request.method).toEqual('DELETE');
    req.flush(emsg, { status: 400, statusText: 'Bad Request'});
  }));

  it('should return empty list when there is no search query', fakeAsync(() => {
    const heroes: Hero[] = [];

    service.searchHeroes('').subscribe(value => {
      expect(messageServiceMock.add).not.toHaveBeenCalled();
      expect(value).toEqual(heroes);
    });
  }));

  it('should get all heroes matching search query', fakeAsync(() => {
    const heroes: Hero[] = [
      {
        id: 1,
        name: 'Hero'
      }
    ];

    service.searchHeroes('hero').subscribe(value => {
      expect(messageServiceMock.add).toHaveBeenCalledWith('HeroService: found heroes matching "hero"');
      expect(value).toEqual(heroes);
    });


    const req = httpMock.expectOne('api/heroes/?name=hero');
    expect(req.request.method).toEqual('GET');
    req.flush(heroes);
  }));

  it('should get empty list when no matching with search query', fakeAsync(() => {
    const heroes: Hero[] = [];

    service.searchHeroes('nomatch').subscribe(value => {
      expect(messageServiceMock.add).toHaveBeenCalledWith('HeroService: no heroes matching "nomatch"');
      expect(value).toEqual(heroes);
    });


    const req = httpMock.expectOne('api/heroes/?name=nomatch');
    expect(req.request.method).toEqual('GET');
    req.flush(heroes);
  }));

  it('should log error when unable to search heros', fakeAsync(() => {
    const emsg = 'deliberate 503 error';

    service.searchHeroes('hero').subscribe(() => {
      expect(messageServiceMock.add).toHaveBeenCalledWith('HeroService: searchHeroes failed: Http failure response for api/heroes/?name=hero: 503 Service Unavailable');
    });


    const req = httpMock.expectOne('api/heroes/?name=hero');
    expect(req.request.method).toEqual('GET');
    req.flush(emsg, { status: 503, statusText: 'Service Unavailable'});
  }));
});
