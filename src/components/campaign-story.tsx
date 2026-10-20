import { TitleIcon } from '@/components/title-icon';
import ReactMarkdown from 'react-markdown';
import { parseCampaignStory } from '@/lib/campaign-story';

export function CampaignStory({ story, expanded }: { story: string; expanded: boolean }) {
  return <div className={`story-body ${expanded ? '' : 'collapsed'}`}>
    {parseCampaignStory(story).map((block, index) => {
      if (block.kind === 'photo') {
        if (!block.photo) return null;
        return <figure className="story-photo" key={index}>
          <img src={block.photo.url} width={block.photo.width} height={block.photo.height}
            alt={block.caption} loading="lazy" decoding="async" />
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>;
      }
      return <ReactMarkdown key={index} skipHtml allowedElements={['p', 'h2', 'h3', 'h4', 'strong', 'em', 'ul', 'ol', 'li', 'blockquote', 'br', 'hr', 'a']} unwrapDisallowed
        components={{ h1: ({ children }) => <h2><TitleIcon topic="Campaign story" />{children}</h2>, h2: ({ children }) => <h2><TitleIcon topic="Campaign story" />{children}</h2>, h3: ({ children }) => <h3><TitleIcon topic="Campaign story" />{children}</h3>, h4: ({ children }) => <h4><TitleIcon topic="Campaign story" />{children}</h4>, a: ({ children, href }) => <a href={href} rel="noopener noreferrer">{children}</a> }}>
        {block.markdown}
      </ReactMarkdown>;
    })}
  </div>;
}