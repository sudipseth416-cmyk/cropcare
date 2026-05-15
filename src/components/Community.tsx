import { MessageSquare, ThumbsUp, Share2, Users, Search, Plus, Award, MoreHorizontal } from 'lucide-react';

const CommunityPost = ({ author, location, time, content, image, tags, likes, comments }: any) => (
  <div className="card mb-6">
    <div className="flex justify-between items-start mb-4">
      <div className="flex gap-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center font-bold text-black">
          {author.charAt(0)}
        </div>
        <div>
          <h4 className="font-bold flex items-center gap-2">
            {author} {author.includes('Agri') && <Award size={14} className="text-primary" />}
          </h4>
          <p className="text-xs text-text-muted">{location} · {time}</p>
        </div>
      </div>
      <button className="text-text-dim hover:text-text-main transition-colors">
        <MoreHorizontal size={20} />
      </button>
    </div>

    <p className="text-text-main mb-4 leading-relaxed">{content}</p>
    
    {image && (
      <div className="rounded-2xl overflow-hidden mb-4 aspect-video bg-black">
        <img src={image} alt="Post content" className="w-full h-full object-cover opacity-80" />
      </div>
    )}

    <div className="flex gap-2 mb-6">
      {tags.map((tag: string, i: number) => (
        <span key={i} className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2 py-1 rounded-md">
          #{tag}
        </span>
      ))}
    </div>

    <div className="flex items-center gap-6 pt-4 border-t border-border">
      <button className="flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors">
        <ThumbsUp size={18} /> {likes}
      </button>
      <button className="flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors">
        <MessageSquare size={18} /> {comments}
      </button>
      <button className="flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors ml-auto">
        <Share2 size={18} />
      </button>
    </div>
  </div>
);

export default function Community() {
  return (
    <div className="max-w-6xl mx-auto py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
        <div>
          <h2 className="text-4xl font-bold mb-2">Farmer Community</h2>
          <p className="text-text-muted">Connect, share, and grow together with 10,000+ farmers across India.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-dim" size={18} />
            <input 
              type="text" 
              placeholder="Search discussions..." 
              className="w-full bg-bg-card border border-border rounded-xl py-2 pl-10 pr-4 text-sm focus:border-primary focus:outline-none" 
            />
          </div>
          <button className="btn btn-primary flex items-center gap-2">
            <Plus size={18} /> New Post
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Left Feed */}
        <div className="col-span-12 lg:col-span-8">
          <CommunityPost 
            author="Agri Expert Sharma" 
            location="New Delhi, IN" 
            time="2 hours ago"
            content="Heavy rainfall is expected in the northern belt. Make sure your drainage systems are clear. Avoid any nitrogen-based fertilizers for the next 48 hours."
            tags={['WeatherAlert', 'FarmingTips', 'ExpertAdvice']}
            likes={124}
            comments={18}
          />
          <CommunityPost 
            author="Rajesh Kumar" 
            location="Punjab, IN" 
            time="5 hours ago"
            content="Successfully treated Leaf Rust in my wheat field using the AgroVision AI recommendations. The progress is visible in just 4 days! Highly recommend the Mancozeb spray schedule."
            image="https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=2034&auto=format&fit=crop"
            tags={['SuccessStory', 'WheatFarming', 'DiseaseControl']}
            likes={542}
            comments={45}
          />
        </div>

        {/* Right Sidebar */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="card">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Users className="text-primary" size={20} /> Active Groups
            </h3>
            <div className="space-y-4">
              {['Wheat Farmers Punjab', 'Tomato Greenhouse Hub', 'Organic Farming India', 'Rice Pest Management'].map((group, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-2xl hover:bg-white/5 cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-bold">
                      {group.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold">{group}</p>
                      <p className="text-[10px] text-text-dim font-bold uppercase">1.2k Members</p>
                    </div>
                  </div>
                  <button className="text-primary text-xs font-bold hover:underline">Join</button>
                </div>
              ))}
            </div>
          </div>

          <div className="card bg-gradient-to-br from-bg-card to-accent/5 border-accent/10">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Award className="text-accent" size={20} /> Top Contributors
            </h3>
            <div className="space-y-4">
              {[
                { name: 'Dr. Anita Desai', role: 'Crop Scientist', points: 4500 },
                { name: 'Suresh Patil', role: 'Progressive Farmer', points: 3200 },
                { name: 'AgriVision Bot', role: 'System AI', points: 2800 },
              ].map((expert, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-border flex items-center justify-center font-bold">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold">{expert.name}</p>
                    <p className="text-[10px] text-text-muted font-bold uppercase">{expert.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-accent">{expert.points} pts</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn btn-ghost w-full mt-6 text-sm">View Leaderboard</button>
          </div>
        </div>
      </div>
    </div>
  );
}
