import { getPayments } from '$lib/server/db';

export async function load() {
 // logic to fetch payments data here
 const payments = await getPayments();
 return {
  payments,
 };
}
