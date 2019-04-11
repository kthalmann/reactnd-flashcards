import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import styled from 'styled-components/native'

const StyledText = styled.Text`
  font-size: 42px;
  font-weight: bold;
  margin: 50px;
  text-align: center;
`

const StyledInput = styled.TextInput`
  height: 60px;
  font-size: 36px;
  background-color: #f8f8f8;
  text-align: center;
`

export default class NewCard extends Component {
  state = {
    question: '',
    answer: ''
  }

  onSubmit = _ => {
    const { question, answer } = this.state
    const { navigation } = this.props

    navigation.state.params.handleNewCard({
      question,
      answer
    })

    navigation.goBack()
  }

  render() {
    const { question, answer } = this.state

    return (
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <View>
          <StyledText>Question</StyledText>
          <StyledInput
            value={question}
            placeholder="Enter Question"
            autoFocus={true}
            onChangeText={text => this.setState({ question: text })}
          />
          <StyledText>Answer</StyledText>
          <StyledInput
            value={answer}
            placeholder="Enter Answer"
            autoFocus={true}
            onChangeText={text => this.setState({ answer: text })}
          />
        </View>
        <View style={{ margin: 50 }}>
          <Button title="Submit" onPress={this.onSubmit} />
        </View>
      </View>
    )
  }
}
