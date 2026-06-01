import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Props = {
  title: string;
  color: string;
  textColor?: string;
};

export default function SubPage({ title, color, textColor = "#ffffff" }: Props) {
  return (
    <>
      <Header />
      <main className="subpage" style={{ background: color, color: textColor }}>
        <div className="subpage-inner">
          <h1 className="subpage-title">{title}</h1>
          <p className="subpage-hint">Coming online soon.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
