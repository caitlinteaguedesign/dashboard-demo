export function Footer() {
  const date = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>©{date} Caitlin Teague Doerr</p>
      <p>
        To contact owner/developer,{" "}
        <a href="mailto:design@caitlinteague.com" className="footer__link">
          send an email
        </a>{" "}
        to <span className="text-bold">design@caitlinteague.com</span>
      </p>
      <p>
        <a href="//caitlinteague.com/builds" className="footer__link">
          View more projects in Caitlin's portfolio
        </a>
      </p>
    </footer>
  );
}
