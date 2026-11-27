// Page content for the VFIVE Pearl landing page, taken from the approved design.
export const CONTACT = {
  phone: "+91 9072 666 000",
  phoneHref: "tel:+919072666000",
  whatsappHref: "https://wa.me/919072666000",
  email: "sales@vfivehomes.com",
  enquiryEmail: "rahilramesh830@gmail.com",
};

export const NAV_LINKS = [
  { label: "About", dropdown: true },
  { label: "Services", dropdown: true },
  { label: "Projects", dropdown: true },
  { label: "Blog" },
  { label: "Careers" },
  { label: "Contact" },
];

export const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "why-kumarapuram", label: "Why Kumarapuram" },
  { id: "why-vfive-pearl", label: "Why VFIVE Pearl" },
  { id: "amenities", label: "Amenities" },
  { id: "specification", label: "Specification" },
  { id: "floor-plans", label: "Floor Plans" },
  { id: "location-map", label: "Location Map" },
  { id: "project-progress", label: "Project Progress" },
  { id: "how-to-buy", label: "How to Buy" },
  { id: "faqs", label: "FAQs" },
] as const;

export const STATS = [
  { key: "status", label: "Project Status", value: "Ready to Occupy" },
  { key: "location", label: "Location", value: "Kumarapuram, Trivandrum" },
  { key: "units", label: "Total No. of Units", value: "40" },
  { key: "floors", label: "Total No. of Floors", value: "G+7" },
  { key: "area", label: "SQ FT Area", value: "715 – 1662 SQ. FT" },
] as const;

export const LOCATION_CARDS = [
  {
    key: "hospital",
    title: "Hospitals Within Minutes",
    body: "Kumarapuram has one of the densest hospital clusters in Kerala. Government Medical College is about 1 km from VFIVE Pearl. SAT Hospital, Regional Cancer Centre (RCC) and Sree Chitra Tirunal Institute stand on the same campus. Cosmopolitan Hospital, SUT Hospital Pattom and KIMSHEALTH Anayara are within a short drive.",
  },
  {
    key: "school",
    title: "Schools and Colleges Nearby",
    body: "Families in Kumarapuram have good schools and colleges close to home. Govt. HSS Kumarapuram and Marian Villa Convent are in Kumarapuram itself. St. Mary's Higher Secondary School and Kendriya Vidyalaya are in nearby Pattom. Medical College and several professional colleges are minutes away.",
  },
  {
    key: "airport",
    title: "Airport, Rail and City Connectivity",
    body: "Trivandrum International Airport is about 15 minutes from the project by road. Thiruvananthapuram Central station is a similar drive. The NH 66 bypass at Chakkai links Kumarapuram to Technopark and Kazhakkoottam. This location suits NRIs who travel home often.",
  },
  {
    key: "shopping",
    title: "Shopping and Daily Needs",
    body: "Mall of Travancore and Lulu Mall Thiruvananthapuram are a short drive from Kumarapuram. Supermarkets, banks, ATMs, restaurants and places of worship are close by. Daily needs never mean a long trip.",
  },
] as const;

export const REASONS = [
  {
    title: "Ready to Occupy, No Waiting",
    body: "VFIVE Pearl is complete and ready for handover. You walk through the actual apartment before you sign. There is no rent paid while you wait, and no risk of delayed possession.",
  },
  {
    title: "Branded Specifications You Can Inspect",
    body: "Every key fitting at the project uses a named brand. Sanitary fittings come from GROHE, Jaquar, Varmora and Cera. Lifts come from KONE, OTIS or Johnson, with an automatic rescue device. Locks come from Dorset, Yale or Godrej, and wiring from Finolex, RR or Havells.",
  },
  {
    title: "Modern Living in a Secure Community",
    body: "VFIVE Pearl is a secure residential community of just 40 homes. Access control, CCTV and 24x7 guards protect every floor. Residents share a swimming pool, health club, yoga hall and landscaped spaces.",
  },
  {
    title: "Easy Buying for NRIs",
    body: "VFIVE Pearl suits NRIs from Kumarapuram and nearby areas who want a home base in Trivandrum. NRIs can complete the purchase through a power of attorney holder in Kerala. The VFive Homes team shares video walkthroughs and handles paperwork on your behalf. A finished apartment also starts earning rent from the first month.",
  },
];

export const AMENITIES = [
  "CCTV",
  "WiFi Enabled Lobby",
  "Indoor Games",
  "24x7 Security",
  "Dedicated Waste Bins",
  "Health Club",
  "Driver's Room with Toilet",
  "Smart Digital Door Lock",
  "Rain Water Harvesting",
  "Yoga Hall",
  "Meeting Hall",
  "Children's Play Area",
  "AV Room",
  "Swimming Pool",
  "Generator Backup",
  "Dual Elevator System",
  "Video Door Phone",
  "Reticulation Gas System",
];

export const SPECIFICATIONS = [
  {
    title: "Structure",
    body: "RCC foundation complying with seismic zone 3. RCC frame structure with brick or concrete block partitions. Concrete and steel grades as per the structural consultant's advice.",
  },
  {
    title: "Sanitary & Plumbing",
    body: "Wall-hung EWCs and counter washbasins from GROHE, Jaquar, Varmora or Cera, with concealed cisterns. Single lever concealed diverters, hot water provision for overhead showers and a health faucet in each bathroom.",
  },
  {
    title: "Flooring",
    body: "80 x 80 cm vitrified tiles in the foyer, living and dining areas, and 60 x 60 cm vitrified tiles in bedrooms and kitchen. Designer ceramic tiles in toilets up to ceiling height and 16 mm granite kitchen counters.",
  },
  {
    title: "Doors & Windows",
    body: "Seasoned teak wood main door with polyurethane finish. Branded flush internal doors with teak veneer. Aluminium or UPVC sliding windows with insect screen. Locks from Dorset, Yale or Godrej.",
  },
  {
    title: "Electrical",
    body: "Concealed copper wiring from Finolex, RR or Havells with Legrand, Crabtree or Havells switches. Generator backup of 1000 W for 2 BHK and 1500 W for 3 BHK apartments.",
  },
  {
    title: "Ceiling Treatment",
    body: "Premium emulsion paint over cement based putty for internal walls and ceilings. Weather shield exterior paint from Asian, Berger or Jotun.",
  },
  {
    title: "Elevators",
    body: "High-speed lifts from KONE, OTIS or Johnson with automatic doors and an automatic rescue device.",
  },
  {
    title: "Air Conditioning",
    body: "Provision for split ACs in all bedrooms and the living or dining room.",
  },
  {
    title: "Home Automation",
    body: "Access control, motion sensors in common areas, gas leak detectors, emergency panic alarm and visitor tracking.",
  },
  {
    title: "Landscaping",
    body: "Water bodies with hard and soft landscaping as per the landscape consultant's design.",
  },
];

export const LANDMARKS = [
  { name: "Government Medical College", distance: "about 1 km" },
  { name: "SAT Hospital, RCC, Sree Chitra Institute", distance: "about 1 km" },
  { name: "Govt. HSS Kumarapuram", distance: "in Kumarapuram" },
  { name: "St. Mary's HSS, Pattom", distance: "short drive" },
  { name: "Trivandrum International Airport", distance: "about 15 min" },
  { name: "Thiruvananthapuram Central station", distance: "about 15 min" },
];

export const STEPS = [
  {
    title: "Book a Site Visit",
    body: "Book a site visit by phone, WhatsApp or the enquiry form. Our team shows you the finished apartments, amenities and the Kumarapuram neighbourhood. NRIs can ask for a live video walkthrough instead.",
  },
  {
    title: "Choose Your Unit",
    body: "Choose a 2 or 3 BHK unit by size, floor and facing. The VFive Homes team shares the price sheet and payment schedule for your chosen unit. Every unit area follows the K-RERA registered plan.",
  },
  {
    title: "Arrange Your Home Loan",
    body: "Home loans for the project are available from leading banks. Our team shares the approved documents your bank needs. NRI buyers get guidance on NRI home loans and power of attorney.",
  },
  {
    title: "Register and Move In",
    body: "Sign the sale agreement and register the property at the sub-registrar office. Because the building is finished, you receive your keys soon after registration. Your new home in Kumarapuram is ready for your family.",
  },
];

export const TESTIMONIALS = [
  { quote: "[Resident quote about location, quality or handover]", name: "[Name]", role: "[3 BHK owner, VFIVE Pearl]" },
  { quote: "[NRI buyer quote about buying remotely]", name: "[Name]", role: "[NRI owner, VFIVE Pearl]" },
  { quote: "[Family quote about schools or hospitals nearby]", name: "[Name]", role: "[Resident since year]" },
];

export const FAQS = [
  {
    title: "Is VFIVE Pearl ready to move in?",
    body: "VFIVE Pearl is a ready to occupy project in Kumarapuram, Trivandrum. You can inspect the finished apartment before buying. Keys are handed over soon after registration.",
  },
  {
    title: "What unit options are available at VFIVE Pearl, Kumarapuram?",
    body: "VFIVE Pearl offers 2 BHK and 3 BHK flats, with unit sizes ranging from 715 to 1662 sq ft. The project has 40 units across G+7 floors. Floor plans for each layout are shown on this page.",
  },
  {
    title: "What is the starting price of flats at VFIVE Pearl?",
    body: "Pricing for flats at VFIVE Pearl is available on request. The final price depends on the unit size, floor and facing. Book a site visit or call our team for the current price sheet.",
  },
  {
    title: "Is VFIVE Pearl RERA registered?",
    body: "VFIVE Pearl is registered with the Kerala Real Estate Regulatory Authority under K-RERA/PRJ/072/2020. The building permit number is E10/BA/41989/18. Buyers can verify both numbers on the K-RERA website.",
  },
  {
    title: "How far is VFIVE Pearl from Medical College and the airport?",
    body: "VFIVE Pearl is about 1 km from Government Medical College, Thiruvananthapuram. Trivandrum International Airport and the central station are each about 15 minutes away. KIMSHEALTH and SUT Hospital are also a short drive.",
  },
  {
    title: "Which schools and colleges are near Kumarapuram?",
    body: "Govt. HSS Kumarapuram and Marian Villa Convent are in Kumarapuram itself. St. Mary's Higher Secondary School and Kendriya Vidyalaya are in nearby Pattom. Many families choose flats in Kumarapuram for these short school runs.",
  },
  {
    title: "Can NRIs buy a flat at VFIVE Pearl?",
    body: "NRIs can buy an apartment at VFIVE Pearl and complete the process through a power of attorney holder in Kerala. VFive Homes provides video walkthroughs and document support. NRI home loans are available from leading Indian banks.",
  },
  {
    title: "Which banks offer home loans for VFIVE Pearl?",
    body: "Home loans for VFIVE Pearl are available from leading banks. VFive Homes shares the approved project documents your bank requires. [Add the names of approved banks here.]",
  },
  {
    title: "Is Kumarapuram a good place to live in Trivandrum?",
    body: "Kumarapuram is a calm residential area in central Trivandrum with excellent hospitals, schools and colleges. Medical College, the airport and major malls are all within a short drive. These reasons keep demand for property in Kumarapuram steady.",
  },
  {
    title: "How much power backup does each apartment get?",
    body: "Each apartment has generator backup of 1000 watts for 2 BHK units and 1500 watts for 3 BHK units. All common areas, lifts and pumps also have full backup.",
  },
];
