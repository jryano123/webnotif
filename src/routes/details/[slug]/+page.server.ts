// src/routes/details/[slug]/+page.server.ts
import type { PageServerLoad } from './$types';
import { getPayments } from '$lib/server/db'; // Assuming db.ts is in this path

export const load: PageServerLoad = ({ params }) => {
  // 1. Access the dynamic part of the URL (the 'slug').
  const detailsSlug = params.slug;

  // 2. Manipulate the data: find the specific payment that matches the slug.
  const allPayments = getPayments();
  const foundPayment = allPayments.find(
    (payment) => payment.details === detailsSlug
  );

  // You can perform more manipulation here if needed.
  // For example, fetching more data, or formatting existing data.

  // 3. Return the found data to the +page.svelte component.
  if (foundPayment) {
    return {
      payment: foundPayment,
    };
  }

  // Handle the case where no payment is found (e.g., return a 404 error).
  return {
    status: 404,
    error: new Error(`Details not found for: ${detailsSlug}`),
  };
};