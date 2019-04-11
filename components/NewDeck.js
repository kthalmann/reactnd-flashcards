import React, { Component } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import styled from 'styled-components/native'
import { _addDeck, _getDecks } from '../utils/api'

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

export default class NewDeck extends Component {
  state = {
    textInput: ''
  }

  onSubmit = () => {
    const { textInput } = this.state

    const newDeck = {
      title: textInput,
      questions: []
    }

    _addDeck(newDeck, textInput)
      .then(_ => {
        console.log('saved new deck')
        _getDecks().then(entries => console.log(entries))
      })
      .then(this.props.navigation.navigate('Decks'))
  }

  render() {
    const { textInput } = this.state

    return (
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <View>
          <StyledText>What is the title of your new deck?</StyledText>
          <StyledInput
            value={textInput}
            placeholder="Enter Name"
            autoFocus={true}
            onChangeText={text => this.setState({ textInput: text })}
          />
        </View>
        <View style={{ margin: 50 }}>
          <Button title="Submit" onPress={this.onSubmit} />
        </View>
      </View>
    )
  }
}
