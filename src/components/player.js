import React from 'react'
import '../stylesheets/player.css'
import '../stylesheets/balloon.css'

import { ReactComponent as CommanderImage }  from '../images/commander.svg'
import { ReactComponent as HeartImage }      from '../images/like.svg'
import { ReactComponent as PoisonImage }     from '../images/virus.svg'
import experience_image from '../images/experience.png'

import { get, set } from '../helpers'

function Player(props) {
  const { index, layout, setPlayerState, getPlayerState, display, name, life, poison, experience, commander, balloon } = props

  const playerClassName   = "player player--" + (index+1)
  const contentsClassName = "player__contents " + layout

  const changeAmount  = value => event => setPlayerState(set(getPlayerState(), display, get(props, display, 0) + value))
  const setDisplay    = value => event => setPlayerState({...getPlayerState(), balloon: false, display: value})
  const toggleBalloon =          event => setPlayerState({...getPlayerState(), balloon: !balloon, display: balloon && display.startsWith("commander.") ? "life" : display})

  return (
    <div className={playerClassName}>
      <div className={contentsClassName}>
        <header className="player__name"><h4>{name}</h4></header>
        <div className="player__life">
          <button className="player__life_item player__life_item--negative change" onClick={changeAmount(-5)}>-5</button>
          <button className="player__life_item player__life_item--negative change" onClick={changeAmount(-1)}>-1</button>
          <button className="player__life_item amount">{get(props, display, 0)}</button>
          <button className="player__life_item player__life_item--positive change" onClick={changeAmount(1)}>+1</button>
          <button className="player__life_item player__life_item--positive change" onClick={changeAmount(5)}>+5</button>
        </div>
        <div className="player__misc">
          <button className={`player__counter ${display==="life" ? "player__counter--selected ": ""}life`}                       onClick={setDisplay("life")}>
            <div className="player__counter_contents">
              <HeartImage />
              <span>{life}</span>
            </div>
          </button>
          <button className={`player__counter ${display==="poison" ? "player__counter--selected ": ""}poison`}                   onClick={setDisplay("poison")}>
            <div className="player__counter_contents">
              <PoisonImage />
              <span>{poison}</span>
            </div>
          </button>
          <button className={`player__counter ${display==="experience" ? "player__counter--selected ": ""}experience`}           onClick={setDisplay("experience")}>
            <div className="player__counter_contents">
              <img src={experience_image} alt="" />
              <span>{experience}</span>
            </div>
          </button>
          <button className={`player__counter ${display.startsWith("commander.") ? "player__counter--selected ": ""}commander`} onClick={toggleBalloon}>
            <div className="player__counter_contents">
              <CommanderImage />
              <span>{Math.max(...commander)}</span>
            </div>
          </button>
        </div>
        {balloon && <div className="balloon">
            {commander.map((damage, index) => (
              <button key={index} className={`player__counter player__counter--${index+1} commander`} onClick={setDisplay("commander."+index)}>
                <div className="player__counter_contents">
                  <CommanderImage />
                  <span>{damage}</span>
                </div>
              </button>
            ))}
        </div>}
      </div>
    </div>
  )
}

export default Player
