import { Link } from "react-router";

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-900 text-gray-300 mt-10">
        <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-white">FinEase</h2>
            <p className="mt-2 text-sm text-gray-400">
              Smart finance tracking made simple.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
            <p>Email: support@finease.com</p>
            <p>Phone: +880 1XXXXXXXXX</p>
            <p>Location: Chattogram, Bangladesh</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              Quick Links
            </h3>

            <div className="space-y-2">
              <li>
                <Link to={"/terms&condition"} className="hover:text-white">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to={"/privacy"} className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
            </div>

            {/* Social Media */}
            <div className="flex gap-4 mt-4">
              <a href="#" className="hover:text-blue-500">
                Facebook
              </a>
              <a href="#" className="hover:text-sky-400">
                Twitter
              </a>
              <a href="#" className="hover:text-pink-500">
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-500">
          © {new Date().getFullYear()} FinEase. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Footer;
