
export type Certification = {
  id: string;
  name: string;
  code: string;
};

export type Domain = {
  id: string;
  certificationId: string;
  name: string;
  examWeight: number;
};

export type SkillSet = {
  id: string;
  domainId: string;
  name: string;
};

export type Skill = {
  id: string;
  skillSetId: string;
  name: string;
};

export type Question = {
  id: string;
  certificationId: string;
  domainId: string;
  skillSetId: string;
  skillId: string;
  question: string;
  options: string[];
  correctAnswer: string;
};

export type QuizAttempt = {
  id: string;
  userId: string;
  questionId: string;
  selectedAnswer: string;
  isCorrect: boolean;
  answeredAt: string;
};

// ─── Derived / computed types ─────────────────────────────────────────────────

export type SkillStat = {
  skill: Skill;
  skillSet: SkillSet;
  domain: Domain;
  totalAttempts: number;
  correctAttempts: number;
  accuracy: number;
  weaknessScore: number;
};

export type CertTreeNode = {
  certification: Certification;
  domains: Array<{
    domain: Domain;
    skillSets: Array<{
      skillSet: SkillSet;
      skills: Skill[];
    }>;
  }>;
};

export type StudySessionContent = {
  explanation: string;
  lessonSummary: string;
  flashcards: Array<{ front: string; back: string }>;
  quizPlan: Array<{
    questionNumber: number;
    focus: string;
    sampleQuestion: string;
  }>;
};

export type RecentAttempt = {
  attempt: QuizAttempt;
  question: Question;
  skill: Skill;
  skillSet: SkillSet;
  domain: Domain;
};

export type AiFlashcardsContent = {
  flashcards: Array<{ front: string; back: string }>;
};
