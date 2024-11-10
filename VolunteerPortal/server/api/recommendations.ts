import { defineEventHandler } from 'h3'
import { collection, query, where, getDocs } from 'firebase/firestore'
// Adjust this import based on your Firebase setup
import { db } from '~/server/firebase/config'
export default defineEventHandler(async (event) => {

  const { userPreferences } = await readBody(event)

  if (!userPreferences || !userPreferences.skills || !userPreferences.interests) {
    return []
  }

  const eventsRef = collection(db, 'events')
  const q = query(
    eventsRef,
    where('skills', 'array-contains-any', userPreferences.skills),
    where('interests', 'array-contains-any', userPreferences.interests)
  )

  const querySnapshot = await getDocs(q)
  const recommendedEvents = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))

  // Sort events by relevance
  recommendedEvents.sort((a, b) => {
    const aScore = countMatches(a, userPreferences)
    const bScore = countMatches(b, userPreferences)
    return bScore - aScore
  })

  return recommendedEvents.slice(0, 10) // Return top 10 recommendations
})

function countMatches(event, userPreferences) {
  const skillMatches = event.skills.filter(skill => userPreferences.skills.includes(skill)).length
  const interestMatches = event.interests.filter(interest => userPreferences.interests.includes(interest)).length
  return skillMatches + interestMatches
}