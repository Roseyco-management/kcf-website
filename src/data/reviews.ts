export interface Review {
  id: string;
  author: string;
  rating: 5;
  date: string;
  text: string;
  source: 'google';
  verified: boolean;
}

export const googleReviews: Review[] = [
  {
    id: '1',
    author: 'Delwin Galeas',
    rating: 5,
    date: '2024-08-01',
    text: 'I loved the experience my family and I recently had with Ernesto Tinoco, always attentive to every detail of the transactions! Very good communication. We had two transactions at the same time. Thank you for his recommendations and attention. We are ready to continue working. I highly recommend him.',
    source: 'google',
    verified: true,
  },
  {
    id: '2',
    author: 'Jenifer Zelaya',
    rating: 5,
    date: '2024-08-01',
    text: 'Un excelente servicio, me encantó que fue un servicio personalizado el relator Ernesto Tinoco y su equipo se unieron a nuestra familia para poder vender y comprar una nueva casa! Nos encantó la manera en que nos trataron durante todo el proceso, la disponibilidad de ellos y sobre todo podría decir que los recomiendo a cualquiera que quiera vender o comprar su casa o ambos. Felicidades a este gran equipo sigan adelante, apoyan mucho a la comidas hispana en Kansas City Wide, están muy capacitados.',
    source: 'google',
    verified: true,
  },
  {
    id: '3',
    author: 'Flor F',
    rating: 5,
    date: '2024-07-15',
    text: 'I\'ve had the pleasure of working with Ernesto. He has helped me several times and I can\'t recommend him enough! He is extremely professional, always available, and his communication is top-notch! He\'s with you every step of the way guiding you. I truly appreciate how thoughtful and dedicated he is with his clients. I\'d hire him again in a heartbeat!',
    source: 'google',
    verified: true,
  },
  {
    id: '4',
    author: 'Rahnald Gorman',
    rating: 5,
    date: '2024-06-20',
    text: 'Working with Ernesto was an absolute pleasure. From the very beginning, he made the entire real estate process incredibly smooth and stress-free. Every step was clearly explained, and he took the time to ensure I felt comfortable and informed along the way. What really stood out was how easy he is to talk to—Ernesto creates a space where questions feel welcomed and conversations are effortless. Even after the purchase was complete, he continued to be available and responsive, which truly made me feel supported and valued. If you\'re looking for someone who combines professionalism with a genuine human touch, Ernesto is your guy.',
    source: 'google',
    verified: true,
  },
  {
    id: '5',
    author: 'Juan Luis Muñoz Ornelas',
    rating: 5,
    date: '2024-06-01',
    text: 'Ernesto is such a great guy to work with!!!',
    source: 'google',
    verified: true,
  },
  {
    id: '6',
    author: 'Blair W',
    rating: 5,
    date: '2024-05-25',
    text: 'Awesome group to work with!',
    source: 'google',
    verified: true,
  },
  {
    id: '7',
    author: 'William W. Harris',
    rating: 5,
    date: '2024-09-21',
    text: '',
    source: 'google',
    verified: true,
  },
  {
    id: '8',
    author: 'Emma M. Byrd',
    rating: 5,
    date: '2023-11-03',
    text: 'Ernesto Tinoco helped us find a loan when we were struggling to obtain with our unique financial situation. He also stuck by us while we tried to find a communal home large enough for all of our family to live together. After all of that, he then helped us sell my Aunt & Uncle\'s home and helped us find them retirement apartments to move in to. He is our absolute angel and is a great guy overall.',
    source: 'google',
    verified: true,
  },
  {
    id: '9',
    author: 'javion manning',
    rating: 5,
    date: '2023-10-16',
    text: 'My wife and I were very scared and worried buying our first house. Ernesto from the beginning was very upfront and worked endless hours to help us get into our beautiful house. He eased the process by telling us ahead of time what to expect during the buying process. We recommend Ernesto and we wholeheartedly appreciate him.',
    source: 'google',
    verified: true,
  },
  {
    id: '10',
    author: 'Allan Chan',
    rating: 5,
    date: '2024-08-01',
    text: '',
    source: 'google',
    verified: true,
  },
];

export const reviewStats = {
  totalReviews: 10,
  averageRating: 5.0,
  ratingBreakdown: {
    5: 10,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  },
};
