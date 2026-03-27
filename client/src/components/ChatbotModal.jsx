import { useCallback, useEffect, useMemo, useState } from 'react'
import { chatbotQuestions, getRecommendation } from '../lib/chatbotTree'

export default function ChatbotModal({ isOpen, onClose, onProductSelected }) {
  const [stepIndex, setStepIndex] = useState(0)
  const [answers, setAnswers] = useState({})

  const recommendation = useMemo(() => {
    if (stepIndex < chatbotQuestions.length) {
      return null
    }
    return getRecommendation(answers)
  }, [answers, stepIndex])

  const resetAndClose = useCallback(() => {
    setStepIndex(0)
    setAnswers({})
    onClose?.()
  }, [onClose])

  const handleAnswer = (value) => {
    const question = chatbotQuestions[stepIndex]
    const nextAnswers = { ...answers, [question.id]: value }

    setAnswers(nextAnswers)
    setStepIndex((prev) => prev + 1)
  }

  const handleBack = () => {
    if (stepIndex === 0) {
      return
    }

    const questionToRemove = chatbotQuestions[stepIndex - 1]
    const nextAnswers = { ...answers }
    delete nextAnswers[questionToRemove.id]

    setAnswers(nextAnswers)
    setStepIndex((prev) => prev - 1)
  }

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const previousOverflow = document.body.style.overflow
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        resetAndClose()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, resetAndClose])

  if (!isOpen) {
    return null
  }

  const confidenceLabel = recommendation
    ? recommendation.confidence === 'high'
      ? 'High confidence'
      : recommendation.confidence === 'medium'
        ? 'Medium confidence'
        : 'Needs confirmation'
    : null

  const currentQuestion = chatbotQuestions[stepIndex]

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-190 flex items-start justify-center overflow-y-auto bg-black/60 p-3 pt-24 sm:items-center sm:p-4"
      onClick={resetAndClose}
    >
      <div
        className="border-bsi-outline/20 bg-bsi-surface-lowest max-h-[calc(100dvh-2rem)] w-full max-w-xl overflow-y-auto overscroll-contain rounded-2xl border p-4 shadow-2xl sm:max-h-[92vh] sm:p-6 md:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-bsi-accent text-xs font-bold uppercase tracking-[0.16em]">Guided Selector</p>
            <h2 className="font-headline text-bsi-primary mt-2 text-3xl font-extrabold">Help me choose</h2>
          </div>
          <button
            type="button"
            onClick={resetAndClose}
            className="text-bsi-secondary hover:text-bsi-primary rounded-full p-2 transition"
            aria-label="Close chatbot"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {recommendation ? (
          <div className="space-y-5">
            <div className="bg-bsi-primary rounded-xl p-6 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/70">Recommended Product</p>
              <h3 className="font-headline mt-2 text-2xl font-bold">{recommendation.primaryProduct}</h3>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/80">
                Category: {recommendation.category}
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/75">
                Decision Confidence: {confidenceLabel}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-200">{recommendation.description}</p>
              {recommendation.shortlist?.length > 0 ? (
                <p className="mt-3 text-xs text-white/75">
                  Shortlisted models to confirm: {recommendation.shortlist.join(', ')}
                </p>
              ) : null}
              {recommendation.shortlist?.length === 0 && recommendation.products.length > 1 ? (
                <p className="mt-3 text-xs text-white/70">
                  Also suitable models: {recommendation.products.filter((product) => product !== recommendation.primaryProduct).slice(0, 3).join(', ')}
                </p>
              ) : null}
              {recommendation.requiresConfirmation ? (
                <p className="mt-2 text-xs text-white/70">
                  Final model confirmation may require site data such as exact duty cycle, span and hazardous classification.
                </p>
              ) : null}
            </div>

            <button
              type="button"
              onClick={() => {
                onProductSelected?.(recommendation.primaryProduct)
                setStepIndex(0)
                setAnswers({})
              }}
              className="bg-bsi-accent w-full rounded-lg px-4 py-3 text-sm font-bold uppercase tracking-[0.14em] text-white transition hover:opacity-90"
            >
              Enquire for this product
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-5 flex items-center justify-between">
              <p className="text-bsi-secondary text-sm">Step {stepIndex + 1} of {chatbotQuestions.length}</p>
              {stepIndex > 0 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="text-bsi-primary text-xs font-bold uppercase tracking-[0.14em]"
                >
                  Back
                </button>
              ) : null}
            </div>

            <div className="bg-bsi-surface-low mb-5 h-2 w-full rounded-full">
              <div
                className="bg-bsi-accent h-2 rounded-full transition-all"
                style={{ width: `${((stepIndex + 1) / chatbotQuestions.length) * 100}%` }}
              />
            </div>

            <h3 className="font-headline text-bsi-primary mb-4 text-2xl font-bold">{currentQuestion.label}</h3>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {currentQuestion.options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleAnswer(option)}
                  className="border-bsi-outline/40 text-bsi-primary bg-bsi-surface-low rounded-lg border px-4 py-3 text-left text-sm font-semibold transition hover:border-bsi-primary hover:bg-white"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
