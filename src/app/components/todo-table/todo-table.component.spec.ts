import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoTableComponent } from './todo-table.component';
import { AngularMaterialModule } from '../../angular-material.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TodoTabComponent', () => {
  let component: TodoTableComponent;
  let fixture: ComponentFixture<TodoTableComponent>;
  const item = {
    id: Math.random().toString(36).substring(7),
    title: 'Test',
    completed: false,
    timestamp: new Date(Date.now())
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoTableComponent ],
      imports: [AngularMaterialModule, BrowserAnimationsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.dataSource.data.length).toEqual(0);
    expect(component.filter).toEqual('');
  });

  it('check remove item behaviour', () => {
    spyOn(component.removeItemEvent, 'emit');
    component.removeItem(item);
    expect(component.removeItemEvent.emit).toHaveBeenCalled();
    expect(component.removeItemEvent.emit).toHaveBeenCalledWith(item);
  });

  it('check selected item behaviour', () => {
    spyOn(component.selectItemEvent, 'emit');
    component.selected(item);
    expect(component.selectItemEvent.emit).toHaveBeenCalled();
    expect(component.selectItemEvent.emit).toHaveBeenCalledWith(item);
  });
});
