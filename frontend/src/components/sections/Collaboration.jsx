import { Mail, Users, GitBranch, MessageSquare } from 'lucide-react';

export const Collaboration = () => {
  return (
    <section className="py-16 lg:py-24 bg-white" data-testid="collaboration-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-xs font-bold uppercase tracking-wider text-teal-700 mb-4">
            UNIFIED COLLABORATION
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 text-gray-900 leading-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            From Email Fragmentation to Shared Evidence Command
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Critical records are dispersed across years of unstructured communications. VeriCase brings project teams, solicitors, counsel and experts into one workspace, where discussion takes place on the evidence itself rather than in separate email chains.
          </p>
        </div>

        {/* Problem → Solution Flow */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* The Challenge */}
          <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <Mail className="w-8 h-8 text-gray-600" />
              <h3 className="text-xl font-bold text-gray-900">The Correspondence Trap</h3>
            </div>
            
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="text-gray-400 mt-1" aria-hidden="true">×</span>
                <span className="text-sm leading-relaxed">Evidence scattered across custodians, years of email chains, and fragmented archives</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gray-400 mt-1" aria-hidden="true">×</span>
                <span className="text-sm leading-relaxed">Loss of project knowledge over multi-year lifecycles and staff turnover</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gray-400 mt-1" aria-hidden="true">×</span>
                <span className="text-sm leading-relaxed">Debating evidence merit in reply-all threads without structured workflow</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gray-400 mt-1" aria-hidden="true">×</span>
                <span className="text-sm leading-relaxed">No record of who reviewed, approved or dismissed evidence, or why</span>
              </li>
            </ul>
          </div>

          {/* The Solution */}
          <div className="bg-gradient-to-br from-teal-50 to-white rounded-xl p-8 border border-teal-200">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-8 h-8 text-teal-700" />
              <h3 className="text-xl font-bold text-gray-900">Shared Evidence Workspace</h3>
            </div>
            
            <ul className="space-y-3 text-gray-800">
              <li className="flex items-start gap-3">
                <span className="text-teal-600 mt-1 font-bold">✓</span>
                <span className="text-sm leading-relaxed font-medium">Legal teams, QS, expert witnesses, and project consultants collaborate in one configured environment</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-teal-600 mt-1 font-bold">✓</span>
                <span className="text-sm leading-relaxed font-medium">Evidence sourced, tagged, discussed, and mapped to Heads of Claim with full team visibility</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-teal-600 mt-1 font-bold">✓</span>
                <span className="text-sm leading-relaxed font-medium">Complete version history preserves the evolution of case strategy and evidentiary decisions</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-teal-600 mt-1 font-bold">✓</span>
                <span className="text-sm leading-relaxed font-medium">Audit-ready trail of all evidence acceptance, dismissal, and rationale</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Key Collaboration Capabilities */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
              <MessageSquare className="w-6 h-6 text-teal-700" />
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-3">Contextual Discussion Threads</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              Mention a colleague on a document and a discussion opens on that document. Each decision to propose, review, accept or set aside evidence is recorded in context and visible to authorised team members.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
              <GitBranch className="w-6 h-6 text-teal-700" />
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-3">Heads-of-Claim Structuring</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              Workspace sections aligned to Heads of Claim. Evidence is mapped and filtered by issue, party, period and contractual context, so every team member works from the same analysis.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-teal-700" />
            </div>
            <h4 className="text-lg font-bold text-gray-900 mb-3">Multi-Party Collaboration</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              Firms, clients, chambers, and experts work from the same configured evidence base. Granular access controls and audit trails ensure security without siloing critical knowledge.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

