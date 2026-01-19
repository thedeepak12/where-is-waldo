'use client';

import { useState } from 'react';

interface GameOverPopupProps {
  timeTaken: number;
  onSubmit: (name: string) => Promise<void>;
  onClose: () => void;
}

export default function GameOverPopup({ timeTaken, onSubmit, onClose }: GameOverPopupProps) {
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    await onSubmit(name);
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
        <div className="bg-zinc-950 border border-zinc-800 p-8 rounded-xl max-w-sm w-full text-center shadow-2xl animate-in zoom-in-95 duration-300">
          <h2 className="text-2xl font-semibold text-white mb-2">Score Submitted</h2>
          <p className="text-zinc-400 mb-8 text-sm">
            Great job, <span className="text-white font-medium">{name}</span>. Your score has been recorded.
          </p>
          <button
            onClick={onClose}
            className="w-full px-4 py-2.5 bg-white text-black font-medium text-sm rounded-md hover:bg-zinc-200 transition-colors cursor-pointer"
          >
            View Board
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="bg-zinc-950 border border-zinc-800 p-8 rounded-xl max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-white mb-1">Congratulations!</h2>
          <p className="text-zinc-400 mb-8 text-sm">
            You found all the characters in <span className="text-white font-mono">{formatTime(timeTaken)}</span>!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-xs font-medium text-zinc-400 uppercase tracking-wider">
              Name or @Social
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="@username"
              className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-md text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-zinc-700 transition-all"
              required
              autoFocus
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !name.trim()}
            className="w-full py-2.5 bg-white text-black font-medium text-sm rounded-md hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}
