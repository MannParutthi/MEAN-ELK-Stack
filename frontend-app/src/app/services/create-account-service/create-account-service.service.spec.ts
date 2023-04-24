import { TestBed } from '@angular/core/testing';

import { CreateAccountServiceService } from './create-account-service.service';

describe('CreateAccountServiceService', () => {
  let service: CreateAccountServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateAccountServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
