'use client';

import { useState, useEffect } from 'react';
import { getLeaderboard } from '@/app/actions';

interface LeaderboardDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Player {
  id: string;
  name: string | null;
  time_taken: number | null;
  found_waldo: boolean;
  found_odlaw: boolean;
  found_wizard: boolean;
  found_wilma: boolean;
  started_at: Date;
  finished_at: Date | null;
}

export default function LeaderboardDrawer({ isOpen, onClose }: LeaderboardDrawerProps) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const fetchLeaderboard = async () => {
        setLoading(true);
        const result = await getLeaderboard();
        if (result.success && result.data) {
          setPlayers(result.data);
        }
        setLoading(false);
      };
      fetchLeaderboard();
    }
  }, [isOpen]);

  const formatTime = (seconds: number | null) => {
    if (seconds === null) return '--:--';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity z-40 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[480px] bg-[#1a1a1a] shadow-2xl z-50 transform transition-transform duration-300 ease-in-out border-l border-white/10 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full text-white">
          <div className="p-6 border-b border-white/10 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Leaderboard</h2>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
            ) : (
              <table className="w-full">
                <thead className="text-white text-sm uppercase">
                  <tr>
                    <th className="px-4 py-3 text-left">Rank</th>
                    <th className="px-4 py-3 text-left">Player</th>
                    <th className="px-4 py-3 text-right">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {players.map((player, index) => (
                    <tr key={player.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-4 py-3 font-mono text-gray-400">#{index + 1}</td>
                      <td className="px-4 py-3 font-medium truncate max-w-[200px]" title={player.name || 'Anonymous'}>
                        {player.name || 'Anonymous'}
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-green-400">
                        {formatTime(player.time_taken)}
                      </td>
                    </tr>
                  ))}
                  {players.length === 0 && (
                    <tr>
                      <td colSpan={3} className="px-4 py-8 text-center text-gray-500">
                        No scores yet. Be the first!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
