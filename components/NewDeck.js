import React, { Component } from 'react'
import { View, Text, TextInput, Button } from 'react-native'
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

export default class NewDeck extends Component {
  state = {
    textInput: ''
  }

  onSubmit = () => {
    const { navigation } = this.props

    const newDeck = {
      title: this.state.textInput,
      questions: []
    }

    navigation.state.params.onAddNewDeck(newDeck)

    navigation.navigate('Decks')
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
          <Button
            title="Submit"
            onPress={this.onSubmit}
            disabled={!textInput.length}
          />
        </View>
      </View>
    )
  }
}
