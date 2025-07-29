type Payment = {
 id: string;
 amount: number;
 status: "pending" | "processing" | "success" | "failed";
 email: string;
 date: Date;
};
 
export const data: Payment[] = [
 {
  id: "728ed52f",
  amount: 100,
  status: "pending",
  email: "luffy@example.com",
  date: new Date(),
 },
 {
  id: "489e1d42",
  amount: 125,
  status: "success",
  email: "danfeng@gmail.com",
  date: new Date(),
 },
 {
  id: "489e1d42",
  amount: 200,
  status: "failed",
  email: "roronoazoro@gmail.com",
  date: new Date(),
 },
 {
  id: "j92ejd",
  amount: 300,
  status: "pending",
  email: "fierajsdf@gmail.com",
  date: new Date(),
 },
];

export function getPayments(): Payment[] {
  return data;
}