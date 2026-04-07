// questions from here will be fetched if API fails or returns no results
export const sampleQuestions = [
  {
    id: 1,
    category: 'Astronomy',
    question:
      'Which planet is often called the "Morning Star" or the "Evening Star"?',
    image: 'https://picsum.photos/id/1015/600/300',
    options: [
      {
        letter: 'A',
        text: 'Jupiter is the largest planet in our solar system',
      },
      { letter: 'B', text: 'Saturn has the most prominent ring system' },
      { letter: 'C', text: 'Venus is the hottest planet in the system' },
      {
        letter: 'D',
        text: 'Mars is known as the Red Planet due to iron oxide',
      },
    ],
    correct: 'C',
    explanation:
      'Venus is often called the Morning Star or Evening Star because it is the brightest object in the sky after the Sun and Moon.',
  },
  {
    id: 2,
    category: 'Science & Nature',
    question:
      'Which planet in our solar system is famously known as the "Red Planet"?',
    image: 'https://picsum.photos/id/1016/600/300',
    options: [
      { letter: 'A', text: 'Venus' },
      { letter: 'B', text: 'Jupiter' },
      { letter: 'C', text: 'Mars' },
      { letter: 'D', text: 'Saturn' },
    ],
    correct: 'C',
    explanation: 'Mars appears red due to iron oxide (rust) on its surface.',
  },
  {
    id: 3,
    category: 'History',
    question: 'In which year did World War II end?',
    image: 'https://picsum.photos/id/1017/600/300',
    options: [
      { letter: 'A', text: '1944' },
      { letter: 'B', text: '1945' },
      { letter: 'C', text: '1946' },
      { letter: 'D', text: '1947' },
    ],
    correct: 'B',
    explanation:
      'World War II ended in 1945 with the surrender of Japan following the atomic bombings of Hiroshima and Nagasaki.',
  },
  {
    id: 4,
    category: 'Geography',
    question: 'What is the capital city of Australia?',
    image: 'https://picsum.photos/id/1018/600/300',
    options: [
      { letter: 'A', text: 'Sydney' },
      { letter: 'B', text: 'Melbourne' },
      { letter: 'C', text: 'Canberra' },
      { letter: 'D', text: 'Brisbane' },
    ],
    correct: 'C',
    explanation:
      'Canberra is the capital of Australia. It was chosen as the capital in 1908 to be a compromise between Sydney and Melbourne.',
  },
  {
    id: 5,
    category: 'Science & Nature',
    question: 'What is the chemical symbol for gold?',
    image: 'https://picsum.photos/id/1019/600/300',
    options: [
      { letter: 'A', text: 'Go' },
      { letter: 'B', text: 'Gd' },
      { letter: 'C', text: 'Au' },
      { letter: 'D', text: 'Ag' },
    ],
    correct: 'C',
    explanation:
      'The chemical symbol for gold is Au, derived from the Latin word "aurum" meaning gold.',
  },
];
