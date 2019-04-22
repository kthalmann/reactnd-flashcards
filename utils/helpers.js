import React from 'react'
import styled from 'styled-components/native'
import { AsyncStorage } from 'react-native'
import { Permissions, Notifications } from 'expo'

const NOTIFICATION_KEY = 'UdacityFlashcards:notifications'

export function setLocalNotification() {
  AsyncStorage.removeItem(NOTIFICATION_KEY)
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === 'granted') {
            Notifications.cancelAllScheduledNotificationsAsync()

            // set date for notifications
            let tomorrow = new Date()
            tomorrow.setDate(tomorrow.getDate() + 1)
            tomorrow.setHours(20)
            tomorrow.setMinutes(0)

            Notifications.scheduleLocalNotificationAsync(createNotification(), {
              time: tomorrow,
              repeat: 'day'
            })

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
          } else {
            console.log('Notification Permissions not granted')
          }
        })
      }
    })
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync()
  )
}

function createNotification() {
  return {
    title: "👋 Don't forget to excercise today",
    body: '',
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  }
}

// ******************************
// Reused styled components
// ******************************

export const ButtonContainer = styled.View`
  justify-content: space-between;
  margin: 50px;
  height: 100px;
`
