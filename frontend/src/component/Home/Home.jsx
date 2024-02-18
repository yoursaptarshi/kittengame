import React from 'react';

import catcard from"../../images/cat card.png"
import cardback from "../../images/card back.png"
import './Home.css';

import { Link } from 'react-router-dom';

const Home = () => {


  return (
    <div className="home-container">
      <div className="header"><div className="headerContent">
        <div className="heading">
          <Link to="/play" style={{ textDecoration: 'none', color: 'white' }}> <h1 style={{ color: 'white' }}>Play Now</h1></Link>
        </div>

      </div>
      </div>


      <div className="body">
        <div className="body1">
          <div className="body1-interior">
            <div className="body1-heading">
              <h1>What is Exploding Kittens Game?</h1>
            </div>
            <div className="body1-content">
              <div className="body1-image">
                <img src={catcard} alt="Brain Tumor 1" />
              </div>
              <div className="body1-paragraph">
                <p>
                  There will be a button to start the game. When the game is started there will be a deck of 5 cards ordered randomly. Each time user clicks on the deck a card is revealed and that card is removed from the deck. A player wins the game once he draws all 5 cards from the deck and there is no card left to draw.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="body2">
          <div className="body2-interior">
            <div className="body2-heading">
              <h1>Rules:</h1>
            </div>
            <div className="body2-content">
              <div className="body2-paragraph">
                <p>
                  - If the card drawn from the deck is a cat card, then the card is removed from the deck.
                  - If the card is exploding kitten bomb then the player loses the game.
                  - If the card is a defusing card, then the card is removed from the deck. This card can be used to defuse one bomb that may come in subsequent cards drawn from the deck.
                  - If the card is a shuffle card, then the game is restarted and the deck is filled with 5 cards again.

                </p>
              </div>
              <div className="body2-image">
                <img src={cardback} alt="Brain Tumor 2" />
              </div>

            </div>
          </div>
        </div>
        <div className="body3">

        </div>
      </div>



    </div>
  );
};

export default Home;
