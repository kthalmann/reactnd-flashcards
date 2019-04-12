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
  const score = Math.round(100 / totalAnswers * rightAnswers)

  return (
    <View style={{ flex: 1, justifyContent: 'space-between' }}>
      <View>
        <DoneText>DONE!</DoneText>
      </View>
      <View>
        <ScoreText>You answered</ScoreText>
        <Score style={{ color: score > 70 ? 'green' : 'red' }}>{score}%</Score>
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
    currentCard: 1,
    rightAnswers: 0
  }

  componentDidMount() {
    const deckname = this.props.navigation.state.params.deckname

    _getDeck(deckname).then(deck => this.setState({ deck }))
  }

  onAnswer = isCorrect => {
    this.setState(previousState => ({
      currentCard: previousState.currentCard + 1,
      rightAnswers: isCorrect
        ? previousState.rightAnswers + 1
        : previousState.rightAnswers
    }))
  }

  onRestart = _ => {
    this.setState({
      currentCard: 1,
      rightAnswers: 0
    })
  }

  render() {
    const { deck, currentCard, rightAnswers } = this.state

    if (!deck) {
      return <Text>Loading..</Text>
    }

    const questionCount = deck.questions.length

    if (currentCard > questionCount) {
      return (
        <FinishView
          rightAnswers={rightAnswers}
          totalAnswers={questionCount}
          handleRestart={this.onRestart}
          navigation={this.props.navigation}
        />
      )
    }

    return (
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <View>
          <Text style={{ fontSize: 24, margin: 20 }}>
            {questionCount - currentCard}/{questionCount}{' '}
            <Text style={{ fontSize: 18, marginLeft: 20 }}>
              cards remaining
            </Text>
          </Text>
          <Card
            question={deck.questions[currentCard - 1].question}
            answer={deck.questions[currentCard - 1].answer}
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
