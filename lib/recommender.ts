import type { CampusEvent } from '@/data/events'

export type RecommendedEvent = CampusEvent & { score: number }

export const recommendationMeta = {
  model: 'popularity-weighted-category-filter',
  features: ['category_match', 'fill_rate', 'recency_score'],
  weights: { category_match: 0.6, fill_rate: 0.3, recency_score: 0.1 },
}

export function scoreEvent(
  event: CampusEvent,
  userInterests: string[],
  today: Date = new Date()
): number {
  const categoryMatch = userInterests.includes(event.category) ? 1 : 0
  const fillRate = event.capacity > 0 ? event.attendees / event.capacity : 0
  const daysUntil = Math.max(
    0,
    (new Date(event.date).getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  )
  const recencyScore = Math.max(0, 1 - daysUntil / 365)

  return (
    recommendationMeta.weights.category_match * categoryMatch +
    recommendationMeta.weights.fill_rate * fillRate +
    recommendationMeta.weights.recency_score * recencyScore
  )
}

export function recommendEvents(
  events: CampusEvent[],
  userInterests: string[],
  limit = 3,
  today: Date = new Date()
): RecommendedEvent[] {
  return [...events]
    .map(event => ({ ...event, score: scoreEvent(event, userInterests, today) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
}
