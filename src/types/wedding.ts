export interface WeddingDetails {
  brideName: string;
  groomName: string;
  weddingDate: string; // ISO format or formatted
  targetDate: string; // For countdown calculation
  venueName: string;
  venueAddress: string;
  city: string;
  stateCountry: string;
  theme: string;
  themeColors: {
    name: string;
    hex: string;
    description: string;
  }[];
}

export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  subtitle: string;
  location: string;
  description: string;
  iconName: string;
}

export interface Milestone {
  id: string;
  year: string;
  title: string;
  date: string;
  location: string;
  description: string;
  tag: string;
}

export interface RegistryItem {
  id: string;
  title: string;
  category: string;
  description: string;
  goalAmount: number;
  currentAmount: number;
  suggestedContribution: number;
  icon: string;
}

export interface GuestbookEntry {
  id: string;
  name: string;
  relationship: string;
  message: string;
  date: string;
  avatarSeed?: string;
}

export interface RsvpSubmission {
  id: string;
  fullName: string;
  email: string;
  attending: 'joyfully_accept' | 'regretfully_decline';
  guestCount: number;
  plusOneName?: string;
  dietaryRestrictions: string;
  dietaryNotes?: string;
  songRequest?: string;
  personalNote?: string;
  submittedAt: string;
}

export interface EntourageMember {
  id: string;
  name: string;
  role: string;
  relation: string;
  description: string;
}
