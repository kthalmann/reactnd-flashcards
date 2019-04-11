import React, { Component } from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components/native'

const CardText = styled.Text`
  font-size: 30px;
  line-height: 45px;
  font-weight: bold;
  text-align: center;
`

class Card extends Component {
  render() {
    const { question, answer, style } = this.props

    return (
      <View style={style}>
        <CardText>{question}?</CardText>
      </View>
    )
  }
}

export default styled(Card)`
  margin: 20px;
  padding: 40px;
  border: 3px solid;
  border-radius: 10px;
`
