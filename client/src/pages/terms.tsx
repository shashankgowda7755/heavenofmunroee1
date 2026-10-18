import LegalLayout, { LEGAL_CONTACT } from "@/components/LegalLayout";

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service">
      <p>
        By using this website or sending a booking enquiry you agree to these terms. Please also
        read our <a href="/privacy">Privacy Policy</a>.
      </p>

      <h2>Bookings</h2>
      <ul>
        <li>The booking form sends us an enquiry. It is not a confirmed booking until we confirm availability and price with you.</li>
        <li>Prices shown on this site are indicative and may change with season, group size and availability. The final price is confirmed to you before you pay.</li>
        <li>You must be 18 or older to make a booking.</li>
        <li>Online payment is not yet available. Payment details will be shared with you when it is.</li>
      </ul>

      <h2 id="cancellation-and-refunds">Cancellation and refunds</h2>
      <p>
        Cancellation and refund terms are confirmed with you in writing before payment.
      </p>

      <h2>Guest conduct and safety</h2>
      <ul>
        <li>Follow the instructions of our boat and kayak guides and wear the safety equipment provided.</li>
        <li>Activities depend on weather and water conditions. We may change or reschedule an activity for safety.</li>
        <li>Guests are responsible for their belongings and for damage they cause to the property.</li>
      </ul>

      <h2>Content on this site</h2>
      <p>
        Text and images on this site belong to Heaven of Munroe or their respective owners. Please do
        not copy them without permission.
      </p>

      <h2>Liability</h2>
      <p>
        We take reasonable care to provide safe and accurate services. To the extent permitted by
        law, we are not liable for losses outside our reasonable control, such as severe weather or
        events beyond our control.
      </p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of India. Courts at Kollam, Kerala have jurisdiction.</p>

      <h2>Contact</h2>
      <p>
        Email: <a href={`mailto:${LEGAL_CONTACT.email}`}>{LEGAL_CONTACT.email}</a><br />
        Phone / WhatsApp: <a href={LEGAL_CONTACT.phoneHref}>{LEGAL_CONTACT.phone}</a>
      </p>
    </LegalLayout>
  );
}
