
import React from 'react';

const ProjectActivity: React.FC = () => {
  const activities = [
    { id: 'c1', ref: 'OPS-822', message: 'Manual roof dismantling complete', site: 'Lavington Mansion', time: '2h ago', status: 'verified' },
    { id: 'c2', ref: 'OPS-394', message: 'Crystal chandelier recovery initiated', site: 'Runda Heights', time: '5h ago', status: 'active' },
    { id: 'c3', ref: 'OPS-107', message: 'Rebar mesh structural audit uploaded', site: 'Industrial Area', time: '1d ago', status: 'verified' },
    { id: 'c4', ref: 'OPS-955', message: 'Initial site clearance sequence started', site: 'Karen Estate', time: '2d ago', status: 'scheduled' },
  ];

  const projects = [
    { name: 'Site-Lavington-Phase1', salvage: '98%', status: 'Complete', color: 'bg-green-500' },
    { name: 'Site-Runda-Interior', salvage: '45%', status: 'In Progress', color: 'bg-blue-500' },
    { name: 'Site-Karen-Foundation', salvage: '12%', status: 'Pending', color: 'bg-yellow-500' }
  ];

  return (
    <section id="activity" className="py-24 bg-slate-950 text-slate-300 font-sans">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Main Activity Feed */}
          <div className="lg:w-2/3">
            <div className="flex items-center justify-between mb-8 border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3">
                <i className="fas fa-tower-broadcast text-3xl text-white"></i>
                <h2 className="text-2xl font-bold text-white tracking-tight">Live Operations Pulse</h2>
              </div>
              <div className="hidden sm:flex space-x-2">
                <span className="px-3 py-1 rounded-md bg-slate-800 text-[10px] font-mono">CHANNEL: HQ-LIVE</span>
                <span className="px-3 py-1 rounded-md bg-blue-500/10 text-blue-400 text-[10px] font-mono border border-blue-500/20">REAL-TIME DATA</span>
              </div>
            </div>

            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="group flex items-start space-x-4 p-4 rounded-xl hover:bg-slate-900 transition-colors border border-transparent hover:border-slate-800">
                  <div className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center ${
                    activity.status === 'verified' ? 'bg-purple-500/20 text-purple-400' : 
                    activity.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-slate-700/20 text-slate-400'
                  }`}>
                    <i className={`fas ${activity.status === 'verified' ? 'fa-circle-check' : 'fa-circle-dot'} text-sm`}></i>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors cursor-pointer">
                        {activity.message}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 bg-slate-800 px-2 py-0.5 rounded">
                        {activity.ref}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 text-xs text-slate-500">
                      <span className="flex items-center"><i className="fas fa-map-marker-alt mr-1.5"></i> {activity.site}</span>
                      <span>•</span>
                      <span>{activity.time}</span>
                    </div>
                  </div>
                  <div className="hidden sm:block">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded border ${
                      activity.status === 'verified' ? 'border-purple-500/30 text-purple-400' : 
                      activity.status === 'active' ? 'border-green-500/30 text-green-400' : 'border-slate-700 text-slate-500'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <button className="w-full py-3 bg-slate-900 border border-slate-800 rounded-xl text-sm font-bold hover:bg-slate-800 transition text-slate-400">
                View Full Operational History
              </button>
            </div>
          </div>

          {/* Sidebar Projects */}
          <div className="lg:w-1/3">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">Ongoing Site Operations</h3>
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.name} className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-blue-500/30 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <i className="fas fa-building-circle-check text-blue-400"></i>
                      <span className="font-bold text-slate-200 text-sm">{project.name}</span>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${project.color} animate-pulse`}></div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <div className="flex space-x-4">
                      <span className="flex items-center"><i className="fas fa-gem text-blue-400/50 mr-1"></i> {project.salvage} Recovery</span>
                      <span className="flex items-center"><i className="fas fa-users mr-1"></i> Site Team</span>
                    </div>
                    <span className="text-slate-400">{project.status}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 rounded-2xl bg-blue-600/10 border border-blue-500/20">
              <h4 className="font-bold text-white mb-2">Partner With Us?</h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">Our methodology is optimized for safety and efficiency. Inquire about our proprietary manual dismantling standards.</p>
              <a href="https://wa.me/254700192081" className="text-blue-400 text-xs font-bold hover:underline">Request technical documentation →</a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProjectActivity;
