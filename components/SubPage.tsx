import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Props = {
  title: string;
  color: string;
  textColor?: string;
  // Body paragraphs from lib/content.ts. If empty, the "Coming online soon."
  // placeholder is shown instead.
  paragraphs?: string[];
};

export default function SubPage({
  title,
  color,
  textColor = "#ffffff",
  paragraphs = [],
}: Props) {
  return (
    <>
      <Header />
      <main className="subpage" style={{ background: color, color: textColor }}>
        <div className="subpage-inner">
          <h1 className="subpage-title">{title}</h1>
          {paragraphs.length > 0 ? (
            paragraphs.map((text, i) => (
              <p key={i} className="subpage-body">
                {text}
              </p>
            ))
          ) : (
            <p className="subpage-hint">Coming online soon.</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
