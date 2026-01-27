
export enum Category {
  CONSTRUCTION = 'Construction Sites',
  OPERATIONS = 'Daily Operations',
  SALVAGE = 'Salvage Assets',
  DEMOLITION = 'Demolition Projects',
  GENERAL = 'General'
}

export interface ProjectImage {
  id: string;
  url: string;
  category: Category;
  title: string;
  description: string;
  createdAt: number;
}
