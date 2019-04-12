import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
  FlatList
} from 'react-native'
import { _addDeck, _getDecks } from '../utils/api'
import styled from 'styled-components/native'
import { AntDesign } from '@expo/vector-icons'

const AddDeckButtonContainer = styled.View`
  flex: 1;
  position: absolute;
  width: 100%;
  height: 100%;
  align-items: flex-end;
  justify-content: flex-end;
`

const StyledButtonContent = styled.View`
  width: 70px;
  height: 70px;
  background-color: lightgreen;
  border-radius: 50;
  margin-bottom: 30px;
  margin-right: 30px;
  justify-content: center;
  align-items: center;
`

const AddDeckButton = ({ onPress }) => {
  return (
    <View>
      <TouchableNativeFeedback
        onPress={onPress}
        background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
      >
        <StyledButtonContent>
          <AntDesign name="addfolder" size={32} color="white" />
        </StyledButtonContent>
      </TouchableNativeFeedback>
    </View>
  )
}

const DeckListItemTitle = styled.Text`
  font-size: 42px;
  font-weight: bold;
  text-align: center;
`

const DeckListItemCards = styled.Text`
  font-size: 22px;
  text-align: center;
`

const DeckListItem = ({ name, cardCount, navigation, style }) => {
  return (
    <View style={style}>
      <TouchableOpacity onPress={_ => navigation.navigate('Deck', { name })}>
        <DeckListItemTitle>{name}</DeckListItemTitle>
        <DeckListItemCards>{cardCount} cards</DeckListItemCards>
      </TouchableOpacity>
    </View>
  )
}

const StyledDeckListItem = styled(DeckListItem)`
  height: 150px;
  padding: 30px;
  background-color: #f7f7f7;
  margin-bottom: 1px;
`

export default class DeckList extends Component {
  state = {
    decks: null
  }

  componentDidMount() {
    _getDecks().then(entries => {
      console.log('retrieved entries: ', entries)
      this.setState({ decks: entries })
    })
  }

  addDeck = deck => {
    _addDeck(deck).then(_ => {
      this.setState(previousState => ({
        decks: [...previousState.decks, deck]
      }))
    })
  }

  _keyExtractor = (item, index) => item.title

  renderItem = ({ item }) => (
    <StyledDeckListItem
      name={item.title}
      cardCount={item.questions.length}
      navigation={this.props.navigation}
    />
  )

  render() {
    const { decks } = this.state
    const { navigation } = this.props

    return (
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        {!decks && <Text>No decks</Text>}
        <FlatList
          style={{ flex: 1 }}
          data={decks}
          renderItem={this.renderItem}
          keyExtractor={this._keyExtractor}
        />
        <AddDeckButtonContainer>
          <AddDeckButton
            onPress={_ =>
              navigation.navigate('NewDeck', { onAddNewDeck: this.addDeck })
            }
          />
        </AddDeckButtonContainer>
      </View>
    )
  }
}
