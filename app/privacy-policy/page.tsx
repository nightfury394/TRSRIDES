"use client"

import { useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import { LegalPage } from "@/components/legal-page"
import { privacyPolicyTranslations } from "../translations/privacy-policy"

export default function PrivacyPolicy() {
  const language = useSelector((state: RootState) => state.language.current)
  const t = privacyPolicyTranslations[language]

  return <LegalPage title={t.title} lastUpdated={t.lastUpdated} content={t.content} />
}

