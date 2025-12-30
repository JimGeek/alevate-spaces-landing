export interface Brand {
    id: number;
    name: string;
    logo: string;
    hero_image: string;
    one_liner: string;
    description: string;
    launch_date?: string; // string because it comes as date string from JSON
    status: 'ideation' | 'manufacturing' | 'revenue';
    website_url?: string;
    order: number;
}

export interface Founder {
    id: number;
    name: string;
    role: string;
    photo: string;
    bio: string;
    vision_quote?: string;
    linkedin_url?: string;
    twitter_url?: string;
    expertise?: string[]; // New field for "Key Focus Areas"
    order: number;
}
