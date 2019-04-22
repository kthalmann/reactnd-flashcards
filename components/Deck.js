import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import styled from 'styled-components/native'
import { _addCardToDeck, _getDeck } from '../utils/api'
import { ButtonContainer } from '../utils/helpers'

const DeckTitle = styled.Text`
  font-size: 42px;
  font-weight: bold;
  text-align: center;
`

const CardCount = styled.Text`
  font-size: 22px;
  text-align: center;
  color: #666;
`

export default class Deck extends Component {
  state = {
    title: null,
    questions: null
  }

  componentDidMount() {
    _getDeck(this.props.navigation.state.params.name).then(deck => {
      this.setState(deck)
    })
  }

  addNewCard = card => {
    this.setState(previousState => ({
      questions: [...previousState.questions, card]
    }))

    _addCardToDeck(this.state.title, card)
  }

  render() {
    const { navigation } = this.props
    const { title, questions } = this.state

    if (null === title) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      )
    }

    return (
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <View style={{ marginVertical: 100 }}>
          <DeckTitle>{title}</DeckTitle>
          <CardCount>{questions.length} cards</CardCount>
        </View>
        <ButtonContainer>
          <Button
            title="Start quiz"
            disabled={questions.length < 1}
            onPress={_ => navigation.navigate('Quiz', { deckname: title })}
          />
          <Button
            title="Add card"
            onPress={_ =>
              navigation.navigate('NewCard', {
                deck: title,
                handleNewCard: this.addNewCard
              })
            }
          />
        </ButtonContainer>
      </View>
    )
  }
}
