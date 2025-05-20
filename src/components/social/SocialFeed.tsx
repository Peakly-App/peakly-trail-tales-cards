
import React from 'react';
import { Button } from '@/components/ui/button';
import { Share, User } from 'lucide-react';

interface SocialStoryProps {
  username: string;
  location: string;
  image: string;
  likes: number;
  date: string;
}

const SocialStory: React.FC<SocialStoryProps> = ({
  username,
  location,
  image,
  likes,
  date
}) => (
  <div className="social-story h-64">
    <img src={image} alt={location} className="h-full w-full object-cover" />
    <div className="social-story-content">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
            <User size={16} className="text-gray-800" />
          </div>
          <span className="font-medium">{username}</span>
        </div>
        <Button size="sm" variant="ghost" className="text-white hover:text-white h-8 px-2">
          <Share size={16} />
        </Button>
      </div>
      <h3 className="text-lg font-bold">{location}</h3>
      <div className="flex justify-between items-center mt-1">
        <span className="text-sm">{likes} likes</span>
        <span className="text-sm">{date}</span>
      </div>
    </div>
  </div>
);

const SocialFeed: React.FC = () => {
  // Sample data for demonstration
  const stories = [
    {
      id: 1,
      username: "alex_hiker",
      location: "Mount Rainier",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80&w=600",
      likes: 124,
      date: "2d ago"
    },
    {
      id: 2,
      username: "mountain_lover",
      location: "Cascade Pass",
      image: "https://images.unsplash.com/photo-1458668383970-8ddd3927deed?auto=format&fit=crop&q=80&w=600",
      likes: 87,
      date: "5d ago"
    },
    {
      id: 3,
      username: "trail_runner",
      location: "Gothic Basin",
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=600",
      likes: 213,
      date: "1w ago"
    }
  ];
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Social Feed</h1>
      
      <div className="space-y-4">
        {stories.map(story => (
          <SocialStory key={story.id} {...story} />
        ))}
      </div>
    </div>
  );
};

export default SocialFeed;
