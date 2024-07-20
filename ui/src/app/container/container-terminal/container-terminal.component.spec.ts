import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerTerminalComponent } from './container-terminal.component';

describe('ContainerTerminalComponent', () => {
  let component: ContainerTerminalComponent;
  let fixture: ComponentFixture<ContainerTerminalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerTerminalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContainerTerminalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
