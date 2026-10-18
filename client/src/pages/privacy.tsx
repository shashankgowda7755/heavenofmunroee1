import LegalLayout, { LEGAL_CONTACT } from "@/components/LegalLayout";

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy">
      <p>
        Heaven of Munroe ("we", "us") runs this website and the homestay, kayaking and boating
        experiences at Munroe Island, Kerala. This notice explains what personal data we collect
        through the booking form, why, and your rights under the Digital Personal Data Protection
        Act, 2023 (India).
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>Full name, phone number and email address</li>
        <li>Number of guests, preferred package, dates and time slot</li>
        <li>Any special requests or notes you choose to write</li>
      </ul>

      <h2>Why we collect it</h2>
      <p>
        Only to respond to your enquiry and to handle your booking: contacting you, confirming
        availability and price, and arranging your stay or activity. We do not use your details for
        marketing unless you separately ask us to.
      </p>

      <h2>Who it is shared with</h2>
      <p>
        Your enquiry is shared only with the property team that fulfils your booking. It is stored
        with our hosting, database and email service providers, who process it on our behalf to run
        this site. We do not sell your data.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep enquiry and booking details only as long as needed to handle your booking and for
        any legal or accounting record we are required to keep, then delete them.
      </p>

      <h2>Children</h2>
      <p>
        Bookings must be made by a person aged 18 or older. If you are booking for a group that
        includes minors, you give the details as their parent or guardian.
      </p>

      <h2>Your rights</h2>
      <p>
        You can ask to access, correct or erase your personal data, withdraw your consent, or raise
        a grievance, by contacting us below. We will respond within a reasonable time. If you are
        not satisfied, you may complain to the Data Protection Board of India.
      </p>

      <h2>Grievance Officer</h2>
      <p>
        Grievance Officer, Heaven of Munroe<br />
        Email: <a href={`mailto:${LEGAL_CONTACT.email}`}>{LEGAL_CONTACT.email}</a><br />
        Phone / WhatsApp: <a href={LEGAL_CONTACT.phoneHref}>{LEGAL_CONTACT.phone}</a><br />
        {LEGAL_CONTACT.address}
      </p>

      <h2>Changes</h2>
      <p>We will post any change to this notice on this page with a new date.</p>
    </LegalLayout>
  );
}
