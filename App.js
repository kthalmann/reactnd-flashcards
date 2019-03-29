import React from 'react'
import { createAppContainer, createStackNavigator } from 'react-navigation'
import DeckList from './components/DeckList'
import NewDeck from './components/NewDeck'
import Reactotron from './ReactotronConfig'

export default class App extends React.Component {
  render() {
    return <AppContainer />
  }
}

const MainNavigator = createStackNavigator({
  Decks: {
    screen: DeckList,
    navigationOptions: {
      title: 'Decks'
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      title: 'New Deck'
    }
  }
})

const AppContainer = createAppContainer(MainNavigator)
