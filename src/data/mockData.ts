export interface AIModel {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  price: string;
  license: string;
  rating: number;
  usage: string;
  performance: {
    accuracy: number;
    speed: number;
  };
  creator: string;
  createdAt: string;
  updatedAt: string;
  trending: boolean;
}

export const mockModels: AIModel[] = [
  {
    id: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
    name: 'Advanced Sentiment Analyzer',
    description: 'State-of-the-art sentiment analysis model trained on millions of social media posts and reviews. Provides accurate emotion detection with confidence scores.',
    category: 'nlp',
    tags: ['sentiment', 'nlp', 'emotions', 'social-media', 'reviews'],
    price: '25.00 BDAG',
    license: 'Commercial',
    rating: 4.9,
    usage: '12.4K',
    performance: {
      accuracy: 94,
      speed: 120
    },
    creator: 'DataScience Labs',
    createdAt: '2024-01-15',
    updatedAt: '2 days ago',
    trending: true
  },
  {
    id: '2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q',
    name: 'ImageClassify Pro',
    description: 'High-performance image classification model capable of identifying 10,000+ object categories with exceptional accuracy.',
    category: 'computer-vision',
    tags: ['classification', 'computer-vision', 'object-detection', 'deep-learning'],
    price: '40.00 BDAG',
    license: 'Enterprise',
    rating: 4.7,
    usage: '8.9K',
    performance: {
      accuracy: 96,
      speed: 85
    },
    creator: 'VisionAI Research',
    createdAt: '2024-01-20',
    updatedAt: '1 week ago',
    trending: true
  },
  {
    id: '3c4d5e6f-7g8h-9i0j-1k2l-3m4n5o6p7q8r',
    name: 'Stock Market Predictor',
    description: 'Advanced financial forecasting model using technical indicators and market sentiment to predict stock price movements.',
    category: 'prediction',
    tags: ['finance', 'prediction', 'stocks', 'trading', 'market-analysis'],
    price: '60.00 BDAG',
    license: 'Professional',
    rating: 4.6,
    usage: '5.2K',
    performance: {
      accuracy: 87,
      speed: 200
    },
    creator: 'FinTech Innovations',
    createdAt: '2024-01-10',
    updatedAt: '3 days ago',
    trending: false
  },
  {
    id: '4d5e6f7g-8h9i-0j1k-2l3m-4n5o6p7q8r9s',
    name: 'Medical Diagnosis Assistant',
    description: 'AI-powered diagnostic tool trained on medical imaging data to assist healthcare professionals in early disease detection.',
    category: 'classification',
    tags: ['medical', 'diagnosis', 'healthcare', 'imaging', 'disease-detection'],
    price: '120.00 BDAG',
    license: 'Medical',
    rating: 4.8,
    usage: '3.1K',
    performance: {
      accuracy: 92,
      speed: 150
    },
    creator: 'MedAI Solutions',
    createdAt: '2024-01-08',
    updatedAt: '5 days ago',
    trending: false
  },
  {
    id: '5e6f7g8h-9i0j-1k2l-3m4n-5o6p7q8r9s0t',
    name: 'Language Translator Pro',
    description: 'Multi-language translation model supporting 100+ languages with context-aware translations and cultural nuances.',
    category: 'nlp',
    tags: ['translation', 'multilingual', 'nlp', 'language', 'communication'],
    price: '35.00 BDAG',
    license: 'Standard',
    rating: 4.5,
    usage: '15.7K',
    performance: {
      accuracy: 89,
      speed: 95
    },
    creator: 'Global Language AI',
    createdAt: '2024-01-25',
    updatedAt: '4 days ago',
    trending: true
  },
  {
    id: '6f7g8h9i-0j1k-2l3m-4n5o-6p7q8r9s0t1u',
    name: 'Fraud Detection Engine',
    description: 'Real-time fraud detection system for financial transactions using advanced anomaly detection algorithms.',
    category: 'classification',
    tags: ['fraud', 'security', 'finance', 'anomaly-detection', 'real-time'],
    price: '80.00 BDAG',
    license: 'Enterprise',
    rating: 4.9,
    usage: '7.3K',
    performance: {
      accuracy: 98,
      speed: 45
    },
    creator: 'SecureFinance AI',
    createdAt: '2024-01-12',
    updatedAt: '1 day ago',
    trending: true
  },
  {
    id: '7g8h9i0j-1k2l-3m4n-5o6p-7q8r9s0t1u2v',
    name: 'Content Recommendation System',
    description: 'Personalized content recommendation engine using collaborative filtering and deep learning for enhanced user engagement.',
    category: 'prediction',
    tags: ['recommendation', 'personalization', 'content', 'user-engagement', 'collaborative-filtering'],
    price: '45.00 BDAG',
    license: 'Commercial',
    rating: 4.4,
    usage: '9.8K',
    performance: {
      accuracy: 85,
      speed: 110
    },
    creator: 'ContentAI Labs',
    createdAt: '2024-01-18',
    updatedAt: '6 days ago',
    trending: false
  },
  {
    id: '8h9i0j1k-2l3m-4n5o-6p7q-8r9s0t1u2v3w',
    name: 'Voice Recognition Pro',
    description: 'Advanced speech-to-text model with noise cancellation and speaker identification capabilities for various audio environments.',
    category: 'nlp',
    tags: ['speech', 'voice', 'recognition', 'audio', 'transcription'],
    price: '55.00 BDAG',
    license: 'Professional',
    rating: 4.7,
    usage: '6.5K',
    performance: {
      accuracy: 93,
      speed: 180
    },
    creator: 'AudioTech AI',
    createdAt: '2024-01-22',
    updatedAt: '2 days ago',
    trending: false
  },
  {
    id: '9i0j1k2l-3m4n-5o6p-7q8r-9s0t1u2v3w4x',
    name: 'Climate Prediction Model',
    description: 'Environmental forecasting system for climate change analysis and weather pattern prediction using satellite data.',
    category: 'prediction',
    tags: ['climate', 'weather', 'environment', 'satellite', 'forecasting'],
    price: '90.00 BDAG',
    license: 'Research',
    rating: 4.6,
    usage: '2.9K',
    performance: {
      accuracy: 88,
      speed: 250
    },
    creator: 'ClimateAI Research',
    createdAt: '2024-01-05',
    updatedAt: '1 week ago',
    trending: false
  }
];