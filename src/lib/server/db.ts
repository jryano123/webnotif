// export let selectedCategory: 'Daytour' | 'Overnight' | 'CUS' | 'All' = $state('All');

export type Payment = {
 id: string;
 status: "pending" | "processing" | "success" | "failed";
 email: string;
 date: Date;
 details: string;
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
 },
 {
  id: "2b",
  status: "success",
  email: "danfeng@gmail.com",
  date: new Date(),
  municipality: "Limay",
  details: "PowerPlant",
 },
 {
  id: "3c",
  status: "success",
  email: "roronoazoro@gmail.com",
  date: new Date(),
  municipality: "Orani",
  details: "Las Casas",
 },
 {
  id: "4d",
  status: "pending",
  email: "fierajsdf@gmail.com",
  date: new Date(),
  municipality: "Pilar",
  details: "Mt.Samat Cross",
 },
];

export function getPayments(): Payment[] {
  return data;
}