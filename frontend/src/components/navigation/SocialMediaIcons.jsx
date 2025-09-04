import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const SocialMediaIcons = () => {
  const socialMedia = [
    { name: 'tiktok', url: 'https://tiktok.com/demo' },
    { name: 'x-twitter', url: 'https://twitter.com/demo' },
    { name: 'instagram', url: 'https://www.instagram.com/skyis_co?igsh=MWc3NjUxZ3B1cXc5YQ==' },
    { name: 'linkedin-in', url: 'https://linkedin.com/in/demo' },
  ];

  return (
    <div className="flex space-x-3">
      {socialMedia.map((media, idx) => (
        <a
          key={idx}
          href={media.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-7 h-7 rounded-full bg-white text-[#06403b] flex items-center justify-center hover:bg-gray-200 transition"
          aria-label={media.name}
        >
          <i className={`fab fa-${media.name} text-xs`} />
        </a>
      ))}
    </div>
  );
};

export default SocialMediaIcons;
// This component renders social media icons with links.