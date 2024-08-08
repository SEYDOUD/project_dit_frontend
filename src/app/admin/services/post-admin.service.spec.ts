import { TestBed } from '@angular/core/testing';

import { PostAdminService } from './post-admin.service';

describe('PostAdminService', () => {
  let service: PostAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
