interface NewsletterWelcomeEmailProps {
  userEmail?: string;
  email?: string;
  unsubscribeLink?: string;
}

export const NewsletterWelcomeEmail = ({
  userEmail,
  email,
  unsubscribeLink,
}: NewsletterWelcomeEmailProps) => {
  const emailAddress = email || userEmail;
  return `
    <html>
      <head>
        <title>Welcome to our newsletter!</title>
      </head>
      <body style="${Object.entries(main).map(([k, v]) => `${k}: ${v}`).join('; ')}">
        <div style="${Object.entries(container).map(([k, v]) => `${k}: ${v}`).join('; ')}">
          <h1 style="${Object.entries(h1).map(([k, v]) => `${k}: ${v}`).join('; ')}">Welcome to our newsletter!</h1>
          <p style="${Object.entries(text).map(([k, v]) => `${k}: ${v}`).join('; ')}">
            Hi there,
          </p>
          <p style="${Object.entries(text).map(([k, v]) => `${k}: ${v}`).join('; ')}">
            Thank you for subscribing to our newsletter with ${emailAddress}.
            You'll now receive the latest updates and insights directly in your inbox.
          </p>
          <p style="${Object.entries(text).map(([k, v]) => `${k}: ${v}`).join('; ')}">
            Stay tuned for exciting content coming your way!
          </p>
          <p style="${Object.entries(text).map(([k, v]) => `${k}: ${v}`).join('; ')}">
            Best regards,<br />
            The Team
          </p>
        </div>
      </body>
    </html>
  `;
};

export default NewsletterWelcomeEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily: "sans-serif",
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "560px",
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "600",
  lineHeight: "1.25",
  margin: "16px 0",
};

const text = {
  color: "#555",
  fontSize: "16px",
  lineHeight: "1.5",
  margin: "16px 0",
};