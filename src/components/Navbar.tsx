import { ArrowUpRight } from 'lucide-react';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  return (
    <header className="site-shell">
      <nav className="navbar" aria-label="Primary navigation">
        <a className="brand" href="#home">
          <span className="brand-mark">P</span>
          <span>Pranav Dabhi</span>
        </a>
        <div className="nav-links">
          {links.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
          <a className="nav-cta" href="#contact">
            Let’s talk
            <ArrowUpRight size={16} />
          </a>
        </div>
      </nav>
    </header>
  );
}
