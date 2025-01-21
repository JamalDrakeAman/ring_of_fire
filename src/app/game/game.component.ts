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

import { Firestore, collectionData, collection, doc, onSnapshot, addDoc } from '@angular/fire/firestore';
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
  pickCardAnimation = false;
  currentCard: string | undefined = '';
  game: Game = new Game;


  // items$;
  // items;

  unsubList;
  unsubSingle: any;

  private firestore: Firestore = inject(Firestore);

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {
    // // collection variante daten zu halen  / hier wäre zwischen drin noch das Observable möglich 
    // this.items$ = collectionData(this.getGameRef());
    // this.items = this.items$.subscribe((list) => {
    //   list.forEach(element => {
    //     console.log(element);
    //   });
    // })

    this.unsubList = onSnapshot(this.getGameRef(), (list) => {
      list.forEach(element => {
        console.log(element.data());

      });
    });

    // this.unsubSingle = onSnapshot(this.getsingleDocRef("game", "6z0Q1nuhDWOsFtWvFGew"), (element) => {
    //   console.log(element);
    // });
  }


  ngOnInit(): void {
    // this.newGame();
    this.route.params.subscribe((params) => {
      console.log(params['id']);
      let id = params['id'];


      this.unsubList = onSnapshot(this.getGameRef(), (list) => {
        list.forEach(element => {

          console.log('Game Update', element.data());
          let data = element.data();
          this.game.currentPlayer = data['currentPlayer'];
          this.game.playedCards = data['playedCards']
          this.game.players = data['players'];
          this.game.stack = data['stack'];
        });
      });

      // this.unsubSingle = onSnapshot(this.getsingleDocRef("game", id), (element) => {
      //   console.log('Game Update', element.data());
      //   this.game.currentPlayer = element.currentPlayer;
      //   this.game.playedCards = element.currentPlayer;
      //   this.game.players = element.currentPlayer;
      //   this.game.stack = element.stack;
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
    this.unsubSingle();
    this.unsubList();
  }


  async newGame() {
    this.game = new Game();

    await addDoc(this.getGameRef(), this.game.toJson()).catch(
      (err) => { console.error(err) }
    ).then(
      (docRef) => { console.log("Document written with ID: ", docRef?.id) }
    )
  }



  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop();
      this.pickCardAnimation = true;
      // console.log('New Card', this.currentCard);
      // console.log('game is', this.game);

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      setTimeout(() => {
        if (this.currentCard != undefined) {
          this.game.playedCards.push(this.currentCard);
        }
        this.pickCardAnimation = false;
      }, 1000);
    }
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      console.log('The dialog was closed');
      if (name) {
        this.game.players.push(name);
      }
    });
  }


}



