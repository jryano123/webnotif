// export let selectedCategory: 'Daytour' | 'Overnight' | 'CUS' | 'All' = $state('All');

export type Payment = {
 id: string;
 amount: number;
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
  amount: 100,
  status: "pending",
  email: "luffy@example.com",
  date: new Date(),
  municipality: "Balanga City",
  details: "",
 },
 {
  id: "2b",
  amount: 125,
  status: "success",
  email: "danfeng@gmail.com",
  date: new Date(),
  municipality: "Limay",
  details: "",
 },
 {
  id: "3c",
  amount: 200,
  status: "failed",
  email: "roronoazoro@gmail.com",
  date: new Date(),
  municipality: "Orani",
  details: "",
 },
 {
  id: "4d",
  amount: 300,
  status: "pending",
  email: "fierajsdf@gmail.com",
  date: new Date(),
  municipality: "Hermosa",
  details: "",
 },
];

export function getPayments(): Payment[] {
  return data;
}