export interface Product {
  id: string
  name: string
  category: 'women' | 'men' | 'accessories'
  price: number
  description: string
  sizes: string[]
  image: string | null
}

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Wool Tailored Coat',
    category: 'women',
    price: 428,
    description: 'A timeless wool coat with a tailored silhouette. Fully lined in silk for comfort and warmth.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    image: null,
  },
  {
    id: 'p2',
    name: 'Silk Slip Dress',
    category: 'women',
    price: 265,
    description: 'Pure silk slip dress with adjustable straps and a bias-cut silhouette.',
    sizes: ['XS', 'S', 'M', 'L'],
    image: null,
  },
  {
    id: 'p3',
    name: 'Cashmere Turtleneck',
    category: 'women',
    price: 210,
    description: 'Grade-A Mongolian cashmere turtleneck in a relaxed fit.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    image: null,
  },
  {
    id: 'p4',
    name: 'Pleated Midi Skirt',
    category: 'women',
    price: 188,
    description: 'Fluid pleated midi skirt in Italian crepe. Falls to the mid-calf.',
    sizes: ['XS', 'S', 'M', 'L'],
    image: null,
  },
  {
    id: 'p5',
    name: 'Linen Dropped-Shoulder Shirt',
    category: 'men',
    price: 165,
    description: 'Relaxed linen shirt with dropped shoulders and a boxy cut.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    image: '/uploads/caio-coelho-QRN47la37gw-unsplash.jpg',
  },
  {
    id: 'p6',
    name: 'Buffalo Check Flannel Overshirt',
    category: 'men',
    price: 178,
    description: 'Heavy-weight flannel overshirt in a classic buffalo check pattern.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    image: '/uploads/caio-coelho-xFmXLq_KJxg-unsplash.jpg',
  },
  {
    id: 'p7',
    name: 'Corduroy-Collar Denim Jacket',
    category: 'men',
    price: 298,
    description: 'Selvedge denim jacket with a contrast corduroy collar.',
    sizes: ['S', 'M', 'L', 'XL'],
    image: '/uploads/haryo-setyadi-acn5ERAeSb4-unsplash.jpg',
  },
  {
    id: 'p8',
    name: 'Essential Cotton Tee',
    category: 'men',
    price: 68,
    description: 'Heavy-weight 240gsm cotton tee with a boxy, oversized fit.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    image: '/uploads/mediamodifier-7cERndkOyDw-unsplash.jpg',
  },
  {
    id: 'p9',
    name: 'Leather Structured Tote',
    category: 'accessories',
    price: 420,
    description: 'Full-grain vegetable-tanned leather tote with brass hardware.',
    sizes: ['ONE SIZE'],
    image: '/uploads/mnz-ToLMORRb97Q-unsplash.jpg',
  },
  {
    id: 'p10',
    name: 'Silk Twill Scarf',
    category: 'accessories',
    price: 145,
    description: '100% silk twill scarf with hand-rolled edges. 90x90cm.',
    sizes: ['ONE SIZE'],
    image: '/uploads/taras-chernus-iIjResyhhW0-unsplash.jpg',
  },
  {
    id: 'p11',
    name: 'Gold-Plated Hoop Earrings',
    category: 'accessories',
    price: 98,
    description: '18k gold-plated brass hoop earrings, 4cm diameter.',
    sizes: ['ONE SIZE'],
    image: '/uploads/tian-dayong-lziP7ZPtghg-unsplash.jpg',
  },
  {
    id: 'p12',
    name: 'Merino Wool Beanie',
    category: 'accessories',
    price: 75,
    description: 'Fine merino wool ribbed beanie in a slouchy fit.',
    sizes: ['ONE SIZE'],
    image: '/uploads/tobias-tullius-Fg15LdqpWrs-unsplash.jpg',
  },
]
