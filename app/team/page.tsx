import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { team } from "@/lib/content";

export const metadata: Metadata = { title: "Team · Galactic Fleet" };

export default function TeamPage() {
  return (
    <>
      <Header />
      <main className="team-page" style={{ background: "#E8C09C", color: "#25344B" }}>
        <div className="team-inner">
          <header className="team-head">
            <h1 className="team-title">{team.title}</h1>
            <p className="team-intro">{team.intro}</p>
          </header>

          <ul className="team-list">
            {team.members.map((m) => (
              <li key={m.name} className="team-row">
                <div className="team-row-photo">
                  <img src={m.photo} alt={m.name} />
                </div>
                <div className="team-row-content">
                  <h2 className="member-name">{m.name}</h2>
                  <p className="member-role">{m.role}</p>
                  <p className="member-bio">{m.bio}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
