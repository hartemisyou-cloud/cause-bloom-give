import { BookOpen, Building2, CalendarDays, CircleHelp, Compass, FileText, HandHeart, Heart, Images, LayoutGrid, ListFilter, Mail, MapPin, MessageCircle, PawPrint, Search, Share2, Sprout, Stethoscope, Target, TrendingUp, Trophy, UserRound, Users, Wallet, type LucideIcon } from 'lucide-react';

const categoryIcons: Record<string, LucideIcon> = { all: LayoutGrid, health: Stethoscope, children: Users, animals: PawPrint, disaster: HandHeart, education: BookOpen, community: Users, environment: Sprout, emergency: HandHeart, housing: Building2, saved: Heart };

function topicIcon(topic: string): LucideIcon {
  const text = topic.toLowerCase();
  if (/refund|currency|fees|amount|checkout|allocation|funds|donation/.test(text)) return Wallet;
  if (/privacy|polic|terms|rights|claim|approval|review|information/.test(text)) return FileText;
  if (/contact|email|message|support emails/.test(text)) return Mail;
  if (/question|help|support$|confidence|clarity|trusted/.test(text)) return CircleHelp;
  if (/sharing|share/.test(text)) return Share2;
  if (/words of support/.test(text)) return MessageCircle;
  if (/organizer|yourself|your info/.test(text)) return UserRound;
  if (/health|medical/.test(text)) return Stethoscope;
  if (/animals|pets/.test(text)) return PawPrint;
  if (/children|family|community|people|inclusion/.test(text)) return Users;
  if (/event|gathering/.test(text)) return CalendarDays;
  if (/foundation|organization|business|workplace/.test(text)) return Building2;
  if (/trending/.test(text)) return TrendingUp;
  if (/top |ranked|most loved/.test(text)) return Trophy;
  if (/goal/.test(text)) return Target;
  if (/media|photo/.test(text)) return Images;
  if (/category|topics|status/.test(text)) return ListFilter;
  if (/browse|search|no campaigns/.test(text)) return Search;
  if (/cause|related/.test(text)) return Compass;
  if (/gratitude|thank|compassion|hearts/.test(text)) return Heart;
  if (/start|future|mission|difference|steps|connections|meaningful|powerful/.test(text)) return HandHeart;
  return BookOpen;
}

/** Decorative subject cue: the surrounding text remains the accessible label. */
export function TitleIcon({ topic = '', category, className = '' }: { topic?: string | undefined; category?: string | undefined; className?: string }) {
  const Icon = category ? categoryIcons[category] ?? Compass : topicIcon(topic);
  return <Icon className={`title-icon ${className}`} size={20} strokeWidth={1.8} aria-hidden="true" focusable="false" />;
}

export function LocationIcon() { return <MapPin size={16} strokeWidth={1.8} aria-hidden="true" />; }