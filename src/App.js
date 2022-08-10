import React from 'react'

import MenuScreen     from './components/menu-screen'
import GameScreen     from './components/game-screen'

const screens = {
  menu:     MenuScreen,
  game:     GameScreen,
}

class App extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      screen: "menu",
      amountOfPlayers: null,
      startingLife: null,
    }
  }

  render() {
    const Screen = screens[this.state.screen]
    return <Screen setAppState={v=>this.setState(v)} getAppState={()=>this.state} />
  }
}

export default App
