import type { Product, Testimonial, FAQ, Stat, TimelineEvent, NavLink, TeamMember, Career, BlogPost } from '@/types';

export const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  {
    label: 'About', href: '/about',
    children: [
      { label: 'Our Story', href: '/about#story' },
      { label: 'Team', href: '/about#team' },
      { label: 'Awards', href: '/about#awards' },
    ],
  },
  {
    label: 'Products', href: '/products',
    children: [
      { label: 'Champagne', href: '/products/champagne' },
      { label: 'Classic Wine', href: '/products/classic-wine' },
      { label: 'Non-Alcoholic Wine', href: '/products/non-alcoholic-wine' },
      { label: 'Premium Table Water', href: '/products/table-water' },
    ],
  },
  { label: 'Wholesale', href: '/wholesale' },
  { label: 'Manufacturing', href: '/manufacturing' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Blog', href: '/blog' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
];

export const products: Product[] = [
  {
    slug: 'champagne',
    name: 'Superior Premium Champagne',
    category: 'alcoholic-wine',
    subcategory: 'Champagne',
    tagline: 'Celebrate Every Moment',
    description: 'An exquisite sparkling champagne crafted with precision and passion. Perfect for celebrations, corporate events, and distinguished gatherings.',
    longDescription: 'Our Superior Premium Champagne represents the pinnacle of our winemaking expertise. Produced using the traditional methode champenoise, each bottle undergoes a meticulous secondary fermentation process that creates the fine, persistent bubbles and complex flavor profile that discerning champagne lovers appreciate. With notes of citrus, brioche, and white flowers, our champagne delivers an unforgettable tasting experience from the first sip to the lingering finish.',
    features: ['Traditional Methode Champenoise', 'Aged 24+ months on lees', 'Fine persistent bubbles', 'Complex citrus and brioche notes', 'Elegant golden color', 'Premium natural cork closure'],
    packaging: [
      { size: '750ml', type: 'Glass Bottle', unitsPerCarton: '6' },
      { size: '1.5L (Magnum)', type: 'Glass Bottle', unitsPerCarton: '3' },
    ],
    benefits: ['Perfect for celebrations and events', 'Premium gifting option', 'Available in wholesale quantities', 'Custom labeling for corporate clients'],
    servingSuggestions: ['Serve chilled at 6-8°C', 'Ideal as an aperitif', 'Pairs excellently with seafood and light appetizers', 'Perfect for toasts and celebrations'],
    images: ['/ChampaigneWINE.jpg', '/images/champagne-2.jpg', '/images/champagne-3.jpg'],
    color: '#C9A84C',
  },
  {
    slug: 'classic-wine',
    name: 'Superior Classic Wine',
    category: 'alcoholic-wine',
    subcategory: 'Premium Classic Wine',
    tagline: 'Timeless Elegance in Every Glass',
    description: 'A rich, full-bodied classic wine that embodies the heritage of premium winemaking. Smooth tannins and deep flavors create an exceptional drinking experience.',
    longDescription: 'Superior Classic Wine is a testament to our commitment to producing world-class wines right here in Nigeria. This premium alcoholic wine is carefully crafted from select grape varieties, fermented under controlled temperatures, and aged in oak barrels to develop its characteristic depth and complexity. With its deep ruby color, aromas of dark berries and subtle oak, and a velvety smooth finish, this wine is designed for those who appreciate the finer things in life.',
    features: ['Oak barrel aged 12+ months', 'Premium grape selection', 'Controlled temperature fermentation', 'Deep ruby color with purple hues', 'Rich dark berry aromas', 'Velvety smooth finish'],
    packaging: [
      { size: '750ml', type: 'Glass Bottle', unitsPerCarton: '12' },
      { size: '375ml', type: 'Glass Bottle', unitsPerCarton: '24' },
      { size: '1.5L', type: 'Glass Bottle', unitsPerCarton: '6' },
    ],
    benefits: ['Versatile food pairing wine', 'Excellent for dinner parties', 'Wholesale pricing available', 'Suitable for hotels and restaurants'],
    servingSuggestions: ['Serve at 16-18°C', 'Decant 30 minutes before serving', 'Pairs with grilled meats, stews, and aged cheeses', 'Ideal for formal dining occasions'],
    images: ['/AlcoholicWINE.jpg', '/images/classic-wine-2.jpg', '/images/classic-wine-3.jpg'],
    color: '#722F37',
  },
  {
    slug: 'non-alcoholic-wine',
    name: 'Superior Premium Red Wine (Non-Alcoholic)',
    category: 'non-alcoholic-wine',
    subcategory: 'Non-Alcoholic Wine',
    tagline: 'All the Flavor, None of the Alcohol',
    description: 'A premium non-alcoholic red wine that delivers the full wine experience without the alcohol. Perfect for health-conscious consumers and special occasions.',
    longDescription: 'Our Superior Premium Non-Alcoholic Red Wine allows everyone to enjoy the sophisticated taste of fine wine without the effects of alcohol. Using advanced dealcoholization technology, we carefully remove the alcohol while preserving the wine\'s complex flavor profile, aroma, and body. The result is a rich, fruity wine with notes of ripe berries, subtle spices, and a smooth finish that rivals traditional wines. It\'s the perfect choice for designated drivers, health-conscious individuals, and those who prefer not to consume alcohol.',
    features: ['Advanced dealcoholization technology', '0.0% alcohol content', 'Preserved flavor complexity', 'Rich berry and spice notes', 'Smooth, satisfying finish', 'Premium glass bottle packaging'],
    packaging: [
      { size: '750ml', type: 'Glass Bottle', unitsPerCarton: '12' },
      { size: '375ml', type: 'Glass Bottle', unitsPerCarton: '24' },
    ],
    benefits: ['Suitable for all adults', 'Safe for designated drivers', 'Health-conscious choice', 'Halal-certified available', 'Perfect for inclusive events'],
    servingSuggestions: ['Serve slightly chilled at 14-16°C', 'Pairs with all cuisines', 'Excellent for family gatherings', 'Ideal for corporate events with diverse attendees'],
    images: ['/NORMALWINE1.jpg', '/images/non-alcoholic-2.jpg', '/images/non-alcoholic-3.jpg'],
    color: '#9B2335',
  },
  {
    slug: 'table-water',
    name: 'Superior Premium Table Water',
    category: 'bottled-water',
    subcategory: 'Premium Table Water',
    tagline: 'Purity You Can Taste',
    description: 'Crystal-clear premium table water sourced and purified to the highest standards. Refreshing, clean, and perfect for every occasion.',
    longDescription: 'Superior Premium Table Water is the cornerstone of our product line, reflecting our unwavering commitment to quality and purity. Sourced from deep, protected aquifers and processed through our state-of-the-art multi-stage purification system, every drop delivers crystal-clear refreshment. Our rigorous quality control process ensures that each bottle meets the highest national and international standards for bottled water. With its balanced mineral content and clean, crisp taste, Superior Premium Table Water is the preferred choice for homes, offices, hotels, restaurants, and events across Nigeria.',
    features: ['Multi-stage purification process', 'Balanced mineral content', 'pH balanced 7.0-7.5', 'NAFDAC certified', 'BPA-free packaging', 'Regular quality testing'],
    packaging: [
      { size: '50cl', type: 'PET Bottle', unitsPerCarton: '24' },
      { size: '75cl', type: 'PET Bottle', unitsPerCarton: '12' },
      { size: '1.5L', type: 'PET Bottle', unitsPerCarton: '12' },
      { size: '18.9L', type: 'Dispenser Bottle', unitsPerCarton: '1' },
    ],
    benefits: ['Essential for every home and office', 'Bulk delivery available', 'Office water cooler supply', 'Event and conference supply', 'Competitive wholesale pricing'],
    servingSuggestions: ['Best served chilled', 'Perfect for hydration at events', 'Ideal for office water coolers', 'Great for restaurants and hotels'],
    images: ['/WATER.jpg', '/images/water-2.jpg', '/images/water-3.jpg'],
    color: '#1B2A4A',
  },
];

export const testimonials: Testimonial[] = [
  { id: 1, name: 'Chief Adewale Okonkwo', role: 'Procurement Director', company: 'Lagos Continental Hotel', content: 'Superior Beverages has been our trusted supplier for over 5 years. Their champagne is always the highlight of our events, and their delivery is consistently reliable. The quality is unmatched in the Nigerian market.', rating: 5, avatar: '/images/avatar-1.jpg' },
  { id: 2, name: 'Mrs. Funke Adeyemi', role: 'Owner', company: 'The Wine Cellar Lagos', content: 'As a wine retailer, I can confidently say that Superior Beverages offers the best value for premium wines. My customers love the Classic Wine, and the wholesale pricing allows me excellent margins.', rating: 5, avatar: '/images/avatar-2.jpg' },
  { id: 3, name: 'Mr. Emeka Nwosu', role: 'Event Planner', company: 'Prestige Events Abuja', content: 'I recommend Superior Beverages to all my clients. Their product range covers every need, from premium champagne for weddings to their excellent non-alcoholic wine for inclusive corporate events.', rating: 5, avatar: '/images/avatar-3.jpg' },
  { id: 4, name: 'Dr. Amina Bello', role: 'Operations Manager', company: 'Savannah Distributors Ltd', content: 'We have been distributing Superior Table Water for 3 years and the demand keeps growing. The quality is consistent, and the brand reputation makes it easy to sell. Their support for distributors is exceptional.', rating: 4, avatar: '/images/avatar-4.jpg' },
  { id: 5, name: 'Mr. Tunde Bakare', role: 'Restaurant Manager', company: 'Ocean Basket Victoria Island', content: 'Our patrons specifically ask for Superior wines. The Non-Alcoholic Red Wine has been a game-changer for our menu, allowing us to cater to all guests equally. Excellent product and service.', rating: 5, avatar: '/images/avatar-5.jpg' },
];

export const faqs: FAQ[] = [
  { id: 1, question: 'What products does Superior Beverages manufacture?', answer: 'Superior Beverages manufactures a range of premium beverages including Champagne, Classic Wine, Non-Alcoholic Red Wine, and Premium Table Water. All products are produced under strict quality control standards and are NAFDAC certified.', category: 'Products' },
  { id: 2, question: 'How can I become a distributor?', answer: 'To become a distributor, you can register through our Distributor Registration page on this website. You will need to provide your business information, CAC registration documents, and valid identification. Our team will review your application within 5-7 business days.', category: 'Wholesale' },
  { id: 3, question: 'Do you offer wholesale pricing?', answer: 'Yes, we offer competitive wholesale pricing for bulk orders. Our wholesale program is available for hotels, restaurants, bars, retailers, event planners, and corporate buyers. Contact our wholesale team for a customized quote based on your volume requirements.', category: 'Wholesale' },
  { id: 4, question: 'What is the minimum order quantity?', answer: 'Minimum order quantities vary by product and customer type. For wholesale orders, the minimum is typically 10 cartons. For distributor orders, minimum quantities are discussed during the registration process. Contact us for specific requirements.', category: 'Wholesale' },
  { id: 5, question: 'Do you deliver nationwide?', answer: 'Yes, Superior Beverages delivers across Nigeria. We have distribution centers in Lagos, Abuja, Port Harcourt, and Kano. Delivery times vary by location, typically 1-3 business days for major cities and 3-7 days for other areas.', category: 'Delivery' },
  { id: 6, question: 'Are your products NAFDAC certified?', answer: 'Absolutely. All Superior Beverages products are NAFDAC certified and meet the highest food safety standards. We also maintain ISO 22000 certification for our food safety management system and undergo regular quality audits.', category: 'Quality' },
  { id: 7, question: 'Is the Non-Alcoholic Wine completely alcohol-free?', answer: 'Yes, our Superior Premium Non-Alcoholic Red Wine contains 0.0% alcohol. We use advanced dealcoholization technology that removes all alcohol while preserving the wine\'s flavor, aroma, and body. It is suitable for all adults, including those who avoid alcohol for religious, health, or personal reasons.', category: 'Products' },
  { id: 8, question: 'Can I get custom branding for corporate events?', answer: 'Yes, we offer custom labeling and branding services for corporate clients. This is available for minimum orders of 50 cartons. Our design team can work with your brand guidelines to create bespoke labels. Contact our corporate sales team for details.', category: 'Wholesale' },
];

export const stats: Stat[] = [
  { label: 'Bottles Produced Daily', value: 50000, suffix: '+' },
  { label: 'Active Distributors', value: 250, suffix: '+' },
  { label: 'Years in Business', value: 15, suffix: '' },
  { label: 'States Covered', value: 36, suffix: '' },
];

export const timeline: TimelineEvent[] = [
  { year: '2009', title: 'Foundation', description: 'Superior Beverages was established in Lagos with a vision to produce world-class beverages in Nigeria.' },
  { year: '2011', title: 'First Product Launch', description: 'Launched Superior Premium Table Water, quickly gaining market acceptance for its exceptional purity.' },
  { year: '2013', title: 'Wine Division Established', description: 'Expanded into wine production with the introduction of Superior Classic Wine.' },
  { year: '2015', title: 'Champagne Launch', description: 'Launched Superior Premium Champagne, marking our entry into the luxury beverage segment.' },
  { year: '2017', title: 'National Distribution', description: 'Achieved nationwide distribution coverage across all 36 states of Nigeria.' },
  { year: '2019', title: 'ISO Certification', description: 'Earned ISO 22000 certification for our food safety management system.' },
  { year: '2021', title: 'Non-Alcoholic Range', description: 'Introduced the Non-Alcoholic Wine range, expanding our market reach significantly.' },
  { year: '2023', title: 'New Production Facility', description: 'Commissioned our state-of-the-art production facility with tripled capacity.' },
  { year: '2025', title: 'Regional Expansion', description: 'Expanding distribution across West Africa, serving the growing regional demand.' },
];

export const teamMembers: TeamMember[] = [
  { name: 'Engr. Olusegun Adebanjo', role: 'Founder & Chairman', bio: 'With over 30 years in the Nigerian beverage industry, Engr. Adebanjo founded Superior Beverages with a vision to create world-class products that Nigerians can be proud of.', image: '/images/team-1.jpg' },
  { name: 'Mrs. Bolatito Adebanjo', role: 'Managing Director', bio: 'A seasoned business leader with expertise in operations management and brand development, driving the company\'s growth across Nigeria.', image: '/images/team-2.jpg' },
  { name: 'Mr. Chukwuma Eze', role: 'Head of Production', bio: 'A food science expert with 20+ years of experience in beverage manufacturing, ensuring every product meets international quality standards.', image: '/images/team-3.jpg' },
  { name: 'Mrs. Aisha Mohammed', role: 'Head of Sales & Distribution', bio: 'Building and managing our nationwide distribution network, Aisha has expanded our reach to every state in Nigeria.', image: '/images/team-4.jpg' },
  { name: 'Mr. Kayode Ogunleye', role: 'Quality Assurance Manager', bio: 'A meticulous quality professional who ensures every bottle that leaves our facility meets our exacting standards.', image: '/images/team-5.jpg' },
  { name: 'Ms. Ngozi Obi', role: 'Marketing Director', bio: 'A creative marketing strategist who has positioned Superior Beverages as a premium lifestyle brand across Nigeria.', image: '/images/team-6.jpg' },
];

export const careers: Career[] = [
  { id: 1, title: 'Production Supervisor', department: 'Manufacturing', location: 'Lagos', type: 'Full-time', description: 'Oversee daily production operations, ensure quality standards are met, and manage a team of production staff.', requirements: ['BSc in Food Science or related field', '5+ years in beverage manufacturing', 'Knowledge of HACCP and ISO standards', 'Strong leadership skills'] },
  { id: 2, title: 'Sales Representative', department: 'Sales', location: 'Multiple Locations', type: 'Full-time', description: 'Drive sales growth in assigned territories, build relationships with distributors and retailers, and meet monthly targets.', requirements: ['BSc in Business or Marketing', '3+ years sales experience in FMCG', 'Excellent communication skills', 'Valid driver\'s license'] },
  { id: 3, title: 'Quality Control Analyst', department: 'Quality Assurance', location: 'Lagos', type: 'Full-time', description: 'Conduct laboratory tests, maintain quality records, and ensure all products meet regulatory requirements.', requirements: ['BSc in Chemistry or Microbiology', 'Experience in food/beverage testing', 'Knowledge of NAFDAC regulations', 'Attention to detail'] },
  { id: 4, title: 'Digital Marketing Specialist', department: 'Marketing', location: 'Lagos', type: 'Full-time', description: 'Manage digital marketing campaigns, social media presence, and online brand engagement for Superior Beverages.', requirements: ['BSc in Marketing or related field', '3+ years digital marketing experience', 'Proficiency in social media management tools', 'Creative and data-driven mindset'] },
];

export const blogPosts: BlogPost[] = [
  {
    slug: 'rise-of-nigerian-wine',
    title: 'The Rise of Nigerian Wine: A New Era for Local Winemaking',
    excerpt: 'Nigeria\'s wine industry is experiencing unprecedented growth. Discover how local winemakers are crafting world-class wines that rival international brands.',
    content: 'The Nigerian wine industry has come a long way from its humble beginnings. Today, Nigerian wineries are producing wines that can stand shoulder to shoulder with the best from Europe and the Americas. At Superior Beverages, we are proud to be at the forefront of this revolution.\n\nThe journey began with a simple belief: that Nigeria has the talent, resources, and passion to produce exceptional wines. Our winemakers have spent years perfecting their craft, studying international techniques, and adapting them to our unique climate and conditions.\n\nWhat sets Nigerian wines apart is their distinct character. Our wines reflect the warmth and vibrancy of Nigerian culture while maintaining the sophistication and complexity that wine connoisseurs demand. From our Champagne that sparkles with celebration to our Classic Wine that speaks of heritage, each bottle tells a story of Nigerian excellence.\n\nThe future is bright for Nigerian wine. As more consumers discover the quality of locally produced wines, the industry continues to grow. At Superior Beverages, we remain committed to pushing the boundaries of what Nigerian winemaking can achieve.',
    category: 'Wine Education',
    author: 'Ngozi Obi',
    date: '2025-05-15',
    readTime: '5 min read',
    image: '/images/blog-1.jpg',
  },
  {
    slug: 'hydration-benefits-premium-water',
    title: 'Why Premium Water Matters: The Science of Proper Hydration',
    excerpt: 'Not all water is created equal. Learn about the importance of mineral balance, pH levels, and purification in choosing the right drinking water.',
    content: 'Water is essential for life, but not all water provides the same benefits. At Superior Beverages, we believe that the water you drink should do more than just quench your thirst — it should nourish your body.\n\nOur Premium Table Water undergoes a sophisticated multi-stage purification process that removes impurities while maintaining a balanced mineral content. This balance is crucial because minerals like calcium, magnesium, and potassium play vital roles in our body\'s functions.\n\nThe pH level of your drinking water also matters. Water that is too acidic or too alkaline can affect your body\'s natural balance. Superior Premium Table Water is carefully pH-balanced between 7.0 and 7.5, which is optimal for human consumption.\n\nProper hydration with quality water supports cognitive function, aids digestion, promotes healthy skin, and helps maintain energy levels throughout the day. For businesses, providing premium water to employees and guests is an investment in their wellbeing and productivity.\n\nWhether you\'re at home, in the office, or at an event, choosing premium water is a choice for better health. Make Superior Premium Table Water your hydration partner.',
    category: 'Healthy Living',
    author: 'Dr. Amina Bello',
    date: '2025-04-22',
    readTime: '4 min read',
    image: '/images/blog-2.jpg',
  },
  {
    slug: 'non-alcoholic-wine-trending',
    title: 'The Non-Alcoholic Wine Revolution: Why More Nigerians Are Choosing Alcohol-Free',
    excerpt: 'Non-alcoholic wine is one of the fastest-growing segments in the beverage industry. Discover why this trend is taking Nigeria by storm.',
    content: 'The global non-alcoholic beverage market is booming, and Nigeria is no exception. More Nigerians are choosing alcohol-free alternatives for health, religious, and personal reasons, and non-alcoholic wine is leading the charge.\n\nAt Superior Beverages, we recognized this trend early and invested in advanced dealcoholization technology that allows us to produce non-alcoholic wine with all the flavor and complexity of traditional wine, but without the alcohol.\n\nThe appeal of non-alcoholic wine extends far beyond those who abstain from alcohol entirely. It\'s also popular among designated drivers, pregnant women, health-conscious professionals, and anyone who wants to enjoy the wine experience without the effects of alcohol.\n\nFor event planners and venues, offering non-alcoholic wine is a way to be inclusive. Every guest deserves to raise a glass and feel part of the celebration, regardless of their drinking preferences.\n\nOur Superior Premium Non-Alcoholic Red Wine has been particularly well-received. With its rich berry notes, smooth finish, and 0.0% alcohol content, it proves that you don\'t need alcohol to enjoy a premium wine experience.',
    category: 'Industry Updates',
    author: 'Kayode Ogunleye',
    date: '2025-03-10',
    readTime: '6 min read',
    image: '/images/blog-3.jpg',
  },
  {
    slug: 'hosting-perfect-dinner-party',
    title: 'Hosting the Perfect Nigerian Dinner Party: A Wine Pairing Guide',
    excerpt: 'From jollof rice to suya, learn how to pair Superior Beverages wines with your favorite Nigerian dishes for an unforgettable dining experience.',
    content: `Planning a dinner party? The right wine pairing can elevate your meal from good to extraordinary. Here's our guide to pairing Superior Beverages wines with popular Nigerian dishes.\n\n**Jollof Rice & Grilled Chicken** — Our Superior Classic Wine is the perfect companion. The wine's rich berry flavors complement the smoky, spicy notes of jollof rice, while its smooth tannins pair beautifully with grilled chicken.\n\n**Peppered Snails** — For this delicacy, reach for our Superior Premium Champagne. The effervescence cleanses the palate between bites, while the citrus notes complement the pepper sauce.\n\n**Suya & Grilled Meats** — The bold, spicy flavors of suya need a wine that can stand up to them. Our Classic Wine's full body and dark fruit flavors are an excellent match.\n\n**Small Chops & Finger Foods** — Champagne is the natural choice for appetizers. The bubbles and acidity cut through fried foods, refreshing your palate for the next bite.\n\n**For Non-Drinkers** — Our Non-Alcoholic Red Wine pairs wonderfully with all Nigerian dishes, ensuring every guest can enjoy the full experience.\n\nRemember, the best pairing is one that you and your guests enjoy. These suggestions are starting points — feel free to experiment and discover your own favorite combinations.`,
    category: 'Wine Education',
    author: 'Ngozi Obi',
    date: '2025-02-14',
    readTime: '7 min read',
    image: '/images/blog-4.jpg',
  },
];
