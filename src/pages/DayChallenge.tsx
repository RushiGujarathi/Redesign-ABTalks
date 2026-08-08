import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Github, Linkedin, CheckCircle2, ChevronRight, Share2, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { cn } from '../components/Layout';
import mockDataRaw from '../mock-data.json';
import { MockData } from '../types';

const mockData = mockDataRaw as unknown as MockData;

export default function DayChallenge() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Try to find the day across any student's progress for this demo
  const allProgress = Object.values(mockData.students).flatMap(s => s.progress);
  const day = allProgress.find(p => p.id === Number(id));
  
  // Determine comeback context based on active student (for demo purposes)
  const isComeback = mockData.students.active.user.needsComeback && day?.status === 'missed';

  const [githubUrl, setGithubUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [submitted, setSubmitted] = useState(day?.status === 'completed');

  if (!day) return <div className="p-6 text-white">Day not found</div>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (githubUrl && linkedinUrl) {
      setSubmitted(true);
      
      const duration = 2000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#3b82f6', '#10b981', '#f59e0b']
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#3b82f6', '#10b981', '#f59e0b']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  };

  // Make description skimmable
  const descriptionParts = day.taskDescription.split('. ').filter(Boolean);

  return (
    <div className="flex-1 flex flex-col bg-gray-950 pb-28 min-h-screen relative text-gray-100">
      
      {/* Header Context */}
      <div className={cn(
        "px-6 pt-6 pb-6 rounded-b-[2.5rem] relative overflow-hidden",
        isComeback ? "bg-gradient-to-br from-red-900 to-orange-950" : "bg-gradient-to-br from-blue-900 to-indigo-950"
      )}>
        {isComeback && (
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <AlertCircle size={100} />
          </div>
        )}
        <div className="flex items-center gap-2 mb-4">
          <span className={cn(
            "text-xs font-bold px-2 py-1 rounded uppercase tracking-wider",
            isComeback ? "bg-red-900/50 text-red-200 border border-red-800" : "bg-blue-900/50 text-blue-200 border border-blue-800"
          )}>
            Day {day.id}
          </span>
          {isComeback && (
            <span className="text-xs font-bold px-2 py-1 rounded uppercase tracking-wider bg-red-500/20 text-red-300 border border-red-500/30">
              Rescue Mission
            </span>
          )}
        </div>
        <h1 className="text-2xl font-bold text-white mb-4">{day.taskTitle}</h1>
        
        <div className="space-y-2">
          {descriptionParts.length > 1 ? (
            <ul className="list-disc pl-4 space-y-2 text-gray-300 text-sm leading-relaxed">
              {descriptionParts.map((part, i) => (
                <li key={i}>{part}{!part.endsWith('.') && '.'}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-300 text-sm leading-relaxed">{day.taskDescription}</p>
          )}
        </div>
      </div>

      <div className="px-6 mt-8 flex-1 flex flex-col">
        {submitted ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500 py-10">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6 border-2 border-green-500">
              <CheckCircle2 size={40} className="text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              {isComeback ? "Streak Rescued!" : "Task Completed!"}
            </h2>
            <p className="text-gray-400 mb-8 max-w-[250px]">
              {isComeback 
                ? "You've earned the Resilience Badge. Your streak is safe."
                : "Great job! Your proof of work is recorded. See you tomorrow."}
            </p>
            
            <button 
              onClick={() => navigate('/dashboard')}
              className="w-full bg-white text-gray-900 font-bold py-4 rounded-2xl hover:bg-gray-200 transition-colors shadow-lg min-h-[44px]"
            >
              Back to Dashboard
            </button>
            <button className="w-full mt-4 bg-gray-800 text-gray-300 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-700 transition-colors min-h-[44px]">
              <Share2 size={18} /> Share your progress
            </button>
          </div>
        ) : (
          <>
            <h3 className="font-bold text-white text-lg mb-4">Submit Proof of Work</h3>
            <form id="submission-form" onSubmit={handleSubmit} className="space-y-5">
              
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                  <Github size={16} /> GitHub Repository URL
                </label>
                <input 
                  type="url" 
                  required
                  placeholder="https://github.com/username/repo"
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder-gray-600 min-h-[44px]"
                  value={githubUrl}
                  onChange={e => setGithubUrl(e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1.5 ml-1">Must contain today's commit.</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                  <Linkedin size={16} className="text-blue-400" /> LinkedIn Post URL
                </label>
                <input 
                  type="url" 
                  required
                  placeholder="https://linkedin.com/post/..."
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder-gray-600 min-h-[44px]"
                  value={linkedinUrl}
                  onChange={e => setLinkedinUrl(e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1.5 ml-1">Tag #ABTalks #60DaysOfCode</p>
              </div>
            </form>

            {/* Sticky bottom button */}
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-950 via-gray-950/90 to-transparent pb-8 z-50 md:absolute md:rounded-b-[2.5rem]">
              <button 
                type="submit"
                form="submission-form"
                className={cn(
                  "w-full text-white font-bold py-4 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.5)] transition-all flex items-center justify-center gap-2 min-h-[56px] text-lg",
                  isComeback 
                    ? "bg-gradient-to-r from-orange-500 to-red-600" 
                    : "bg-gradient-to-r from-blue-600 to-indigo-600"
                )}
              >
                {isComeback ? "Rescue My Streak" : "Submit Work"} <ChevronRight size={20} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
