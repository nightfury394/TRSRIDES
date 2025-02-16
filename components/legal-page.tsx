import { Separator } from "@/components/ui/separator"

interface ContentItem {
  title: string
  content: string
}

interface LegalPageProps {
  title: string
  lastUpdated: string
  content: ContentItem[]
}

export function LegalPage({ title, lastUpdated, content }: LegalPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-sm text-muted-foreground mb-6">{lastUpdated}</p>
      <Separator className="my-6" />
      <div className="space-y-8">
        {content.map((item, index) => (
          <section key={index}>
            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
            <p className="text-muted-foreground">{item.content}</p>
          </section>
        ))}
      </div>
    </div>
  )
}

