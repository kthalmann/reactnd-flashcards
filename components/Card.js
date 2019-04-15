import React, { Component } from 'react'
import { View, Text } from 'react-native'
import FlipCard from 'react-native-flip-card'
import styled from 'styled-components/native'

const CardText = styled.Text`
  font-size: 30px;
  line-height: 45px;
  font-weight: bold;
  text-align: center;
`

const CardFront = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const CardBack = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const StyledFlipCard = styled(FlipCard)`
  padding: 20px;
  background-color: #eeeeee;
  border-radius: 15px;
`

class Card extends Component {
  render() {
    const { question, answer, isFlipped, style } = this.props

    return (
      <View style={style}>
        <StyledFlipCard
          flip={isFlipped}
          flipVertical={false}
          flipHorizontal={true}
          clickable={false}
        >
          <CardFront>
            <CardText>{question}?</CardText>
          </CardFront>
          <CardBack>
            <CardText>{answer}</CardText>
          </CardBack>
        </StyledFlipCard>
      </View>
    )
  }
}

export default styled(Card)`
  flex: 1;
  margin: 20px;
`
