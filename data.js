```javascript
const DEFAULT_SITE_CONFIG = {
  brandName: "Bluvi",
  tagline: "FEEL THE BLUE VIBE",
  phone: "+20 10 98586553",
  whatsapp: "201098586553",
  email: "Bluvihurghada@gmail.com",
  address: "El-Bahr St, Hurghada 1, Red Sea Governorate 84511",
  heroVideoUrl: "",
  heroImageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=85"
};

const DEFAULT_TRIPS_DATA = [
  {
    id: "speed-orange-bay",
    category: "speedboats",
    badge: "VIP Speedboat #1",
    title: "Private Speedboat to Orange Bay Island (3 Hours)",
    titleDe: "Privates Schnellboot zur Orange Bay Insel (3 Stunden)",
    duration: "3 Hours",
    durationDe: "3 Stunden",
    location: "Hurghada Marina",
    pricePerPerson: 180,
    currency: "€",
    unitLabel: "speedboat (up to 6 guests)",
    unitLabelDe: "Schnellboot (bis zu 6 Gäste)",
    isPrivateBoat: true,
    maxGuests: 6,
    image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Beat the big tour boats! Reach Orange Bay Island in just 15 minutes on your own private high-speed boat with captain, chilled drinks, fruit platter, and snorkeling gear.",
    shortDescDe: "Überholen Sie die großen Ausflugsboote! Erreichen Sie die Orange Bay Insel in nur 15 Minuten mit Ihrem eigenen privaten Schnellboot inklusive Kapitän, gekühlten Getränken, Obst und Schnorchelausrüstung.",
    fullDesc: "Skip the crowded group yachts and arrive at Orange Bay Island ahead of the crowds on your own private high-speed boat from Hurghada. Ideal for couples, families, or friends up to 6 guests—customize your beach relaxation time and private coral reef snorkeling stops with your personal captain.",
    fullDescDe: "Vermeiden Sie überfüllte Gruppenboote und erreichen Sie die Orange Bay Insel vor allen anderen auf Ihrem eigenen privaten Schnellboot ab Hurghada. Ideal für Paare, Familien oder Freunde bis zu 6 Personen – gestalten Sie Ihre Strandzeit und privaten Schnorchelstopps flexibel mit Ihrem eigenen Kapitän.",
    highlights: [
      "Private high-speed boat exclusively for your group (up to 6 guests)",
      "Fast 15-minute ride from Hurghada directly to Orange Bay Island",
      "Private coral reef snorkeling stop away from crowded boats",
      "Includes chilled soft drinks, water, seasonal fruit & snorkeling gear",
      "Flexible departure times (Morning or Afternoon slot)"
    ],
    included: [
      "Private Speedboat & Experienced Captain (3 Hours)",
      "Fuel & Marina Fees",
      "Snorkeling Masks, Fins & Life Vests",
      "Chilled Water, Soft Drinks & Fresh Fruit",
      "Private Hotel Pickup & Drop-off in Hurghada"
    ],
    requirements: [
      "Maximum capacity: 6 guests per speedboat",
      "Island entrance fee payable on-site if landing on beach"
    ]
  },
  {
    id: "speed-white-island",
    category: "speedboats",
    badge: "Trending Sandbar",
    title: "VIP Speedboat: White Island & Abu Minqar Sandbar (3 Hours)",
    titleDe: "VIP-Schnellboot: White Island & Abu Minqar Sandbank (3 Stunden)",
    duration: "3 Hours",
    durationDe: "3 Stunden",
    location: "Hurghada",
    pricePerPerson: 190,
    currency: "€",
    unitLabel: "speedboat (up to 6 guests)",
    unitLabelDe: "Schnellboot (bis zu 6 Gäste)",
    isPrivateBoat: true,
    maxGuests: 6,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Walk on dazzling white sandbanks surrounded by crystal-clear Maldives-blue lagoons! Anchor your private speedboat right at White Island & Abu Minqar for swimming and photos.",
    shortDescDe: "Spazieren Sie über strahlend weiße Sandbänke inmitten kristallklarer Lagunen! Ankern Sie mit Ihrem privaten Schnellboot direkt an White Island & Abu Minqar zum Schwimmen und Fotografieren.",
    fullDesc: "Discover Hurghada's famous White Island and Abu Minqar sandbars on a private 3-hour speedboat charter. Anchor in knee-deep turquoise lagoons, walk along powder-white sandbanks in the middle of the Red Sea, and snorkel vibrant shallow coral gardens in complete privacy.",
    fullDescDe: "Entdecken Sie Hurghadas berühmte White Island und die Sandbänke von Abu Minqar bei einer 3-stündigen privaten Schnellboot-Tour. Ankern Sie in türkisfarbenen Lagunen und schnorcheln Sie an unberührten Korallengärten in völliger Privatsphäre.",
    highlights: [
      "Visit Hurghada's famous White Island & Abu Minqar white sandbars",
      "Crystal-clear shallow turquoise lagoons ideal for photos & swimming",
      "Private coral reef snorkeling stop included",
      "Chilled refreshments, fresh fruit & Bluetooth music onboard"
    ],
    included: [
      "Private Speedboat & Captain (3 Hours)",
      "Snorkeling Equipment for All Guests",
      "Chilled Soft Drinks, Water & Fresh Fruit",
      "Hurghada Hotel Transfers"
    ],
    requirements: [
      "Maximum capacity: 6 guests per speedboat"
    ]
  },
  {
    id: "speed-dolphin-house",
    category: "speedboats",
    badge: "Speedboat Wildlife",
    title: "Private Speedboat: Dolphin Watching & Reef Snorkeling (4 Hours)",
    titleDe: "Privates Schnellboot: Delfinbeobachtung & Riffschnorcheln (4 Stunden)",
    duration: "4 Hours",
    durationDe: "4 Stunden",
    location: "Hurghada",
    pricePerPerson: 240,
    currency: "€",
    unitLabel: "speedboat (up to 6 guests)",
    unitLabelDe: "Schnellboot (bis zu 6 Gäste)",
    isPrivateBoat: true,
    maxGuests: 6,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Search for wild Red Sea dolphins on a fast, agile private speedboat that lets you reach dolphin pods quickly and snorkel pristine coral reefs in total privacy.",
    shortDescDe: "Beobachten Sie wilde Delfine im Roten Meer auf einem schnellen, wendigen privaten Schnellboot und schnorcheln Sie an unberührten Korallenriffen.",
    fullDesc: "Experience the thrill of spotting wild spinner and bottlenose dolphins on a nimble private speedboat in Hurghada. Unlike slow group boats, a private speedboat covers more sea area smoothly and lets you enjoy respectful dolphin encounters plus two secluded coral reef snorkeling stops.",
    fullDescDe: "Erleben Sie wilde Delfine im Roten Meer auf einem privaten Schnellboot ab Hurghada. Schneller und flexibler als große Ausflugsboote – inklusive zwei privater Schnorchelstopps an bunten Korallenriffen.",
    highlights: [
      "4-hour private speedboat charter dedicated to dolphin spotting & reefs",
      "High-speed agility to locate wild dolphins in open Red Sea waters",
      "2 private snorkeling stops at vibrant coral gardens",
      "Chilled drinks, fresh fruits, and full snorkeling equipment onboard"
    ],
    included: [
      "Private Speedboat & Captain (4 Hours)",
      "Snorkeling Equipment for All Guests",
      "Chilled Soft Drinks, Water & Snacks",
      "Hurghada Hotel Transfers"
    ],
    requirements: [
      "Maximum capacity: 6 guests per speedboat"
    ]
  },
  {
    id: "speed-paradise-magawish",
    category: "speedboats",
    badge: "Twin-Island VIP",
    title: "VIP Speedboat: Paradise Island & Magawish Sandbar (4 Hours)",
    titleDe: "VIP-Schnellboot: Paradise Island & Magawish Sandbank (4 Stunden)",
    duration: "4 Hours",
    durationDe: "4 Stunden",
    location: "Hurghada",
    pricePerPerson: 230,
    currency: "€",
    unitLabel: "speedboat (up to 6 guests)",
    unitLabelDe: "Schnellboot (bis zu 6 Gäste)",
    isPrivateBoat: true,
    maxGuests: 6,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Combine two iconic Red Sea islands in one half-day private speedboat tour! Walk the white sandbar of Magawish and relax on Paradise Island with reef snorkeling.",
    shortDescDe: "Kombinieren Sie zwei Trauminseln des Roten Meeres in einer 4-stündigen privaten Schnellboot-Tour: Magawish Sandbank & Paradise Island.",
    fullDesc: "Why settle for one island when your private speedboat can take you to two? Cruise across crystal-clear turquoise lagoons to walk the famous white sandbar of Magawish Island, relax on Paradise Island's soft beach, and snorkel vibrant shallow coral reefs along the way.",
    fullDescDe: "Warum nur eine Insel besuchen, wenn Ihr privates Schnellboot Sie zu zwei Paradiesen bringt? Besuchen Sie die berühmte Sandbank von Magawish Island und entspannen Sie am weißen Sandstrand von Paradise Island.",
    highlights: [
      "Visit both Magawish Island sandbar & Paradise Island in 4 hours",
      "Private speedboat with shade canopy, sun deck & sound system",
      "Crystal-clear turquoise lagoons ideal for swimming and photos",
      "Includes snorkeling gear, chilled drinks, and fresh fruit platter"
    ],
    included: [
      "Private Speedboat & Captain (4 Hours)",
      "Snorkeling Gear & Life Jackets",
      "Chilled Water, Sodas & Fresh Fruit",
      "Hurghada Hotel Pickup & Return"
    ],
    requirements: [
      "Maximum capacity: 6 guests per speedboat"
    ]
  },
  {
    id: "speed-full-day-charter",
    category: "speedboats",
    badge: "Full-Day VIP Charter",
    title: "Full-Day Private Speedboat Charter (7 Hours — Custom Route)",
    titleDe: "Ganztägiger Privater Schnellboot-Charter (7 Stunden — Wunschroute)",
    duration: "7 Hours (Full Day)",
    durationDe: "7 Stunden (Ganztägig)",
    location: "Hurghada / El Gouna",
    pricePerPerson: 360,
    currency: "€",
    unitLabel: "speedboat (up to 8 guests)",
    unitLabelDe: "Schnellboot (bis zu 8 Gäste)",
    isPrivateBoat: true,
    maxGuests: 8,
    image: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Your boat, your schedule for the entire day! Design your own Red Sea itinerary across Orange Bay, White Island, Giftun reefs, Dolphin House, or El Gouna lagoons.",
    shortDescDe: "Ihr Boot, Ihr Zeitplan für den ganzen Tag! Gestalten Sie Ihre eigene Route nach Orange Bay, White Island, Dolphin House oder El Gouna.",
    fullDesc: "Enjoy complete freedom on the Red Sea with a 7-hour full-day private speedboat charter for up to 8 guests. Choose your own stops—combine dolphin watching, Orange Bay, White Island or Paradise Island beach time, multiple coral reef snorkeling spots, or a coastal cruise toward El Gouna.",
    fullDescDe: "Genießen Sie volle Freiheit auf dem Roten Meer mit einem 7-stündigen privaten Schnellboot-Charter für bis zu 8 Gäste. Kombinieren Sie Delfine, Inseln und Korallenriffe nach Ihren Wünschen.",
    highlights: [
      "7 full hours of private speedboat charter (up to 8 guests)",
      "100% customizable itinerary with your personal Red Sea captain",
      "Visit multiple islands, sandbars, and top coral reefs in one day",
      "Includes cooler with soft drinks, water, fruit & snorkeling gear"
    ],
    included: [
      "Private Speedboat & Captain (7 Hours)",
      "All Fuel & Harbor Fees",
      "Snorkeling Gear for Up to 8 Guests",
      "Chilled Drinks, Water & Fresh Fruit Platter",
      "Private Hotel Transfers in Hurghada"
    ],
    requirements: [
      "Maximum capacity: 8 guests per speedboat"
    ]
  },
  {
    id: "speed-sunset-cruise",
    category: "speedboats",
    badge: "Romantic & Chill",
    title: "Private Sunset Speedboat Cruise & Lagoon Swim (2 Hours)",
    titleDe: "Private Sonnenuntergangs-Schnellbootfahrt & Lagunen-Schwimmen (2 Std.)",
    duration: "2 Hours (Sunset)",
    durationDe: "2 Stunden (Sonnenuntergang)",
    location: "Hurghada Coast",
    pricePerPerson: 130,
    currency: "€",
    unitLabel: "speedboat (up to 6 guests)",
    unitLabelDe: "Schnellboot (bis zu 6 Gäste)",
    isPrivateBoat: true,
    maxGuests: 6,
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Watch the sun dip behind the Red Sea mountains from the open water on a private golden-hour speedboat cruise with music, chilled drinks, and a sunset swim.",
    shortDescDe: "Erleben Sie den Sonnenuntergang hinter den Bergen des Roten Meeres auf einer privaten Schnellbootfahrt mit Musik und gekühlten Getränken.",
    fullDesc: "End your Hurghada day in style with a private 2-hour sunset speedboat cruise. Glide across golden-lit Red Sea waters, anchor in a tranquil lagoon for a late-afternoon swim, play your favorite playlist on the boat's sound system, and capture unforgettable sunset photos.",
    fullDescDe: "Lassen Sie Ihren Tag in Hurghada stilvoll bei einer 2-stündigen privaten Sonnenuntergangstour ausklingen – inklusive Lagunenstopp, Soundsystem und Erfrischungen.",
    highlights: [
      "Private golden-hour speedboat cruise along the Hurghada coastline",
      "Tranquil lagoon stop for a refreshing sunset swim",
      "Bluetooth sound system, chilled soft drinks & fresh fruit",
      "Ideal for proposals, anniversaries, couples & private groups"
    ],
    included: [
      "Private Speedboat & Captain (2 Hours)",
      "Chilled Soft Drinks, Water & Fruit",
      "Snorkeling Masks & Floating Noodles",
      "Hurghada Hotel Transfers"
    ],
    requirements: [
      "Maximum capacity: 6 guests per speedboat"
    ]
  },
  {
    id: "speed-el-gouna-trip",
    category: "speedboats",
    badge: "Coastal Adventure",
    title: "Private Speedboat from Hurghada to El Gouna Lagoons (5 Hours)",
    titleDe: "Privates Schnellboot von Hurghada zu den Lagunen von El Gouna (5 Std.)",
    duration: "5 Hours",
    durationDe: "5 Stunden",
    location: "Hurghada → El Gouna",
    pricePerPerson: 310,
    currency: "€",
    unitLabel: "speedboat (up to 6 guests)",
    unitLabelDe: "Schnellboot (bis zu 6 Gäste)",
    isPrivateBoat: true,
    maxGuests: 6,
    image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Cruise north along the Red Sea coast by private speedboat to El Gouna! Stop at northern coral reefs, tour El Gouna's Venice-style lagoons, and enjoy marina time.",
    shortDescDe: "Fahren Sie mit dem privaten Schnellboot entlang der Küste nach El Gouna! Inklusive Schnorchelstopp und Lagunenfahrt.",
    fullDesc: "Take an exhilarating coastal speedboat run north from Hurghada to the glamorous resort town of El Gouna. Stop along the way to snorkel vibrant northern coral reefs, cruise through El Gouna's turquoise man-made lagoons, and step ashore at Abu Tig Marina for lunch or a stroll.",
    fullDescDe: "Genießen Sie eine Küstenfahrt mit dem privaten Schnellboot von Hurghada nach El Gouna mit Schnorchelstopps und Besuch der Abu Tig Marina.",
    highlights: [
      "Scenic high-speed coastal cruise from Hurghada to El Gouna",
      "Guided snorkeling at pristine northern Red Sea reefs",
      "Tour El Gouna's turquoise lagoons and Abu Tig Marina",
      "Private speedboat for up to 6 guests with chilled drinks"
    ],
    included: [
      "Private Speedboat & Captain (5 Hours)",
      "Snorkeling Gear & Chilled Refreshments",
      "Hurghada Hotel Pickup & Return"
    ],
    requirements: [
      "Maximum capacity: 6 guests per speedboat"
    ]
  },
  {
    id: "speed-mahmya-private",
    category: "speedboats",
    badge: "Speedboat + Beach Club",
    title: "Private Speedboat Transfer & Day at Mahmya Island (5 Hours)",
    titleDe: "Privater Schnellboot-Transfer & Tag auf Mahmya Island (5 Stunden)",
    duration: "5 Hours",
    durationDe: "5 Stunden",
    location: "Hurghada",
    pricePerPerson: 260,
    currency: "€",
    unitLabel: "speedboat (up to 6 guests)",
    unitLabelDe: "Schnellboot (bis zu 6 Gäste)",
    isPrivateBoat: true,
    maxGuests: 6,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Arrive at Mahmya Island's eco-luxury beach club by private speedboat with a dedicated coral reef snorkeling stop along Giftun National Park.",
    shortDescDe: "Erreichen Sie den exklusiven Strandclub von Mahmya Island mit dem privaten Schnellboot inklusive Korallenriff-Schnorchelstopp.",
    fullDesc: "Combine the speed and privacy of your own speedboat with the relaxed beach club atmosphere of Mahmya Island. Cruise over in 15 minutes, snorkel vibrant coral gardens along Giftun National Park, and enjoy flexible hours on Mahmya's soft white beach.",
    fullDescDe: "Verbinden Sie die Geschwindigkeit Ihres eigenen Schnellboots mit dem entspannten Strandparadies Mahmya Island.",
    highlights: [
      "Direct private speedboat ride to Mahmya Island (up to 6 guests)",
      "Private reef snorkeling stop along Giftun National Park",
      "Flexible arrival and departure schedule",
      "Chilled soft drinks, water & snorkeling equipment included"
    ],
    included: [
      "Private Speedboat & Captain (5 Hours)",
      "Snorkeling Masks, Fins & Vests",
      "Chilled Drinks & Water",
      "Hurghada Hotel Transfers"
    ],
    requirements: [
      "Maximum capacity: 6 guests per speedboat"
    ]
  },
  {
    id: "trip-orange-bay",
    category: "islands",
    badge: "Top Rated Island",
    title: "Orange Bay Island & Water Sports (Yacht Tour)",
    titleDe: "Orange Bay Insel & Wassersport (Yacht-Tagestour)",
    duration: "1 Day (7–8 Hours)",
    durationDe: "1 Tag (7–8 Stunden)",
    location: "Hurghada",
    pricePerPerson: 35,
    currency: "€",
    unitLabel: "person",
    unitLabelDe: "Person",
    image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Sail to Orange Bay Island by yacht, relax on Caribbean-style white sandy beaches, snorkel over colorful coral reefs, enjoy open buffet lunch, and ride Banana Boat & Sofa.",
    shortDescDe: "Segeln Sie mit der Yacht zur Orange Bay Insel, entspannen Sie am karibischen Sandstrand, schnorcheln Sie an Korallenriffen und genießen Sie Mittagsbuffet sowie Bananenboot.",
    fullDesc: "Sail to Orange Bay Island by boat and unwind on its Caribbean-style sandy beach and iconic overwater swings. Marvel at colorful Red Sea coral reefs during guided snorkeling stops, enjoy an open buffet lunch with soft and hot drinks onboard, and add extra thrills with Banana Boat and Sofa water activities.",
    fullDescDe: "Fahren Sie mit der Yacht zur Orange Bay Insel und genießen Sie feinen weißen Sandstrand, geführtes Schnorcheln, offenes Mittagsbuffet und Wassersport (Banana Boat & Sofa).",
    highlights: [
      "Relax on the white sandy beach and swings of Orange Bay Island",
      "2 guided snorkeling stops over vibrant Red Sea coral reefs",
      "Includes thrilling Banana Boat & Sofa water sports rides",
      "Open buffet lunch plus soft & hot drinks onboard",
      "Round-trip hotel transfers in Hurghada"
    ],
    included: [
      "Orange Bay Island Entry & Yacht Cruise",
      "Snorkeling Equipment (Mask, Snorkel, Fins, Vest)",
      "Banana Boat & Sofa Water Rides",
      "Open Buffet Lunch, Soft & Hot Drinks",
      "Hurghada Hotel Pickup & Drop-off"
    ],
    requirements: [
      "Suitable for families, couples, and solo travelers",
      "Bring swimwear, towel, and sunglasses"
    ]
  },
  {
    id: "trip-paradise-island",
    category: "islands",
    badge: "Island Escape",
    title: "Paradise Island Sea Trip",
    titleDe: "Paradise Island Seereise ab Hurghada",
    duration: "1 Day (7–8 Hours)",
    durationDe: "1 Tag (7–8 Stunden)",
    location: "Hurghada",
    pricePerPerson: 35,
    currency: "€",
    unitLabel: "person",
    unitLabelDe: "Person",
    image: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Visit Paradise Island inside Giftun Island National Park on a full-day boat trip from Hurghada with soft sandy beaches, coral reef snorkeling stops, and lunch onboard.",
    shortDescDe: "Besuchen Sie Paradise Island im Giftun-Nationalpark bei einem Tagesausflug ab Hurghada mit Sandstrand, Schnorchelstopps und Mittagessen an Bord.",
    fullDesc: "Visit Paradise Island, part of the protected Giftun Island National Park, on a full-day boat trip from Hurghada. Relax on soft white sandy beaches beside shallow turquoise lagoons, enjoy guided coral reef snorkeling stops along the route, and dine on a freshly prepared lunch onboard.",
    fullDescDe: "Genießen Sie einen unvergesslichen Tag auf Paradise Island im Giftun-Nationalpark inklusive Schnorchelausrüstung, Mittagessen an Bord und Hoteltransfer.",
    highlights: [
      "Visit Paradise Island inside Giftun Island National Park",
      "Soft sandy beaches and calm crystal-clear lagoons",
      "Guided coral reef snorkeling stops included",
      "Fresh onboard lunch and drinks during the cruise"
    ],
    included: [
      "Paradise Island Entry & Boat Cruise",
      "Snorkeling Equipment & Guide",
      "Onboard Lunch & Soft Drinks",
      "Hurghada Hotel Transfers"
    ],
    requirements: [
      "Ideal for all ages and swimming levels",
      "Bring towel, sunglasses, and swimwear"
    ]
  },
  {
    id: "trip-giftun-island",
    category: "islands",
    badge: "Classic Sea Trip",
    title: "Giftun Islands & Snorkeling Boat Tour with Lunch",
    titleDe: "Giftun Inseln & Schnorchel-Bootstour mit Mittagessen",
    duration: "7–8 Hours",
    durationDe: "7–8 Stunden",
    location: "Hurghada",
    pricePerPerson: 25,
    currency: "€",
    unitLabel: "person",
    unitLabelDe: "Person",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Enjoy a full-day snorkeling excursion on the Red Sea to the Giftun Islands with vibrant coral reef stops, open buffet lunch, and refreshing drinks.",
    shortDescDe: "Genießen Sie einen ganztägigen Schnorchelausflug zu den Giftun-Inseln mit bunten Korallenriffen, Mittagsbuffet und Getränken.",
    fullDesc: "Take advantage of the marvelous weather in Hurghada with a full-day snorkeling excursion on the crystal-clear turquoise waters of the Red Sea. Cruise to the protected Giftun Islands, stop at colorful coral reefs for guided snorkeling sessions, and enjoy an open buffet lunch with refreshing drinks served onboard.",
    fullDescDe: "Entdecken Sie die Unterwasserwelt der Giftun-Inseln bei geführten Schnorchelstopps und einem frisch zubereiteten Mittagsbuffet an Bord.",
    highlights: [
      "7–8 hour Red Sea yacht cruise to Giftun Islands",
      "Guided snorkeling stops over vibrant coral gardens",
      "Crystal-clear turquoise waters ideal for all swimming levels",
      "Open buffet lunch and refreshing drinks included onboard"
    ],
    included: [
      "Yacht Cruise to Giftun Islands",
      "Snorkeling Gear (Mask, Snorkel, Fins, Vest)",
      "Snorkeling Guide",
      "Open Buffet Lunch & Drinks",
      "Hurghada Hotel Pickup & Drop-off"
    ],
    requirements: [
      "Suitable for all ages and swimmers",
      "Bring swimwear, towel, and reef-safe sunscreen"
    ]
  },
  {
    id: "trip-mahmya-island",
    category: "islands",
    badge: "Eco-Luxury Beach",
    title: "Mahmya Island Full-Day VIP Excursion",
    titleDe: "Mahmya Island VIP-Tagesausflug",
    duration: "1 Day (8 Hours)",
    durationDe: "1 Tag (8 Stunden)",
    location: "Hurghada",
    pricePerPerson: 75,
    currency: "€",
    unitLabel: "person",
    unitLabelDe: "Person",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Experience the pristine eco-tourism paradise of Mahmya on Giftun Island with white sands, shaded palm pergolas, gourmet island buffet lunch, and reef snorkeling.",
    shortDescDe: "Erleben Sie das Öko-Luxus-Paradies Mahmya auf der Giftun-Insel mit weißem Sandstrand, Palmenschirmen, Insel-Buffet und Riffschnorcheln.",
    fullDesc: "Sail across turquoise waters to Mahmya Island, an eco-friendly paradise on the southern shores of Giftun Island. Lounge under woven palm umbrellas on powder-soft white sand, snorkel along pristine coral gardens, and savor a gourmet buffet lunch at the island's beachfront restaurant.",
    fullDescDe: "Entspannen Sie unter Palmenschirmen am feinen Sandstrand von Mahmya Island und genießen Sie ein Gourmet-Mittagsbuffet direkt am Meer.",
    highlights: [
      "Exclusive access to Mahmya's eco-luxury sandy beach",
      "Boat snorkeling trip to nearby vibrant coral reefs",
      "Gourmet island buffet lunch with soft drinks included",
      "Round-trip air-conditioned Hurghada hotel transfers"
    ],
    included: [
      "Mahmya Island Boat Transfer & Beach Access",
      "Snorkeling Gear & Reef Boat Excursion",
      "Island Restaurant Buffet Lunch",
      "Hurghada Hotel Transfers"
    ],
    requirements: [
      "Bring swimwear, hat, and beach towel"
    ]
  },
  {
    id: "trip-intro-dive",
    category: "sea",
    badge: "Beginner Scuba",
    title: "Intro Dive (Discover Scuba Diving — No License Needed)",
    titleDe: "Intro Dive — Schnuppertauchen in Hurghada (Ohne Tauchschein)",
    duration: "1 Day (7–8 Hours)",
    durationDe: "1 Tag (7–8 Stunden)",
    location: "Hurghada",
    pricePerPerson: 45,
    currency: "€",
    unitLabel: "person",
    unitLabelDe: "Person",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Experience breathing underwater for the first time in Hurghada! Includes 2 guided introductory dives with a certified instructor, full scuba gear, buffet lunch, and drinks.",
    shortDescDe: "Atmen Sie zum ersten Mal unter Wasser in Hurghada! Inklusive 2 geführten Schnuppertauchgängen mit Tauchlehrer, kompletter Ausrüstung, Mittagsbuffet & Getränken.",
    fullDesc: "Always wanted to try scuba diving in the Red Sea? Our Intro Dive (Discover Scuba Diving) excursion in Hurghada is designed for complete beginners—no prior diving license or experience required! Enjoy a full-day yacht cruise with 2 one-on-one guided introductory dives at vibrant coral reefs, full scuba equipment, open buffet lunch, drinks, and hotel transfers.",
    fullDescDe: "Unser Intro Dive (Schnuppertauchen) in Hurghada ist perfekt für absolute Anfänger – kein Tauchschein erforderlich! Genießen Sie eine Tagestour mit 2 begleiteten Tauchgängen an bunten Korallenriffen, kompletter Tauchausrüstung, Mittagsbuffet und Hoteltransfer.",
    highlights: [
      "No diving license or prior experience required — ideal for beginners",
      "2 supervised introductory dives at colorful Hurghada coral reefs",
      "One-on-one guidance from a certified PADI scuba instructor",
      "Full scuba diving equipment, open buffet lunch & drinks onboard",
      "Round-trip air-conditioned hotel pickup & drop-off in Hurghada"
    ],
    included: [
      "Full-Day Red Sea Yacht Cruise",
      "2 Supervised Intro Dives + Safety Briefing",
      "Complete Scuba Diving Equipment",
      "Open Buffet Lunch, Water, Soft & Hot Drinks",
      "Hurghada Hotel Transfers"
    ],
    requirements: [
      "Minimum age: 10 years old",
      "Medically fit for introductory scuba diving"
    ]
  },
  {
    id: "trip-dolphin-house",
    category: "sea",
    badge: "Wildlife Encounter",
    title: "Dolphin House Snorkeling & Sea Cruise",
    titleDe: "Dolphin House Schnorchel- & Seereise",
    duration: "7 Hours",
    durationDe: "7 Stunden",
    location: "Hurghada",
    pricePerPerson: 30,
    currency: "€",
    unitLabel: "person",
    unitLabelDe: "Person",
    image: "https://images.unsplash.com/photo-1570481662006-a3a1374699e8?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Cruise to Sha'ab El Erg (Dolphin House) to see wild dolphins in their natural Red Sea habitat with guided coral reef snorkeling, lunch, and water sports.",
    shortDescDe: "Fahren Sie zum Dolphin House (Sha'ab El Erg), um wilde Delfine in ihrer natürlichen Umgebung zu sehen – inklusive Schnorcheln und Mittagessen.",
    fullDesc: "Spend 7 unforgettable hours on the Red Sea on our Dolphin House excursion in Hurghada. Cruise to the famous horseshoe-shaped reef where wild dolphins gather in their natural habitat, giving you a rare opportunity to swim and snorkel respectfully near dolphins alongside pristine coral reef stops, lunch, and drinks.",
    fullDescDe: "Verbringen Sie 7 unvergessliche Stunden auf dem Roten Meer beim Dolphin House Ausflug ab Hurghada inklusive Schnorchelausrüstung, Mittagessen und Getränken.",
    highlights: [
      "Cruise to Dolphin House reef in Hurghada (7 Hours)",
      "Opportunity to observe and snorkel near wild dolphins in nature",
      "Multiple guided coral reef snorkeling sessions",
      "Freshly prepared onboard lunch and drinks included"
    ],
    included: [
      "7-Hour Dolphin House Yacht Excursion",
      "Mask, Snorkel, Fins & Life Jacket",
      "Experienced Marine Guide",
      "Onboard Lunch & Drinks",
      "Hurghada Hotel Pickup & Drop-off"
    ],
    requirements: [
      "Respectful wildlife viewing guidelines apply",
      "Suitable for swimmers of all levels"
    ]
  },
  {
    id: "trip-semi-submarine",
    category: "sea",
    badge: "Family Favorite",
    title: "Royal Seascope Semi-Submarine Cruise",
    titleDe: "Royal Seascope Halb-U-Boot-Fahrt",
    duration: "2 Hours",
    durationDe: "2 Stunden",
    location: "Hurghada",
    pricePerPerson: 25,
    currency: "€",
    unitLabel: "person",
    unitLabelDe: "Person",
    image: "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Discover colorful Red Sea coral reefs and exotic fish without getting wet from an air-conditioned panoramic underwater observation deck, plus a short snorkeling stop.",
    shortDescDe: "Entdecken Sie Korallenriffe und bunte Fische trocken durch große Panoramafenster 3 Meter unter Wasser, inklusive kurzem Schnorchelstopp.",
    fullDesc: "Perfect for families with young children and non-swimmers, the Royal Seascope Semi-Submarine takes you 3 meters below the Red Sea surface inside a spacious, air-conditioned panoramic viewing hull. Admire vibrant coral gardens and marine life up close, followed by a 30-minute surface snorkeling stop.",
    fullDescDe: "Ideal für Familien mit Kindern und Nichtschwimmer: Bewundern Sie die Korallenriffe im klimatisierten Unterwasser-Panoramadeck.",
    highlights: [
      "Panoramic underwater windows 3 meters below the Red Sea surface",
      "Air-conditioned observation lounge ideal for kids and non-swimmers",
      "Optional 30-minute guided snorkeling stop included",
      "Welcome drink and Hurghada hotel transfers"
    ],
    included: [
      "2-Hour Semi-Submarine Reef Cruise",
      "Welcome Drink Onboard",
      "Snorkeling Gear for Optional Swim Stop",
      "Hurghada Hotel Pickup & Return"
    ],
    requirements: [
      "All ages welcome"
    ]
  },
  {
    id: "trip-quad-safari",
    category: "safari",
    badge: "Desert Thrill",
    title: "Hurghada Desert Quad Bike, Camel Ride & Bedouin Dinner",
    titleDe: "Hurghada Wüstensafari: Quad-Tour, Kamelreiten & Beduinen-Dinner",
    duration: "5 Hours (Afternoon)",
    durationDe: "5 Stunden (Nachmittag)",
    location: "Hurghada Desert",
    pricePerPerson: 25,
    currency: "€",
    unitLabel: "person",
    unitLabelDe: "Person",
    image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Race across golden Red Sea desert dunes on a Quad Bike, visit an authentic Bedouin village, enjoy a sunset camel ride, BBQ dinner, and oriental evening show.",
    shortDescDe: "Fahren Sie mit dem Quad durch die Wüste von Hurghada, besuchen Sie ein Beduinendorf, reiten Sie auf einem Kamel bei Sonnenuntergang und genießen Sie BBQ-Dinner & Show.",
    fullDesc: "Head into the dramatic mountains of the Eastern Desert just outside Hurghada. Ride your own ATV Quad Bike across desert trails to a traditional Bedouin camp, experience a peaceful sunset camel ride, learn about Bedouin traditions, and enjoy an open-air BBQ dinner with live Tanoura and oriental entertainment.",
    fullDescDe: "Erleben Sie eine aufregende Nachmittags-Quad-Safari in die Wüste von Hurghada inklusive Kamelreiten, Beduinentee, Grillbuffet und Abendshow.",
    highlights: [
      "Exciting ATV Quad Bike desert ride through Red Sea mountain valleys",
      "Visit a traditional Bedouin village with herbal tea hospitality",
      "Sunset camel ride across the golden sands",
      "Freshly grilled Bedouin BBQ dinner & oriental folklore show"
    ],
    included: [
      "Quad Bike Ride & Safety Briefing",
      "4x4 Jeep Desert Transfer",
      "Camel Ride & Bedouin Tea",
      "BBQ Dinner & Evening Show",
      "Hurghada Hotel Transfers"
    ],
    requirements: [
      "Wear comfortable closed shoes, sunglasses, and scarf"
    ]
  },
  {
    id: "trip-super-safari",
    category: "safari",
    badge: "All-in-One Adventure",
    title: "Super Safari: Jeep 4x4, Quad Bike, Spider Buggy & Stargazing",
    titleDe: "Super Safari: 4x4 Jeep, Quad Bike, Spider Buggy & Sternenbeobachtung",
    duration: "7 Hours",
    durationDe: "7 Stunden",
    location: "Hurghada Desert",
    pricePerPerson: 35,
    currency: "€",
    unitLabel: "person",
    unitLabelDe: "Person",
    image: "https://images.unsplash.com/photo-1547234935-80c7145ec969?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "The ultimate desert combo: 4x4 Land Cruiser safari, Quad Bike ride, Spider Buggy drive, camel ride, Bedouin village visit, BBQ dinner, and telescope stargazing.",
    shortDescDe: "Das ultimative Wüstenabenteuer: 4x4 Jeep-Safari, Quad-Fahrt, Spider-Buggy, Kamelreiten, Beduinendorf, BBQ-Buffet und Sternenbeobachtung durch das Teleskop.",
    fullDesc: "Combine every desert thrill into one action-packed afternoon from Hurghada. Travel deep into the desert by 4x4 Jeep, drive both an ATV Quad Bike and a Spider Dune Buggy, ride a camel at sunset, feast on a Bedouin BBQ dinner, and gaze at planets and stars through a professional desert telescope.",
    fullDescDe: "Kombinieren Sie 4x4 Jeep, Quad Bike, Spider Buggy, Kamelreiten, Abendessen und Teleskop-Sternenbeobachtung in einer Tour.",
    highlights: [
      "4x4 Jeep safari + Quad Bike + Spider Dune Buggy driving",
      "Sunset camel ride and authentic Bedouin village tour",
      "Open buffet BBQ dinner with soft drinks and show",
      "Nighttime desert stargazing session with astronomy guide"
    ],
    included: [
      "4x4 Jeep Transfers, Quad Bike & Spider Buggy",
      "Camel Ride & Bedouin Village Visit",
      "BBQ Buffet Dinner & Soft Drinks",
      "Telescope Stargazing & Hotel Transfers"
    ],
    requirements: [
      "Minimum driving age for Quad/Buggy: 16 years old"
    ]
  },
  {
    id: "trip-luxor-day",
    category: "safari",
    badge: "Ancient Wonders",
    title: "Luxor Full-Day Tour from Hurghada (Valley of the Kings & Karnak)",
    titleDe: "Luxor Tagestour ab Hurghada (Tal der Könige & Karnak-Tempel)",
    duration: "Full Day (14–16 Hours)",
    durationDe: "Ganztägig (14–16 Stunden)",
    location: "Hurghada → Luxor",
    pricePerPerson: 75,
    currency: "€",
    unitLabel: "person",
    unitLabelDe: "Person",
    image: "https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=1200&q=80",
    shortDesc: "Journey from Hurghada to ancient Thebes with an Egyptologist guide to explore Karnak Temple, Valley of the Kings, Hatshepsut Temple, Colossi of Memnon, and lunch.",
    shortDescDe: "Reisen Sie ab Hurghada mit einem deutsch-/englischsprachigen Ägyptologen nach Luxor: Karnak-Tempel, Tal der Könige, Hatschepsut-Tempel, Memnonkolosse & Mittagessen.",
    fullDesc: "Step back 3,500 years into ancient Egyptian history on a guided day trip from Hurghada to Luxor. Accompanied by a licensed Egyptologist guide, explore the colossal columns of Karnak Temple, enter royal tombs in the Valley of the Kings, admire the terraced Temple of Queen Hatshepsut, and enjoy lunch beside the Nile.",
    fullDescDe: "Entdecken Sie 3.500 Jahre altägyptische Geschichte auf einem geführten Tagesausflug ab Hurghada nach Luxor inklusive Eintrittskarten und Mittagessen am Nil.",
    highlights: [
      "Guided tour of Karnak Temple Complex & Colossi of Memnon",
      "Explore royal tombs inside the famous Valley of the Kings",
      "Visit the breathtaking Temple of Queen Hatshepsut",
      "Licensed Egyptologist guide & Nile-side restaurant lunch included"
    ],
    included: [
      "Air-Conditioned Coach/Van Transfers from Hurghada",
      "Professional Egyptologist Tour Guide",
      "Entrance Tickets to Mentioned Sites",
      "Lunch at a Local Restaurant in Luxor"
    ],
    requirements: [
      "Bring passport/ID, comfortable walking shoes, hat, and water"
    ]
  }
];
