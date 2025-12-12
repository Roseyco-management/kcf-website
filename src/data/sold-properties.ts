export interface SoldProperty {
  address: string;
  image: string;
  neighborhoodSlug: string; // Links to /neighborhoods/[slug]
  soldDate?: string; // Optional: "December 2024"
  daysOnMarket?: number; // Optional: 12
}

export const soldProperties: SoldProperty[] = [
  {
    address: "19625 E 18th St Ter",
    image: "/houses-sold/19625 E 18th St Ter.jpeg",
    neighborhoodSlug: "independence",
  },
  {
    address: "3005 Elmira Ct",
    image: "/houses-sold/3005 Elmira Ct.jpeg",
    neighborhoodSlug: "overland-park",
  },
  {
    address: "401 S Silver Top Ln",
    image: "/houses-sold/401 S Silver Top Ln.jpeg",
    neighborhoodSlug: "lees-summit",
  },
  {
    address: "509 Brooklyn Ave",
    image: "/houses-sold/509 Brooklyn Ave.jpeg",
    neighborhoodSlug: "brookside",
  },
  {
    address: "5619 Crysler Ave",
    image: "/houses-sold/5619 Crysler ave.jpeg",
    neighborhoodSlug: "independence",
  },
  {
    address: "6500 N Jarboe St",
    image: "/houses-sold/6500 N Jarboe St.jpeg",
    neighborhoodSlug: "liberty",
  },
  {
    address: "610 SW Cross Creek",
    image: "/houses-sold/610 SW Cross Creek.jpeg",
    neighborhoodSlug: "lees-summit",
  },
];
