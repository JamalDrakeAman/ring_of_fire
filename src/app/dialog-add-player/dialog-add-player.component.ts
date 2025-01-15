import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms'; 
import { MatInputModule } from '@angular/material/input'; 


@Component({
  selector: 'app-dialog-add-player',
  standalone: true,
  imports: [
    CommonModule,

    MatIconModule,
    MatDividerModule,
    MatButtonModule,

    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule
  ],
  templateUrl: './dialog-add-player.component.html',
  styleUrl: './dialog-add-player.component.scss'
})


export class DialogAddPlayerComponent implements OnInit  {
  name: string = '';

  constructor() { }

  ngOnInit(): void {

  }

  onNoClick(){

  }

}
