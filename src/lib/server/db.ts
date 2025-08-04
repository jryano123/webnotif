// export let selectedCategory: 'Daytour' | 'Overnight' | 'CUS' | 'All' = $state('All');

export type Payment = {
 id: string;
 status: "pending" | "processing" | "success" | "failed";
 email: string;
 date: Date;
 details: string;
 category: string;
 municipality:  "Abucay"
    | "Bagac"
    | "Balanga City"
    | "Dinalupihan"
    | "Hermosa"
    | "Limay"
    | "Mariveles"
    | "Morong"
    | "Orani"
    | "Orion"
    | "Pilar"
    | "Samal";
};
 
export const data: Payment[] = [
 {
  id: "1a",
  status: "pending",
  email: "luffy@example.com",
  date: new Date(),
  municipality: "Balanga City",
  details: "CrownRoyale",
  category:"CUS",
 },
 {
  id: "2b",
  status: "success",
  email: "Danfeng@gmail.com",
  date: new Date(),
  municipality: "Morong",
  details: "PowerPlant",
  category:"Daytour",
 },
 {
  id: "3c",
  status: "success",
  email: "roronoazoro@gmail.com",
  date: new Date(),
  municipality: "Bagac",
  details: "Las Casas",
  category:"Overnight",
 },
 {
  id: "4d",
  status: "pending",
  email: "saber@gmail.com",
  date: new Date(),
  municipality: "Pilar",
  details: "Mt.Samat Cross",
  category:"Daytour",
 },
 {
  id: "5e",
  status: "success",
  email: "Himeko@gmail.com",
  date: new Date(),
  municipality: "Mariveles",
  details: "Five Fingers Cove",
  category: "Daytour",
},
{
  id: "6f",
  status: "failed",
  email: "Robin@gmail.com",
  date: new Date(),
  municipality: "Morong",
  details: "Bataan Nuclear Power Plant",
  category: "CUS",
},
{
  id: "7g",
  status: "success",
  email: "Archeron@gmail.com",
  date: new Date(),
  municipality: "Bagac",
  details: "Playa La Caleta",
  category: "Overnight",
},
{
  id: "8h",
  status: "success",
  email: "march7th@gmail.com",
  date: new Date(),
  municipality: "Dinalupihan",
  details: "Lake Ganda",
  category: "Daytour",
},
{
  id: "9i",
  status: "pending",
  email: "Blade@gmail.com",
  date: new Date(),
  municipality: "Hermosa",
  details: "Kalikid Lake View Deck",
  category: "CUS",
},
{
  id: "10j",
  status: "success",
  email: "archer@gmail.com",
  date: new Date(),
  municipality: "Abucay",
  details: "Tortugas Mangrove Park",
  category: "Overnight",
},
{
  id: "9i",
  status: "pending",
  email: "luocha@gmail.com",
  date: new Date(),
  municipality: "Hermosa",
  details: "Kalikid Lake View Deck",
  category: "CUS",
}
];

export function getPayments(): Payment[] {
  return data;
}