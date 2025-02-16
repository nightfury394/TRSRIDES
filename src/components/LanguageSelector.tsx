import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../store/store"
import { setLanguage } from "../store/slices/languageSlice"

export default function LanguageSelector() {
  const dispatch = useDispatch()
  const currentLanguage = useSelector((state: RootState) => state.language.current)

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => dispatch(setLanguage("en"))}
        className={`px-2 py-1 rounded ${currentLanguage === "en" ? "bg-black text-white" : "bg-gray-100"}`}
      >
        EN
      </button>
      <button
        onClick={() => dispatch(setLanguage("pl"))}
        className={`px-2 py-1 rounded ${currentLanguage === "pl" ? "bg-black text-white" : "bg-gray-100"}`}
      >
        PL
      </button>
    </div>
  )
}

