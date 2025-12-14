// import fotercss from './fotercss.js'; // agar tumhare paas CSS module hai
import foter_css from "./css/fotercss.js";
function Footer() {
  return (
    <footer className={`${foter_css.foterde} fixed bottom-0 w-full`}>
      <div className={foter_css.cont}>
        
        {/* Left side: copyright */}
        <p className={foter_css.p}>&copy; 2025 Shoarya. All rights reserved.</p>
        
        {/* Right side: links */}
        <div className={foter_css.link_r}>
          <a href="/register" className={foter_css.a}>
            Register
          </a>
          <a href="/about" className={foter_css.a}>
            About
          </a>
          <a href="/contact" className={foter_css.a}>
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
