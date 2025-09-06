export function Footer() {
  const date = new Date().getFullYear();

  return (
    <footer class="footer">
      <p>©{date} Caitlin Teague Doerr</p>
      <p>
        To contact owner/developer, send an email to{" "}
        <a href="mailto:design@caitlinteague.com" className="footer__link">
          design@caitlinteague.com
        </a>
      </p>
      <p>
        <a href="//caitlinteague.com/builds" className="footer__link">
          View more projects in Caitlin's portfolio
        </a>
      </p>
    </footer>
  );
}
