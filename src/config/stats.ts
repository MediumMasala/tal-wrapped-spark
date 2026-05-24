export const wrappedConfig = {
  companyName: "Snabbit",
  year: 2025,
  ctaUrl: "https://tal.af/boss",
  stats: {
    hires: 47,
    customers: "12,400",
    biggestMonth: "October",
    biggestMonthValue: "3,200 orders",
    growth: "240%",
    newTeammates: 18,
  },
  firecracker: {
    bigNumber: "1,200,000",
    label: "Monthly active users.",
    comparisonState: "Karnataka",
    comparisonCity: "Mysuru",
    comparisonPopulation: "990,000",
    kicker: "Bigger than Mysuru.",
    kickerSub: "And honestly, getting close to Mangalore.",
  },
  topCompanies: [
    { name: "Zomato", tagline: "Order in, anywhere", logo: "/logos/zomato.svg" },
    { name: "Swiggy", tagline: "Faster than your boss replies", logo: "/logos/swiggy.svg" },
    { name: "Razorpay", tagline: "Money moves", logo: "/logos/razorpay.svg" },
    { name: "Cred", tagline: "Pay credit cards, look cool", logo: "/logos/cred.svg" },
    { name: "Zerodha", tagline: "Where the money grows up", logo: "/logos/zerodha.svg" },
  ],
};

export type WrappedConfig = typeof wrappedConfig;