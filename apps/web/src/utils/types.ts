export interface Quiz {
  question: string
  options: string[]
  correct_answer: string
  explanation: string
}

export interface Exercise {
  prompt: string
  code_stub: string
  expected_output: string
  tests: string[]
}

export interface Interactivity {
  quizzes: Quiz[]
  exercises: Exercise[]
}

export interface Section {
  title: string
  start_time: string
  end_time: string
  content_summary: string
  interactivity: Interactivity
}

export interface AssessmentItem {
  question: string
  prompt: string
  requirements?: string[]
  sample_data?: unknown[]
}

export interface FinalAssessment {
  type: string
  items: AssessmentItem[]
}

export interface Course {
  course_title: string
  course_description: string
  thumbnail: string
  original_video_url: string
  estimated_duration: string
  prerequisites: string[]
  sections: Section[]
  final_assessment: FinalAssessment
}
