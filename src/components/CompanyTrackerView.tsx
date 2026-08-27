import React, { useState } from "react";
import { Building2, Plus, Search, Filter, Trash2, ExternalLink, Calendar, DollarSign, Sparkles } from "lucide-react";
import { CompanyApplication } from "../types";
import { triggerConfetti } from "../utils/helpers";

interface CompanyTrackerViewProps {
  applications: CompanyApplication[];
  onAddApplication: (app: CompanyApplication) => void;
  onUpdateStatus: (id: string, status: CompanyApplication["status"]) => void;
  onDeleteApplication: (id: string) => void;
}

const STATUS_COLORS: Record<CompanyApplication["status"], { bg: string; text: string; border: string }> = {
  Applied: { bg: "bg-slate-800", text: "text-slate-300", border: "border-slate-700" },
  "OA Round": { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20" },
  "Tech Round 1": { bg: "bg-sky-500/10", text: "text-sky-400", border: "border-sky-500/20" },
  "Tech Round 2": { bg: "bg-indigo-500/10", text: "text-indigo-400", border: "border-indigo-500/20" },
  "HR Round": { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/20" },
  Offered: { bg: "bg-emerald-500/20", text: "text-emerald-300", border: "border-emerald-500/30" },
  Rejected: { bg: "bg-rose-500/10", text: "text-rose-400", border: "border-rose-500/20" },
};

const TIER_BADGES: Record<CompanyApplication["tier"], string> = {
  "Tier 1 (Dream)": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "Tier 2 (Core)": "bg-sky-500/10 text-sky-400 border-sky-500/20",
  "Tier 3 (Mass)": "bg-slate-800 text-slate-400 border-slate-700",
  "Off-Campus Startup": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "Off-Campus MNC": "bg-blue-500/10 text-blue-400 border-blue-500/20",
};

export const CompanyTrackerView: React.FC<CompanyTrackerViewProps> = ({
  applications,
  onAddApplication,
  onUpdateStatus,
  onDeleteApplication,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [tierFilter, setTierFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [formData, setFormData] = useState<Partial<CompanyApplication>>({
    company: "",
    role: "SDE / Software Engineer",
    tier: "Tier 1 (Dream)",
    status: "Applied",
    appliedDate: new Date().toISOString().split("T")[0],
    packageLPA: "",
    notes: "",
    jobLink: "",
  });

  const filteredApps = applications.filter((app) => {
    const matchesSearch =
      app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (app.notes && app.notes.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTier = tierFilter === "ALL" || app.tier === tierFilter;
    const matchesStatus = statusFilter === "ALL" || app.status === statusFilter;
    return matchesSearch && matchesTier && matchesStatus;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.company?.trim()) return;

    const newApp: CompanyApplication = {
      id: `app_${Date.now()}`,
      company: formData.company.trim(),
      role: formData.role?.trim() || "Software Engineer",
      tier: formData.tier as any,
      status: formData.status as any,
      appliedDate: formData.appliedDate || new Date().toISOString().split("T")[0],
      packageLPA: formData.packageLPA?.trim() || "",
      notes: formData.notes?.trim() || "",
      jobLink: formData.jobLink?.trim() || "",
    };

    onAddApplication(newApp);
    if (newApp.status === "Offered") triggerConfetti();
    setFormData({
      company: "",
      role: "SDE / Software Engineer",
      tier: "Tier 1 (Dream)",
      status: "Applied",
      appliedDate: new Date().toISOString().split("T")[0],
      packageLPA: "",
      notes: "",
      jobLink: "",
    });
    setShowAddModal(false);
  };

  return (
    <div className="space-y-5">
      {/* Header with Search and Filters */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-sky-400" />
              Company Drives & Off-Campus Pipeline
            </h2>
            <p className="text-xs text-slate-400">
              Track rounds, test links, scheduled interviews, and compensation.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-2 bg-sky-600 border border-sky-500 rounded-lg text-xs font-bold text-white hover:bg-sky-500 transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-sm self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Application</span>
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-slate-800">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search company, role or notes..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
            />
          </div>

          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-sky-500"
          >
            <option value="ALL">All Tiers / Categories</option>
            <option value="Tier 1 (Dream)">Tier 1 (Dream)</option>
            <option value="Tier 2 (Core)">Tier 2 (Core)</option>
            <option value="Tier 3 (Mass)">Tier 3 (Mass)</option>
            <option value="Off-Campus Startup">Off-Campus Startup</option>
            <option value="Off-Campus MNC">Off-Campus MNC</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-sky-500"
          >
            <option value="ALL">All Round Statuses</option>
            <option value="Applied">Applied</option>
            <option value="OA Round">OA Round</option>
            <option value="Tech Round 1">Tech Round 1</option>
            <option value="Tech Round 2">Tech Round 2</option>
            <option value="HR Round">HR Round</option>
            <option value="Offered">Offered</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Applications Cards Grid */}
      {filteredApps.length === 0 ? (
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-10 text-center space-y-2">
          <Building2 className="w-8 h-8 text-slate-600 mx-auto" />
          <p className="text-sm font-medium text-slate-300">No applications match your filter</p>
          <p className="text-xs text-slate-500">
            Click "Add Application" to record a new on-campus drive or off-campus submission.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredApps.map((app) => {
            const statusStyle = STATUS_COLORS[app.status];
            const tierStyle = TIER_BADGES[app.tier] || "bg-slate-800 text-slate-400";

            return (
              <div
                key={app.id}
                className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700 transition-all shadow-sm space-y-3"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        {app.company}
                        {app.jobLink && (
                          <a
                            href={app.jobLink.startsWith("http") ? app.jobLink : `https://${app.jobLink}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-slate-400 hover:text-sky-400"
                            title="Open Link"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </h3>
                      <p className="text-xs text-slate-400 font-medium">{app.role}</p>
                    </div>

                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${tierStyle}`}>
                      {app.tier.split(" ")[0]}
                    </span>
                  </div>

                  {/* Details Badges */}
                  <div className="flex flex-wrap items-center gap-2 mt-2.5 text-xs text-slate-400">
                    <span className="flex items-center gap-1 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      {app.appliedDate}
                    </span>
                    {app.packageLPA && (
                      <span className="flex items-center gap-1 bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-emerald-400 font-medium">
                        <DollarSign className="w-3 h-3" />
                        {app.packageLPA} LPA
                      </span>
                    )}
                  </div>

                  {app.notes && (
                    <p className="text-xs text-slate-300 bg-slate-950/40 border border-slate-800 p-2.5 rounded-lg mt-3 line-clamp-2">
                      {app.notes}
                    </p>
                  )}
                </div>

                {/* Bottom Row: Status Selector & Actions */}
                <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-500 font-medium">Status:</span>
                    <select
                      value={app.status}
                      onChange={(e) => {
                        const newStatus = e.target.value as CompanyApplication["status"];
                        onUpdateStatus(app.id, newStatus);
                        if (newStatus === "Offered") triggerConfetti();
                      }}
                      className={`text-xs font-bold px-2.5 py-1 rounded-lg border focus:outline-none cursor-pointer uppercase tracking-wider ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}
                    >
                      <option value="Applied">Applied</option>
                      <option value="OA Round">OA Round</option>
                      <option value="Tech Round 1">Tech Round 1</option>
                      <option value="Tech Round 2">Tech Round 2</option>
                      <option value="HR Round">HR Round</option>
                      <option value="Offered">🎉 Offered</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>

                  <button
                    onClick={() => {
                      if (confirm(`Delete application for ${app.company}?`)) {
                        onDeleteApplication(app.id);
                      }
                    }}
                    className="p-1.5 text-slate-500 hover:text-rose-400 rounded transition-colors"
                    title="Delete Application"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Application Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleAddSubmit}
            className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Building2 className="w-4 h-4 text-sky-400" /> Log Application / Campus Drive
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Company Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g. Cisco, Wells Fargo, Swiggy"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Role / Profile
                </label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="e.g. SDE-1 / Graduate Engineer"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Tier / Category</label>
                <select
                  value={formData.tier}
                  onChange={(e) => setFormData({ ...formData, tier: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-sky-500"
                >
                  <option value="Tier 1 (Dream)">Tier 1 (Dream)</option>
                  <option value="Tier 2 (Core)">Tier 2 (Core)</option>
                  <option value="Tier 3 (Mass)">Tier 3 (Mass)</option>
                  <option value="Off-Campus Startup">Off-Campus Startup</option>
                  <option value="Off-Campus MNC">Off-Campus MNC</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Initial Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-sky-500"
                >
                  <option value="Applied">Applied</option>
                  <option value="OA Round">OA Round</option>
                  <option value="Tech Round 1">Tech Round 1</option>
                  <option value="Tech Round 2">Tech Round 2</option>
                  <option value="HR Round">HR Round</option>
                  <option value="Offered">Offered</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Applied Date</label>
                <input
                  type="date"
                  value={formData.appliedDate}
                  onChange={(e) => setFormData({ ...formData, appliedDate: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">CTC / Package (LPA)</label>
                <input
                  type="text"
                  value={formData.packageLPA}
                  onChange={(e) => setFormData({ ...formData, packageLPA: e.target.value })}
                  placeholder="e.g. 14 or 18-22"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Job Link / Portal URL</label>
              <input
                type="text"
                value={formData.jobLink}
                onChange={(e) => setFormData({ ...formData, jobLink: e.target.value })}
                placeholder="https://..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Notes / Exam Syllabus / Referral Contact</label>
              <textarea
                rows={2}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="e.g. HackerRank test scheduled for Saturday. Referral by John Doe on LinkedIn."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-sky-500"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!formData.company?.trim()}
                className="px-4 py-2 bg-sky-600 border border-sky-500 rounded-lg text-xs font-bold text-white hover:bg-sky-500 disabled:opacity-40"
              >
                Save Application
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
