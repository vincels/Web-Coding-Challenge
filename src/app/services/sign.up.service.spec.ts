import { SignUpData } from './sign.up.data';
import { SignUpService } from './sign.up.service';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

describe('SignUpService', () => {
  let httpMock: HttpTestingController;
  let service: SignUpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SignUpService]
    });
    service = TestBed.inject(SignUpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be instantiated', () => {
    expect(service).toBeTruthy();
  });

  it('should send a HTTP POST request with the form data', () => {
    const data: SignUpData = {
      email: 'test.user@example.com',
      firstName: 'Test',
      lastName: 'User',
      password: 'Welcome123'
    };

    service.post(data)
      .subscribe(() => { });

    const req = httpMock.expectOne(
      'https://demo-api.now.sh/users'
    );

    expect(req.request.method).toEqual('POST');
  });
});
