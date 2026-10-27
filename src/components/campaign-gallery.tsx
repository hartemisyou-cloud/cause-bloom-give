import { useRef, useState } from 'react';
import { ArrowDown, ChevronLeft, ChevronRight, ImageOff, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TitleIcon } from '@/components/title-icon';
import { initials } from '@/components/campaign-detail-sections';
import { type Campaign } from '@/lib/campaigns';
import { storyDescription } from '@/lib/campaign-story';
import { galleryIndex, gallerySwipeDirection } from '@/lib/campaign-gallery';

export function CampaignGallery({ campaign: c, onReadStory }: { campaign: Campaign; onReadStory: () => void }) {
  const [slide, setSlide] = useState(0);
  const [failed, setFailed] = useState<string | null>(null);
  const [portraitUrl, setPortraitUrl] = useState<string | null>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const photos = c.gallery.length ? c.gallery : [c.image];
  const count = photos.length + 1;
  const summary = slide === photos.length;
  const image = photos[slide] ?? c.image;
  const move = (delta: number) => setSlide(index => galleryIndex(index, delta, count));

  return <section className="detail-gallery-shell" aria-label="Campaign gallery">
    <div className={`detail-gallery ${summary ? 'is-summary' : ''}`} tabIndex={0} role="region" aria-roledescription="carousel" aria-label="Campaign photos and story summary"
      onKeyDown={event => { if (event.target !== event.currentTarget) return; if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1); } }}
      onTouchStart={event => { const point = event.touches[0]; touch.current = point ? { x: point.clientX, y: point.clientY } : null; }}
      onTouchEnd={event => { const point = event.changedTouches[0]; if (touch.current && point) { const direction = gallerySwipeDirection(touch.current, { x: point.clientX, y: point.clientY }); if (direction) move(direction); } touch.current = null; }}
      onTouchCancel={() => { touch.current = null; }}>
      {!summary && (failed === image.url ? <div className="gallery-image-error" role="status"><ImageOff aria-hidden="true" /><span>Photo unavailable</span></div> : <img key={image.url} className={portraitUrl === image.url || image.height > image.width ? 'gallery-portrait' : ''} src={image.url} width={image.width} height={image.height} alt={`${c.title} — photo ${slide + 1}`} loading="eager" fetchPriority={slide === 0 ? 'high' : 'auto'} onLoad={event => { const img = event.currentTarget; if (img.naturalHeight > img.naturalWidth) setPortraitUrl(image.url); }} onError={() => setFailed(image.url)} />)}
      {summary ? <div className="gallery-summary"><div className="gallery-summary-content"><p>{storyDescription(c.story)}</p><div className="gallery-summary-author"><TitleIcon category={c.category} /><span>{c.organizer}</span></div><Button variant="gold" onClick={onReadStory}>Read full story <ArrowDown aria-hidden="true" /></Button></div></div> : <><div className="gallery-organizer"><span className="organizer-avatar">{initials(c.organizer)}</span><span>{c.organizer}</span></div><div className="gallery-title">{c.title}</div></>}
      <Button className="gallery-left" variant="circle" size="icon" aria-label="Previous campaign photo" onClick={() => move(-1)}><ChevronLeft /></Button>
      <Button className="gallery-right" variant="circle" size="icon" aria-label="Next campaign photo" onClick={() => move(1)}><ChevronRight /></Button>
      <div className="gallery-footer">{Array.from({ length: count }, (_, index) => <Button variant="ghost" size="icon" className="gallery-dot-button" key={index} aria-label={index === photos.length ? 'Show story summary' : `Show photo ${index + 1}`} aria-pressed={index === slide} onClick={() => setSlide(index)}><span className={`dot ${slide === index ? 'active' : ''}`} /></Button>)}</div>
    </div>
    <div className="gallery-thumbnails" role="group" aria-label="Choose campaign photo">{photos.map((photo, index) => <Button key={`${photo.url}-${index}`} variant="outline" className="gallery-thumbnail" aria-label={`View campaign photo ${index + 1}`} aria-pressed={slide === index} onClick={() => setSlide(index)}><img src={index === 0 ? c.thumbnail.url : photo.url} width={photo.width} height={photo.height} alt="" loading="lazy" decoding="async"/></Button>)}<Button variant="outline" className="gallery-thumbnail" aria-label="View story summary" aria-pressed={summary} onClick={() => setSlide(photos.length)}><FileText size={24} aria-hidden="true"/></Button></div>
    <span className="sr-only" aria-live="polite" aria-atomic="true">{summary ? 'Story summary' : `Photo ${slide + 1} of ${photos.length}`}</span>
  </section>;
}