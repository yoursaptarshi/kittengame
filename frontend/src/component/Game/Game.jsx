import React, { useState,useEffect } from 'react'
import {Button} from '@mui/material'
import "./Game.css"
import cardback from '../../images/card back.png'
import bombcard from '../../images/bomb card.png'
import shufflecard from "../../images/shuffle card.png"
import defusecard from "../../images/defuse card.png"
import catcard from "../../images/cat card.png"
import gameovercard from "../../images/gameover.png"
import winnercard from "../../images/winner.png"
import { useDispatch, useSelector } from 'react-redux'
import { drawCard, startGame,scoreboard } from '../../actions/user'

const Game = () => {
  const dispatch = useDispatch();

  const {cards,cardsRemaining,action,cardWithdrawn,points,user,users} = useSelector((state)=>state.user)
  

  const startHandler =()=>{
    document.querySelector(".startPage").style.display='none'
    document.querySelector(".gameArea").style.display='block'
    document.querySelector("#resume_button").style.display='block'
    
    dispatch(startGame())
  }
  const resumeHandler = ()=>{
    document.querySelector(".startPage").style.display='none'
    document.querySelector(".gameArea").style.display='block'
    dispatch(drawCard())
  }
  const cardHandler = ()=>{
    document.querySelector(".gameAreaCards-show").style.display='block'
    document.querySelector(".gameAreaCards-deck").style.display='none'
    setTimeout(() => {
      document.querySelector(".gameAreaCards-show").style.display='none'
      document.querySelector(".gameAreaCards-deck").style.display='block'
    }, 1500);
    dispatch(drawCard())
  }
  const gameOverHandler = ()=>{
    if(cardWithdrawn === 1){
      setTimeout(() => {
        document.querySelector(".gameOverArea").style.display='flex'
      document.querySelector(".gameArea").style.display='none'
      }, 1000);
      
    }
    
  }
  const winnerHandler = ()=>{
    if(cardsRemaining === 0 && cardWithdrawn != 1 ){
      document.querySelector(".WinnerArea").style.display='flex'
      document.querySelector(".gameArea").style.display='none'
      document.querySelector("#resume_button").style.display='none'
      
    }
  }
  useEffect(() => {
    gameOverHandler()

  }, [cardWithdrawn])
  useEffect(()=>{
    
    winnerHandler();
    
    
  },[cardsRemaining])
 useEffect(()=>{
  dispatch(scoreboard())
 
 },[users])

  return (
    <div className="GamePage">
      <div className="scoreboard">
      <h2>ScoreBoard</h2>
       <table>
        <tr>
          <th>User</th>
          <th>Points</th>
        </tr>
        {users ? (users.map((user,index)=>(
        <tr key={index}>
          <td>{user.name}</td>
          <td>{user.points}</td>
        </tr>
        ))):null}
       </table>
      </div>
      <div className="startPage">
      <div className="startPageContainer">
      <div className="pointsPage">
        <h2>Total Points: </h2><h2>{user ? (user.points) : null}</h2>
      </div>
        <div className="startPagebutton">
          <Button variant="contained" id='start_button' onClick={startHandler} style={{marginBottom:'2vh'}}>Start</Button>
          <Button variant="contained" id='resume_button' onClick={resumeHandler}>Resume</Button>
        </div>
      </div>
    </div>
    <div className="gameArea" style={{display:'none'}}>
      <div className="gameAreaContainer">
        <div className="gameAreaCards">
          <div className="gameAreaCards-deck" style={{cursor:'pointer'}} onClick={cardHandler}>
            <img src={cardback}/>
          </div>
          <div className="gameAreaCards-show" style={{display:'none'}}>
            {cardWithdrawn === 0 ? <img src={catcard}/> : null}
            {cardWithdrawn === 1 ? <img src={bombcard}/> : null}
            {cardWithdrawn === 2 ? <img src={defusecard}/> : null}
            {cardWithdrawn === 3 ? <img src={shufflecard}/> : null}
          </div>
        </div>
        <div className="gameAreaCardsRemaining">
          <h3>Cards Remaining: </h3><p>{cardsRemaining}</p>
        </div>
      </div>
    </div>
    <div className="gameOverArea"  style={{display:'none'}}>
      <div className="gameOverContainer">
        <div className="gameOverImage">
          <img src={gameovercard}/> 
        </div>
        <a href='/play'><Button variant="contained">Start</Button></a> 
      </div>
    </div>
    <div className="WinnerArea" style={{display:'none'}}>
      <div className="winnerAreaContainer">
        <div className="winnerAreaImage">
          <img src={winnercard}/>
        </div>
       <a href='/play'><Button variant="contained">Start</Button></a> 
      </div>
    </div>
    </div>
  )
}

export default Game