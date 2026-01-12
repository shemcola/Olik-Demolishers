
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
}

export interface SalvageItem {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  tag: 'Demolition' | 'Salvage' | 'Clearance';
}
