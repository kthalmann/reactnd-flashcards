import React from 'react'
import { createAppContainer, createStackNavigator } from 'react-navigation'
import DeckList from './components/DeckList'
import NewDeck from './components/NewDeck'
import Deck from './components/Deck'
import Reactotron from './ReactotronConfig'
import NewCard from './components/NewCard'
import Quiz from './components/Quiz'

export default class App extends React.Component {
  render() {
    return <AppContainer />
  }
}

const MainNavigator = createStackNavigator({
  Decks: {
    screen: DeckList,
    navigationOptions: {
      title: 'Decks  '
    }
  },
  Deck: {
    screen: Deck,
    navigationOptions: ({ navigation }) => {
      console.log(navigation)
      return {
        title: `${navigation.state.params.name}    `
      }
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      title: 'New Deck     '
    }
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: {
      title: 'New Card     '
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz     '
    }
  }
})

const AppContainer = createAppContainer(MainNavigator)
