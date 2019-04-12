import { AsyncStorage } from 'react-native'

const DECK_STORAGE_KEY = 'UdacityFlashcards:decks'

export const _getDecks = async () => {
  try {
    const response = await AsyncStorage.getItem(DECK_STORAGE_KEY)
    const parsedResponse = JSON.parse(response)

    const deckArray = Object.keys(parsedResponse).map(
      key => parsedResponse[key]
    )

    return deckArray
  } catch (e) {}
}

export const _getDeck = async deckname => {
  return _getDecks().then(decks => decks.find(deck => deck.title === deckname))
}

export const _addDeck = async entry => {
  try {
    return await AsyncStorage.mergeItem(
      DECK_STORAGE_KEY,
      JSON.stringify({
        [entry.title]: entry
      })
    )
  } catch (e) {}
}

export const _addCardToDeck = async (deckname, card) => {
  try {
    return await _getDeck(deckname).then(deck => {
      deck.questions = [...deck.questions, card]

      return _addDeck(deck, deck.title)
    })
  } catch (e) {}
}
