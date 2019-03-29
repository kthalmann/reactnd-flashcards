import React, { Component } from 'react'
import { Text, View, TouchableNativeFeedback, FlatList } from 'react-native'
import { _getDecks } from '../utils/api'
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
  overflow: hidden;
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

export default class DeckList extends Component {
  state = {
    decks: null
  }

  componentDidMount() {
    console.log('DeckList component mounted')

    _getDecks()
      // .then(entries => console.log(entries))
      .then(entries => {
        console.log('retrieved entries: ', entries)
        this.setState({ decks: entries })
      })
  }

  handleOnPress() {}

  renderItem = ({ title, questions }) => (
    <View>
      <Text>{title}</Text>
      <Text>{questions.length} cards</Text>
    </View>
  )

  render() {
    const { decks } = this.state
    const { navigation } = this.props
    console.log('render DeckList')
    console.log('data: ', decks)

    return (
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        {!decks && <Text>No decks</Text>}
        <FlatList
          style={{ flex: 1 }}
          data={decks}
          renderItem={({ item }) => this.renderItem(item)}
        />
        <AddDeckButtonContainer>
          <AddDeckButton onPress={_ => navigation.navigate('NewDeck')} />
        </AddDeckButtonContainer>
      </View>
    )
  }
}
