import './footer.css';

export default function Footer() {

  const dateYear = new Date().getFullYear();

  return (
    <footer>
      <a href="https://github.com/victorcarablut/ip-info-fe" target="_blank" rel="noopener noreferrer" className="git-link">
        <i className="bi bi-github" />
        <p>GitHub</p>
      </a>
      <p><small>© {dateYear} All rights reserved.</small></p>
      <a href="https://code.victorcarablut.com" target="_blank" rel="noopener noreferrer"><small>code.victorcarablut.com</small></a>
    </footer>
  )
}