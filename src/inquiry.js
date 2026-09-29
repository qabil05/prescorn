import { studio } from './data.js';
export async function submitInquiry(payload) {
  if (!studio.inquiryEndpoint) throw new Error('Online requests are not available yet. Your request has not been sent. Please save your details and try again later.');
  const response = await fetch(studio.inquiryEndpoint, {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),signal:AbortSignal.timeout(15000)});
  if (!response.ok) throw new Error('We could not send your request. Please try again in a moment.');
  const result = await response.json();
  if (result.success !== true) throw new Error('Delivery could not be confirmed. Please try again.');
  return result;
}
