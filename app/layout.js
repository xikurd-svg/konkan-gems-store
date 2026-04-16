export const metadata = {
  title: "KonKan Gems Store",
  description: "Official KonKan Gems Store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#0A0C12", color: "white", fontFamily: "Inter, Arial, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
