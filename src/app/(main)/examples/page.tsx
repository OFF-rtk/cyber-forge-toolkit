import { TerminalContainer } from "@/components/ui/TerminalContainer"
import TerminalCard from "@/components/ui/TerminalCard"

export default function ExamplesPage() {
  return(
    <div className="flex flex-col space-y-4">
      <section>
        <h2 className="text-2xl text-display mb-8">1. Cards:</h2>
        <TerminalContainer title="TerminalUI - Cards" size="lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <TerminalCard title="Impressions" status="success">
              <p className="text-4xl font-bold">2.3K</p> 
            </TerminalCard>
            <TerminalCard title="Product Status" status="info">
              <p className="text-4xl font-bold">Toolkit WIP</p>
            </TerminalCard>
            <TerminalCard title="Countdown" status="warning">
              <p className="text-4xl font-bold">5 days</p>
            </TerminalCard>
            <TerminalCard title="First Pods" status="error">
              <p className="text-4xl font-bold">0</p>
            </TerminalCard>
          </div>
        </TerminalContainer> 
      </section>

      <div className="bg-black pt-4">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent max-w-4xl mx-auto"></div>
      </div>

      <section>
        <h2 className="text-2xl text-display mb-8">2. Buttons:</h2>
        <TerminalContainer title="TerminalUI - Button Showcase" size="lg">
          <p>This will have all the buttons</p>
        </TerminalContainer>
      </section>
    </div>
  )
} 
