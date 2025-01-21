import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Game } from '../../models/game';
import { Firestore, collectionData, collection, doc, onSnapshot, addDoc, updateDoc, setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {

  private firestore: Firestore = inject(Firestore);

  constructor(private router: Router) { }

  async newGame() {
    let game = new Game();
    await addDoc(collection(this.firestore, 'games'), game.toJson()).catch(
      (err) => { console.error(err) }
    ).then(
      (gameInfo: any) => {
        console.log(gameInfo);
        this.router.navigateByUrl('/game/ ' + gameInfo.id)
      }
    )
  }




}
