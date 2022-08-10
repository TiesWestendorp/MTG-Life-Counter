import React from 'react'
import '../stylesheets/game-screen.css'

import { range } from '../helpers'

import Player from './player'

const layouts = {
  1: ["down"],
  2: ["up", "down"],
  3: ["left", "right", "down"],
  4: ["left", "right", "left", "right"],
  5: ["left", "right", "left", "right", "down"],
  6: ["left", "right", "left", "right", "left", "right"],
}

class GameScreen extends React.Component {
  constructor(props) {
    super(props)

    const appState = this.props.getAppState()
    let { amountOfPlayers, startingLife } = appState
    amountOfPlayers = parseInt(amountOfPlayers)
    startingLife    = parseInt(startingLife)

    this.INITIAL_STATE = { showStartingPlayer: false }
    range(amountOfPlayers).forEach(index => {
      this.INITIAL_STATE[index] = {
        display: "life",
        name: "Player " + (index+1),
        life: startingLife,
        poison: 0,
        experience: 0,
        commander: new Array(amountOfPlayers).fill(0),
        balloon: false,
      }
    })

    this.state = this.INITIAL_STATE
  }

  render() {
    const appState = this.props.getAppState()
    let { amountOfPlayers } = appState
    amountOfPlayers = parseInt(amountOfPlayers)

    return (
      <div className="magic-game">
        <div className={"magic-game__starting-player" + (this.state.showStartingPlayer ? "" : " magic-game__starting-player--hide")}>
          <div className="magic-game__starting-player__contents">
            Player {this.state.startingPlayer}
          </div>
        </div>
        <main className={`magic-game__players magic-game__players--${this.props.getAppState().amountOfPlayers}`}>
          {range(amountOfPlayers).map(index => (
            <Player
              key={index}
              index={index}
              layout={layouts[amountOfPlayers][index]}
              setPlayerState={v=>this.setState({[index]: v})}
              getPlayerState={()=>this.state[index]}
              {...this.state[index]}
            />
          ))}
        </main>
        <footer className="magic-game__settings">
          <button onClick={this.startingPlayer}>Start</button>
          <button onClick={this.reset}>Reset</button>
          <button onClick={this.back}>Back</button>
        </footer>
      </div>
    )
  }

  startingPlayer = () => {
    let { amountOfPlayers } = this.props.getAppState()
    amountOfPlayers = parseInt(amountOfPlayers)
    this.setState({ startingPlayer: Math.floor(Math.random()*amountOfPlayers) + 1, showStartingPlayer: true })
    setTimeout(() => this.setState({ showStartingPlayer: false }), 2000)
  }

  back = () => {
    if (window.confirm('Are you sure?')) {
      this.props.setAppState({ ...this.props.getAppState(), screen: "menu" })
    }
  }

  reset = () => {
    if (window.confirm('Are you sure?')) {
      this.setState(this.INITIAL_STATE)
    }
  }
}

export default GameScreen
