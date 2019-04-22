import React, { Component } from 'react'
import { View, Text, Button, TouchableOpacity } from 'react-native'
import { _getDeck } from '../utils/api'
import Card from './Card'
import {
  ButtonContainer,
  clearLocalNotification,
  setLocalNotification
} from '../utils/helpers'
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
          title="Back to deck"
          onPress={_ => navigation.navigate('Deck')}
        />
      </ButtonContainer>
    </View>
  )
}

const FlipText = styled.Text`
  font-size: 20px;
  text-align: center;
  color: #000;
`

export default class Quiz extends Component {
  state = {
    deck: null,
    currentCard: 1,
    rightAnswers: 0,
    isFlipped: false,
    isFinished: false
  }

  componentDidMount() {
    const deckname = this.props.navigation.state.params.deckname

    _getDeck(deckname).then(deck => this.setState({ deck }))
  }

  onFlip = _ => {
    this.setState({
      isFlipped: !this.state.isFlipped
    })
  }

  onAnswer = isCorrect => {
    const isFinished =
      this.state.currentCard + 1 > this.state.deck.questions.length

    this.setState(previousState => ({
      isFlipped: false,
      isFinished,
      currentCard: previousState.currentCard + 1,
      rightAnswers: isCorrect
        ? previousState.rightAnswers + 1
        : previousState.rightAnswers
    }))

    // if quiz finished -> clear notifications for today + add new one for tomorrow
    isFinished && clearLocalNotification().then(setLocalNotification())
  }

  onRestart = _ => {
    this.setState({
      isFinished: false,
      currentCard: 1,
      rightAnswers: 0
    })
  }

  render() {
    const {
      deck,
      currentCard,
      rightAnswers,
      isFlipped,
      isFinished
    } = this.state

    if (!deck) {
      return <Text>Loading..</Text>
    }

    const questionCount = deck.questions.length

    if (isFinished) {
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
        </View>
        <View style={{ flex: 1 }}>
          <Card
            question={deck.questions[currentCard - 1].question}
            answer={deck.questions[currentCard - 1].answer}
            isFlipped={isFlipped}
          />
          <TouchableOpacity onPress={this.onFlip}>
            <FlipText>{isFlipped ? 'Show question' : 'Show answer'}</FlipText>
          </TouchableOpacity>
        </View>
        <ButtonContainer>
          <Button title="Correct" onPress={_ => this.onAnswer(true)} />
          <Button title="Incorrect" onPress={_ => this.onAnswer(false)} />
        </ButtonContainer>
      </View>
    )
  }
}
