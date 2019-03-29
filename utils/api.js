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

export const _addDeck = async (entry, key) => {
  try {
    return await AsyncStorage.mergeItem(
      DECK_STORAGE_KEY,
      JSON.stringify({
        [key]: entry
      })
    )
  } catch (e) {}
}

export const _addCard = async () => {
  try {
    await AsyncStorage.setItem(STORE_KEY, 'first save')
  } catch (e) {}
}
