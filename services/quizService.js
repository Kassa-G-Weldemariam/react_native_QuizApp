import { sampleQuestions } from '../data/questions';

export async function fetchQuestions(amount = 10, category, difficulty) {
  try {
    const params = new URLSearchParams({
      amount: amount.toString(),
      type: 'multiple',
    });

    if (category) params.append('category', category.toString());
    if (difficulty) params.append('difficulty', difficulty);

    const response = await fetch(`${API_BASE_URL}?${params}`);
    const data = await response.json();

    if (data.response_code !== 0) {
      throw new Error('Failed to load quiz questions');
    }

    return data.results.map((item, index) => transformQuestion(item, index));
  } catch (error) {
    console.error('Quiz API error:', error);
    return getStaticQuestions(amount);
  }
}

function getStaticQuestions(amount) {
  return sampleQuestions.slice(0, amount).map((question, index) => ({
    ...question,
    id: index + 1,
  }));
}

function transformQuestion(apiQuestion, index) {
  const allAnswers = [
    apiQuestion.correct_answer,
    ...apiQuestion.incorrect_answers,
  ].sort(() => Math.random() - 0.5);

  const options = allAnswers.map((answer, i) => ({
    letter: String.fromCharCode(65 + i),
    text: decodeHtml(answer),
  }));

  const correctLetter =
    options.find(
      (option) => option.text === decodeHtml(apiQuestion.correct_answer)
    )?.letter || 'A';

  return {
    id: index + 1,
    category: apiQuestion.category,
    question: decodeHtml(apiQuestion.question),
    image: `https://picsum.photos/600/300?random=${index + 1}`,
    options,
    correct: correctLetter,
    explanation: null, // API doesn't provide explanations
  };
}

function decodeHtml(html) {
  return html
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&hellip;/g, '…')
    .replace(/&ldquo;/g, '"')
    .replace(/&rdquo;/g, '"')
    .replace(/&lsquo;/g, "'")
    .replace(/&rsquo;/g, "'");
}

const API_BASE_URL = 'https://opentdb.com/api.php';
