import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Tag, ChevronRight } from 'lucide-react';
import { type ChangelogEntry } from '../../data/max-commander-changelog';

interface ChangelogModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: ChangelogEntry[];
}

export const ChangelogModal = ({ isOpen, onClose, data }: ChangelogModalProps) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative w-full max-w-4xl max-h-[85vh] bg-sterling-deep border border-sterling-mist/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-sterling-mist/10 bg-sterling-deep/50 backdrop-blur-md z-10">
                        <div>
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                Change Log
                                <span className="text-xs font-mono bg-sterling-blue/10 text-sterling-blue px-2 py-1 rounded-full border border-sterling-blue/20">
                                    Live Updates
                                </span>
                            </h2>
                            <p className="text-sterling-mist/50 text-sm mt-1">
                                Track the evolution of Max Commander
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/5 rounded-full text-sterling-mist hover:text-white transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                        {data.map((entry, index) => (
                            <div key={entry.version} className="group relative pl-8 border-l-2 border-sterling-mist/5 pb-8 last:pb-0 last:border-0">
                                {/* Timeline Dot */}
                                <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 ${index === 0
                                        ? 'bg-sterling-blue border-sterling-blue shadow-[0_0_10px_rgba(56,189,248,0.5)]'
                                        : 'bg-sterling-deep border-sterling-mist/20 group-hover:border-sterling-mist/50'
                                    } transition-colors`} />

                                {/* Content */}
                                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-3">
                                    <h3 className="text-xl font-bold text-white font-mono tracking-tight">
                                        v{entry.version}
                                    </h3>
                                    <span className="text-sterling-blue font-medium text-sm flex items-center gap-1">
                                        <Tag size={12} />
                                        {entry.description}
                                    </span>
                                    <span className="text-sterling-mist/40 text-xs flex items-center gap-1 sm:ml-auto">
                                        <Calendar size={12} />
                                        {entry.date}
                                    </span>
                                </div>

                                <ul className="space-y-3">
                                    {entry.changes.map((change, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sterling-mist/70 text-sm leading-relaxed group/item hover:text-sterling-mist transition-colors">
                                            <ChevronRight size={14} className="mt-1 text-sterling-blue/50 group-hover/item:text-sterling-blue shrink-0" />
                                            <span>{change}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Footer gradient fade */}
                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-sterling-deep to-transparent pointer-events-none" />
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
