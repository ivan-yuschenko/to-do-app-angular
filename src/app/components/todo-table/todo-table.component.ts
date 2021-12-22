import { Component, Input, OnInit, ViewChild, Output, EventEmitter, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { IToDoItem } from '../../interfaces/IToDoItem.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort'; 

@Component({
  selector: 'app-todo-table',
  templateUrl: './todo-table.component.html',
  styleUrls: ['./todo-table.component.scss']
})
export class TodoTableComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() dataStream?: Observable<IToDoItem[]>;
  @Input() filter: string = '';
  @Output() removeItemEvent = new EventEmitter<IToDoItem>();
  @Output() selectItemEvent = new EventEmitter<IToDoItem>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['select', 'title', 'timestamp', 'remove'];
  dataSource = new MatTableDataSource<IToDoItem>([]);
  subscription?: Subscription;

  constructor() { }

  ngOnInit(): void {
    this.subscription = this.dataStream?.subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filter = this.filter;
    })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['filter']) {
      this.dataSource.filter = this.filter;
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  removeItem(item: IToDoItem) {
    this.removeItemEvent.emit(item);
  }

  selected(item: IToDoItem) {
    this.selectItemEvent.emit(item);
  }
}
