"use client"

import { useSelector } from "react-redux"
import { LegalPage } from "@/components/legal-page"
import type { RootState } from "@/store/store"
import { cookiesPolicyTranslations } from "../translations/cookies-policy"

export default function CookiesPolicy() {
  const language = useSelector((state: RootState) => state.language.current)
  const t = cookiesPolicyTranslations[language]

  return <LegalPage title={t.title} lastUpdated={t.lastUpdated} content={t.content} />
}

