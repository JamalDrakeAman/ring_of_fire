import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';

import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';

import { Firestore, collectionData, collection, doc, onSnapshot, addDoc, updateDoc, setDoc } from '@angular/fire/firestore';
import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    PlayerComponent,

    MatIconModule,
    MatDividerModule,
    MatButtonModule,

    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    GameInfoComponent
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})


export class GameComponent implements OnInit {

  game: Game = new Game;

  gameID: string = '';


  unsubList;
  // unsubSingle: any;

  private firestore: Firestore = inject(Firestore);

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {

    this.unsubList = onSnapshot(this.getGameRef(), (list) => {
      list.forEach(element => {
        if(element.id == this.gameID){


          console.log('Game Update', element.data());
          let data = element.data();
          this.game.currentPlayer = data['currentPlayer'];
          this.game.playedCards = data['playCards'];
          this.game.players = data['players'];
          this.game.stack = data['stack'];
          this.game.pickCardAnimation = data['pickCardAnimation'];
          this.game.currentCard = data['currentCard'];
        }

      });
    });

  }


  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      console.log(params['id']);
      this.gameID = params['id'];
      console.log('ID', this.gameID);


      // this.unsubList = onSnapshot(collection(this.firestore, `${this.gameID}`), (list) => {
      //   list.forEach(element => {

    
      //   });
      // });

    })
  }


  getGameRef() {
    return collection(this.firestore, 'games');
  }

  getsingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }


  ngOnDestroy() {
    // this.items.unsubscribe();
    // this.unsubSingle();
    this.unsubList();
  }


  async saveGame() {
    const documentRef = doc(this.firestore, `games/${this.gameID}`);
    console.log(this.gameID);
    try {
      await setDoc(documentRef, this.game.toJson());
      console.log('Document successfully replaced!');
      console.log(this.game.toJson());
    } catch (error) {
      console.error('Error replacing document: ', error);
    }
  }


  takeCard() {
    if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop();
      this.game.pickCardAnimation = true;
      // console.log('New Card', this.currentCard);
      // console.log('game is', this.game);
      this.saveGame();

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      setTimeout(() => {
        if (this.game.currentCard != undefined) {
          this.game.playedCards.push(this.game.currentCard);
        }
        this.game.pickCardAnimation = false;
        this.saveGame();
      }, 1000);

    }
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    dialogRef.afterClosed().subscribe((name: string) => {
      console.log('The dialog was closed');
      if (name) {
        this.game.players.push(name);
        this.saveGame();
      }
    });
  }


}



