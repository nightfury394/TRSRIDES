"use client"

import { useSelector } from "react-redux"
import { LegalPage } from "@/components/legal-page"
import { termsAndConditionsTranslations } from "@/translations/terms-and-conditions"
import type { RootState } from "@/store/store"

export default function TermsAndConditions() {
  const language = useSelector((state: RootState) => state.language.current)
  const t = termsAndConditionsTranslations[language]

  return <LegalPage title={t.title} lastUpdated={t.lastUpdated} content={t.content} />
}

