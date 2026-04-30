import { NextResponse } from 'next/server'

const sourceUrl = 'https://www.tudublin.ie/study/a-z-courses/'

const fallbackCourses = [
  'Computer Science (TU856)',
  'Computing (General Entry) (TU859)',
  'Computing (Information Technology) (TU860)',
  'Computing with Machine Learning & Artificial Intelligence (TU862)',
  'Data Science and Artificial Intelligence (TU850)',
  'Business (General Entry) (TU932)',
  'Business & Management (TU903)',
  'Business Computing (TU914)',
  'Engineering (General Entry) (TU805)',
  'Science (General Entry) (TU854)',
]

function decodeHtml(value: string) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&#039;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, ' ')
}

function extractUndergraduateCourses(html: string) {
  const section = html.match(/Undergraduate Courses([\s\S]+?)(Postgraduate Courses|Part-Time Courses|<\/main>)/i)?.[1] ?? html
  const courseMatches = section.matchAll(/<a[^>]*>([\s\S]*?)<\/a>/gi)
  const courses = Array.from(courseMatches)
    .map(match => decodeHtml(match[1].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()))
    .filter(course => /\(TU\d+\)/.test(course))

  return Array.from(new Set(courses)).sort((a, b) => a.localeCompare(b))
}

export async function GET() {
  try {
    const response = await fetch(sourceUrl, {
      next: { revalidate: 60 * 60 * 24 },
      headers: { 'user-agent': 'Campus Companion student project' },
    })

    if (!response.ok) throw new Error('Could not load TU Dublin courses')

    const html = await response.text()
    const courses = extractUndergraduateCourses(html)

    return NextResponse.json({
      source: sourceUrl,
      courses: courses.length > 0 ? courses : fallbackCourses,
    })
  } catch {
    return NextResponse.json({
      source: sourceUrl,
      courses: fallbackCourses,
    })
  }
}
