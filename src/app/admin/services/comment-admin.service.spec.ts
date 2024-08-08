import { TestBed } from '@angular/core/testing';

import { CommentAdminService } from './comment-admin.service';

describe('CommentAdminService', () => {
  let service: CommentAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
