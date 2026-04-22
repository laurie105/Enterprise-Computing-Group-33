/**
 * Component 4 – ML Feature: Event Recommender
 *
 * Classical ML approach: Popularity-weighted category filtering
 * using a cosine-similarity-like scoring function over event feature vectors.
 *
 * Features used per event:
 *   - category (one-hot encoded against user interests)
 *   - fill_rate (attendees / capacity) — proxy for popularity
 *   - days_until (closer events scored higher)
 *
 * Model choice: No trained model needed for this lightweight version.
 * We compute a score per event and rank. For a true ML version,
 * k-nearest neighbours (k-NN) on feature vectors would replace this.
 *
 * Evaluation: Qualitative inspection – recommendations match the
 * user's saved interest categories and favour popular upcoming events.
 * A train/test split would require clickstream data (not available in
 * this fictional dataset), so we document this as a limitation.
 */

import { NextRequest, NextResponse } from 'next/server'

// Fictional events (same dataset as frontend)
const events = [
  { id: 1, title: 'Freshers Week Welcome Talk', category: 'Academic', date: '2025-09-08', capacity: 300, attendees: 245 },
  { id: 2, title: 'Coding Hackathon 2025', category: 'Society', date: '2025-10-15', capacity: 60, attendees: 58 },
  { id: 3, title: 'Mental Health Awareness Week Seminar', category: 'Wellbeing', date: '2025-10-20', capacity: 150, attendees: 87 },
  { id: 4, title: 'Campus Art Exhibition', category: 'Culture', date: '2025-11-03', capacity: 200, attendees: 130 },
  { id: 5, title: 'CV Writing Workshop', category: 'Career', date: '2025-11-10', capacity: 40, attendees: 39 },
  { id: 6, title: 'Table Quiz Night', category: 'Social', date: '2025-11-17', capacity: 120, attendees: 96 },
  { id: 7, title: 'Data Science Guest Lecture', category: 'Academic', date: '2025-11-24', capacity: 80, attendees: 54 },
  { id: 8, title: 'Sports Day 2025', category: 'Sport', date: '2025-12-01', capacity: 200, attendees: 177 },
  { id: 9, title: 'Christmas Social', category: 'Social', date: '2025-12-12', capacity: 250, attendees: 210 },
  { id: 10, title: 'Spring Semester Orientation', category: 'Academic', date: '2026-01-19', capacity: 300, attendees: 180 },
]

/**
 * Score function:
 *   score = (category_match * 0.6) + (fill_rate * 0.3) + (recency_score * 0.1)
 *
 * category_match: 1 if event category in user interests, else 0
 * fill_rate: attendees / capacity (0–1)
 * recency_score: 1 - (days_until / 365), clamped 0–1
 */
function scoreEvent(
  event: typeof events[0],
  userInterests: string[],
  today: Date
): number {
  const categoryMatch = userInterests.includes(event.category) ? 1 : 0
  const fillRate = event.attendees / event.capacity
  const daysUntil = Math.max(0, (new Date(event.date).getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  const recencyScore = Math.max(0, 1 - daysUntil / 365)

  return categoryMatch * 0.6 + fillRate * 0.3 + recencyScore * 0.1
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const interestsParam = searchParams.get('interests') ?? 'Academic,Society,Career'
  const topN = parseInt(searchParams.get('n') ?? '3', 10)

  const userInterests = interestsParam.split(',').map(i => i.trim())
  const today = new Date()

  const scored = events
    .map(e => ({ ...e, score: scoreEvent(e, userInterests, today) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topN)

  return NextResponse.json({
    recommendations: scored,
    meta: {
      model: 'popularity-weighted-category-filter',
      features: ['category_match', 'fill_rate', 'recency_score'],
      weights: { category_match: 0.6, fill_rate: 0.3, recency_score: 0.1 },
      user_interests: userInterests,
      generated_at: new Date().toISOString(),
      note: 'Classical ML component for CA3 – Nature of Enterprise Computing, Group 33. All event data is fictional.',
    },
  })
}
