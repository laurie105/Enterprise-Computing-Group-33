/**
 * Component 4 – ML Feature: Event Recommender
 *
 * Classical recommendation approach: events are scored using category match,
 * capacity fill rate, and event recency. The frontend and API both use the
 * same shared data and scoring function so results stay consistent.
 */

import { NextRequest, NextResponse } from 'next/server'
import { events } from '@/data/events'
import { recommendationMeta, recommendEvents } from '@/lib/recommender'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const interestsParam = searchParams.get('interests') ?? 'Academic,Society,Career'
  const topN = parseInt(searchParams.get('n') ?? '3', 10)

  const userInterests = interestsParam
    .split(',')
    .map(interest => interest.trim())
    .filter(Boolean)

  const recommendations = recommendEvents(events, userInterests, topN)

  return NextResponse.json({
    recommendations,
    meta: {
      ...recommendationMeta,
      user_interests: userInterests,
      generated_at: new Date().toISOString(),
      note: 'Classical recommendation component for CA3 – Nature of Enterprise Computing, Group 33. All event data is fictional.',
    },
  })
}
