import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Github, Linkedin, CheckCircle2, ChevronRight, Share2, AlertCircle } from 'lucide-react';
import { cn } from '../components/Layout';
import mockDataRaw from '../mock-data.json';
import { MockData } from '../types';

const mockData = mockDataRaw as unknown as MockData;

export default function DayChallenge() {
  const { id } = useParams();
  const navigate = useNavigate();
  const day = mockData.progress.find(p => p.id === Number(id));
  const isComeback = mockData.user.needsComeback && day?.status === 'missed';

  const [githubUrl, setGithubUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [submitted, setSubmitted] = useState(day?.status === 'completed');

  if (!day) return <div className="p-6">Day not found</div>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (githubUrl && linkedinUrl) {
      setSubmitted(true);
      // In a real app, this would be an API call, and we would trigger confetti here.
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white pb-10">
      
      {/* Header Context */}
      <div className={cn(
        "px-6 pt-6 pb-6 rounded-b-[2.5rem] relative overflow-hidden",
        isComeback ? "bg-gradient-to-br from-amber-50 to-orange-100" : "bg-blue-50"
      )}>
        {isComeback && (
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <AlertCircle size={100} />
          </div>
        )}
        <div className="flex items-center gap-2 mb-2">
          <span className={cn(
            "text-xs font-bold px-2 py-1 rounded uppercase tracking-wider",
            isComeback ? "bg-orange-200 text-orange-800" : "bg-blue-200 text-blue-800"
          )}>
            Day {day.id}
          </span>
          {isComeback && (
            <span className="text-xs font-bold px-2 py-1 rounded uppercase tracking-wider bg-red-100 text-red-700">
              Rescue Mission
            </span>
          )}
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{day.taskTitle}</h1>
        <p className="text-gray-600 text-sm leading-relaxed">{day.taskDescription}</p>
      </div>

      <div className="px-6 mt-8 flex-1 flex flex-col">
        {submitted ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 size={40} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {isComeback ? "Streak Rescued!" : "Task Completed!"}
            </h2>
            <p className="text-gray-500 mb-8">
              {isComeback 
                ? "You've earned the Resilience Badge. Your streak is safe."
                : "Great job! Your proof of work is recorded. See you tomorrow."}
            </p>
            
            <button 
              onClick={() => navigate('/dashboard')}
              className="w-full bg-gray-900 text-white font-bold py-4 rounded-2xl hover:bg-gray-800 transition-colors shadow-lg"
            >
              Back to Dashboard
            </button>
            <button className="w-full mt-4 bg-blue-50 text-blue-700 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-blue-100 transition-colors">
              <Share2 size={18} /> Share your progress
            </button>
          </div>
        ) : (
          <>
            <h3 className="font-bold text-gray-900 text-lg mb-4">Submit Proof of Work</h3>
            <form onSubmit={handleSubmit} className="space-y-5 flex-1">
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Github size={16} /> GitHub Repository URL
                </label>
                <input 
                  type="url" 
                  required
                  placeholder="https://github.com/username/repo"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={githubUrl}
                  onChange={e => setGithubUrl(e.target.value)}
                />
                <p className="text-xs text-gray-400 mt-1.5 ml-1">Must contain today's commit.</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Linkedin size={16} className="text-blue-600" /> LinkedIn Post URL
                </label>
                <input 
                  type="url" 
                  required
                  placeholder="https://linkedin.com/post/..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={linkedinUrl}
                  onChange={e => setLinkedinUrl(e.target.value)}
                />
                <p className="text-xs text-gray-400 mt-1.5 ml-1">Tag #ABTalks #60DaysOfCode</p>
              </div>

              <div className="pt-6 mt-auto pb-6">
                <button 
                  type="submit"
                  className={cn(
                    "w-full text-white font-bold py-4 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2",
                    isComeback 
                      ? "bg-gradient-to-r from-orange-500 to-red-500" 
                      : "bg-gradient-to-r from-blue-600 to-indigo-600"
                  )}
                >
                  {isComeback ? "Rescue My Streak" : "Submit Work"} <ChevronRight size={20} />
                </button>
              </div>
            </form>
          </>
        )}
      </div>

    </div>
  );
}
