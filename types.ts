
export interface Tool {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  description: string;
  pricing: string;
  url: string;
  affiliate: boolean;
  rating: number;
  tags: string[];
  approved?: boolean;
}
