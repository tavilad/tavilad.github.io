import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {
  private players: Player[] = [];
  private hands: Hand[] = [];
  public gameStarted: boolean;
  private numbers: number[];
  private numberOfPlayers: object;
  private model: any[];
  private handModel: any[] = [];

  constructor(private modalService: NgbModal) {
  }

  ngOnInit() {
  }


  startGame() {
    console.log(this.model);
    this.model.forEach((player) => {
      console.log(player);
      this.players.push({ name: player, score: 0, phase: 1 });
    });
    console.log(this.players);
    this.hands.push({ players: this.players });
    this.gameStarted = true;
  }

  endHand() {
    let playerTurn = this.players.map(x => Object.assign({}, x));
    for (var i = 0; i < this.handModel.length; i++) {
      playerTurn[i].score += parseInt(this.handModel[i]);
      if (parseInt(this.handModel[i]) < 50) {
        playerTurn[i].phase++;
      }
    }
    this.hands.push({ players: playerTurn });
    this.players = playerTurn.map(x => Object.assign({}, x));
    this.modalService.dismissAll();
  }

  createPlayernameInputs(numberOfPlayers: object) {
    console.log(numberOfPlayers);
    this.numberOfPlayers = numberOfPlayers;
    this.numbers = Array.from(Array(this.numberOfPlayers).keys());
    this.model = Array(this.numberOfPlayers);
    console.log(this.numbers);
    this.handModel = Array(this.numberOfPlayers);
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      console.log(result)
    }, (reason) => {
      console.log(reason);
    });
  }

  undoHand() {
    if (this.hands.length > 1) {
      let playerTurn = this.players.map(x => Object.assign({}, x));
      for (var i = 0; i < this.handModel.length; i++) {
        playerTurn[i].score -= parseInt(this.handModel[i]);
        if (parseInt(this.handModel[i]) < 50) {
          playerTurn[i].phase--;
        }
      }
      this.hands.pop();
      this.players = playerTurn.map(x => Object.assign({}, x));
    } else {
      console.log("No hand to undo");
    }
  }
}

interface Player {
  name: string;
  phase: number;
  score: number;
}

interface Hand {
  players: Player[];
}
