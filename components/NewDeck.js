import React, { Component } from 'react'
import { View, Button } from 'react-native'
import styled from 'styled-components/native'

const StyledText = styled.Text`
  font-size: 36px;
  font-weight: bold;
  margin: 30px;
  text-align: center;
`

const StyledInput = styled.TextInput`
  padding: 20px;
  height: 70px;
  font-size: 26px;
  background-color: #f8f8f8;
  text-align: center;
`

export default class NewDeck extends Component {
  state = {
    textInput: ''
  }

  onSubmit = () => {
    const { navigation } = this.props
    const newDeckName = this.state.textInput

    const newDeck = {
      title: newDeckName,
      questions: []
    }

    navigation.state.params.onAddNewDeck(newDeck)

    navigation.replace('Deck', { name: newDeckName })
  }

  render() {
    const { textInput } = this.state

    return (
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <View>
          <StyledText>What is the title of your new deck?</StyledText>
          <StyledInput
            value={textInput}
            placeholder="Enter deck name"
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
