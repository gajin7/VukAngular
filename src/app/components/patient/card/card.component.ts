import { Component, OnInit } from '@angular/core';
import { SingleCardResponse } from 'src/app/models/response/cardResponse';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  card: SingleCardResponse = new SingleCardResponse();
  constructor(private cardService : CardService) { }

  ngOnInit(): void {
    this.getCardForCurrentUser();
  }

  getCardForCurrentUser(){
    
    this.cardService.getCardByUserEmail()
      .subscribe((data)=> 
        { 
          this.card = data as SingleCardResponse;
          console.log(this.card)
        } 
      )
  }
}
