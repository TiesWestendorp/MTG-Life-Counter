import React from 'react'
import '../stylesheets/menu-screen.css'

class MenuScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      amountOfPlayers: "2",
      startingLife: "20",
    }
  }

  render() {
    return (
      <form className="magic-menu" onSubmit={this.onSubmit}>
        <h1>Magic Life Counter</h1>
        <div className="magic-menu__players">
          <h2>Number of players</h2>
          {this.amountOfPlayersOption("1")}
          {this.amountOfPlayersOption("2")}
          {this.amountOfPlayersOption("3")}
          {this.amountOfPlayersOption("4")}
          {this.amountOfPlayersOption("5")}
          {this.amountOfPlayersOption("6")}
        </div>
        <div className="magic-menu__life">
          <h2>Starting life</h2>
          {this.startingLifeOption("20")}
          {this.startingLifeOption("30")}
          {this.startingLifeOption("40")}
        </div>
        <button type="submit">
          Start game
        </button>
      </form>
    )
  }

  onSubmit = event => {
    event.preventDefault()
    this.props.setAppState({
      screen: "game",
      ...this.state
    })
  }

  onValueChange = variable => event => {
    this.setState({
      [variable]: event.target.value
    })
  }

  amountOfPlayersOption = amount => (
    <label className="magic-menu__players__option">
      <input
        type="radio"
        name="amountOfPlayers"
        value={amount}
        checked={this.state.amountOfPlayers === amount}
        onChange={this.onValueChange("amountOfPlayers")}
      />
      <span>{amount}</span>
    </label>
  )

  startingLifeOption = life => (
    <label className="magic-menu__life__option">
      <input
        type="radio"
        name="startingLife"
        value={life}
        checked={this.state.startingLife === life}
        onChange={this.onValueChange("startingLife")}
      />
      <span>{life}</span>
    </label>
  )
}

export default MenuScreen
