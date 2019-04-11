import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import { _getDeck } from '../utils/api'
import Card from './Card'
import { ButtonContainer } from '../utils/helpers'
import styled from 'styled-components/native'

const DoneText = styled.Text`
  margin: 50px 0;
  font-size: 70px;
  font-weight: bold;
  text-align: center;
`

const ScoreText = styled.Text`
  margin: 50px;
  font-size: 24px;
  text-align: center;
`

const Score = styled.Text`
  margin: 20px 100px;
  font-size: 70px;
  font-weight: bold;
  color: green;
  text-align: center;
`

const FinishView = ({
  rightAnswers,
  totalAnswers,
  handleRestart,
  navigation
}) => {
  return (
    <View style={{ flex: 1, justifyContent: 'space-between' }}>
      <View>
        <DoneText>DONE!</DoneText>
      </View>
      <View>
        <ScoreText>You answered</ScoreText>
        <Score>{Math.round(100 / totalAnswers * rightAnswers)}%</Score>
        <ScoreText>of the questions correctly</ScoreText>
      </View>
      <ButtonContainer>
        <Button title="Restart quiz" large raised onPress={handleRestart} />
        <Button
          title="Back to decks"
          onPress={_ => navigation.navigate('Decks')}
        />
      </ButtonContainer>
    </View>
  )
}

export default class Quiz extends Component {
  state = {
    deck: null,
    current_card: 1,
    right_answers: 0
  }

  componentDidMount() {
    const deckname = this.props.navigation.state.params.deckname

    _getDeck(deckname).then(deck => this.setState({ deck }))

    console.log(`quiz for ${deckname} mounted`)
  }

  onAnswer = isCorrect => {
    this.setState(previousState => ({
      current_card: previousState.current_card + 1,
      right_answers: isCorrect
        ? previousState.right_answers + 1
        : previousState.right_answers
    }))
  }

  onRestart = _ => {
    this.setState({
      current_card: 1,
      right_answers: 0
    })
  }

  render() {
    const { deck, current_card, right_answers } = this.state

    if (!deck) {
      return <Text>Loading..</Text>
    }

    if (current_card > deck.questions.length) {
      return (
        <FinishView
          rightAnswers={right_answers}
          totalAnswers={deck.questions.length}
          handleRestart={this.onRestart}
          navigation={this.props.navigation}
        />
      )
    }

    return (
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <View>
          <Text style={{ fontSize: 24, textAlign: 'center', margin: 20 }}>
            {current_card}/{deck.questions.length}
          </Text>
          <Card
            question={deck.questions[current_card - 1].question}
            answer={deck.questions[current_card - 1].answer}
          />
        </View>
        <ButtonContainer>
          <Button title="Correct" onPress={_ => this.onAnswer(true)} />
          <Button title="Incorrect" onPress={_ => this.onAnswer(false)} />
        </ButtonContainer>
      </View>
    )
  }
}
