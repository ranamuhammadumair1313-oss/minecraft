import React from 'react';
import { ArrowLeft, ArrowRight, Bookmark } from 'lucide-react';
import { ArtworkBanner } from '../components/ArtworkBanner';
import { RelatedLinksPanel } from '../components/RelatedLinksPanel';
import { useStudio } from '../context/StudioContext';
import { GUIDE_CHAPTERS } from '../data/guides';

export const GuideDetailView: React.FC = () => {
  const { activeGuideId, navigate, isFavorite, toggleFavorite } = useStudio();
  const idx = GUIDE_CHAPTERS.findIndex((g) => g.id === activeGuideId);
  const guide = idx >= 0 ? GUIDE_CHAPTERS[idx] : GUIDE_CHAPTERS[0];
  const prevGuide = idx > 0 ? GUIDE_CHAPTERS[idx - 1] : null;
  const nextGuide = idx >= 0 && idx < GUIDE_CHAPTERS.length - 1 ? GUIDE_CHAPTERS[idx + 1] : null;
  const saved = isFavorite('guide', guide.id);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => navigate('guides')}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All 19 Guides</span>
        </button>
        <span className="text-xs font-mono text-slate-400">
          Chapter {String(guide.order).padStart(2, '0')} · {guide.readTime}
        </span>
      </div>

      <div className="rounded-xl border border-white/10 bg-[#0F1412] overflow-hidden">
        <div className="h-56 sm:h-64 relative">
          <ArtworkBanner artworkKey={guide.heroImage} className="w-full h-full" />
        </div>

        <div className="p-6 sm:p-10 space-y-8">
          <header className="space-y-4 border-b border-white/10 pb-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="text-xs font-mono text-emerald-400 mb-1.5">
                  {guide.category} · Java {guide.minVersion}
                </div>
                <h1 className="font-display text-3xl sm:text-4xl font-bold text-white text-balance">
                  {guide.title}
                </h1>
              </div>

              <button
                type="button"
                onClick={() => toggleFavorite('guide', guide.id, guide.title)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
                  saved
                    ? 'bg-emerald-600 border-emerald-400 text-white'
                    : 'bg-[#141C18] border-white/10 text-slate-200 hover:border-emerald-500/50'
                }`}
              >
                <Bookmark className="w-4 h-4" />
                <span>{saved ? 'Saved' : 'Save Guide'}</span>
              </button>
            </div>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-prose">
              {guide.summary}
            </p>
          </header>

          {/* Editorial Sections (65-75ch readable column) */}
          <div className="space-y-8 max-w-prose">
            {guide.sections.map((sec, sIdx) => (
              <section key={sIdx} className="space-y-3">
                <h2 className="font-display text-xl sm:text-2xl font-semibold text-white">
                  {sec.heading}
                </h2>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {sec.content}
                </p>

                {sec.bullets && (
                  <ul className="space-y-2 pt-1">
                    {sec.bullets.map((b, bIdx) => (
                      <li
                        key={bIdx}
                        className="text-sm sm:text-base text-slate-200 pl-4 border-l border-emerald-500/40 leading-relaxed"
                      >
                        {b}
                      </li>
                    ))}
                  </ul>
                )}

                {sec.codeOrCommand && (
                  <pre className="p-4 rounded-lg bg-[#07090A] border border-white/10 text-xs sm:text-sm font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                    {sec.codeOrCommand}
                  </pre>
                )}

                {sec.table && (
                  <div className="overflow-x-auto rounded-lg border border-white/10 bg-[#0A0E0C] mt-3">
                    <table className="w-full text-left border-collapse text-xs sm:text-sm">
                      <thead>
                        <tr className="border-b border-white/10 bg-[#111715] text-slate-300">
                          {sec.table.headers.map((h) => (
                            <th key={h} className="px-4 py-2.5 font-semibold">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {sec.table.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-white/[0.02]">
                            {row.map((cell, cIdx) => (
                              <td
                                key={cIdx}
                                className={`px-4 py-2.5 ${
                                  cIdx === 0
                                    ? 'font-semibold text-white'
                                    : 'text-slate-300 tabular-nums'
                                }`}
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            ))}
          </div>

          <RelatedLinksPanel ids={guide.relatedIds} title="Continue Exploring Related Entries" />

          {/* Chapter Prev / Next Navigation */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {prevGuide ? (
              <button
                type="button"
                onClick={() => navigate('guide-detail', prevGuide.id)}
                className="flex items-center gap-2 px-4 py-3 rounded-lg border border-white/10 bg-[#111715] hover:border-emerald-500/50 text-left transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-[11px] text-slate-400">Previous Chapter</div>
                  <div className="text-sm font-medium text-white">{prevGuide.title}</div>
                </div>
              </button>
            ) : (
              <div />
            )}

            {nextGuide && (
              <button
                type="button"
                onClick={() => navigate('guide-detail', nextGuide.id)}
                className="flex items-center justify-end gap-2 px-4 py-3 rounded-lg border border-white/10 bg-[#111715] hover:border-emerald-500/50 text-right transition-colors cursor-pointer"
              >
                <div>
                  <div className="text-[11px] text-slate-400">Next Chapter</div>
                  <div className="text-sm font-medium text-white">{nextGuide.title}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-400 shrink-0" />
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
