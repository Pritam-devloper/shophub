import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'
import { APP_NAME } from '../../utils/constants'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="container-custom py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">About</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Press</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">Help</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/help" className="hover:text-white transition-colors">Payments</Link></li>
              <li><Link to="/help" className="hover:text-white transition-colors">Shipping</Link></li>
              <li><Link to="/help" className="hover:text-white transition-colors">Cancellation & Returns</Link></li>
              <li><Link to="/help" className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Policy */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">Policy</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/returns" className="hover:text-white transition-colors">Return Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms Of Use</Link></li>
              <li><Link to="/security" className="hover:text-white transition-colors">Security</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">Social</h3>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
                <FaFacebookF size={14} />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
                <FaTwitter size={14} />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
                <FaInstagram size={14} />
              </a>
            </div>
          </div>

          {/* Address */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">Mail Us</h3>
            <p className="text-sm leading-relaxed">
              {APP_NAME} Internet Private Limited,<br />
              Buildings Alyssa, Begonia &<br />
              Clove Embassy Tech Village,<br />
              Outer Ring Road, Devarabeesanahalli Village,<br />
              Bengaluru, 560103,<br />
              Karnataka, India
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-white transition-colors">Become a Seller</a>
              <a href="#" className="hover:text-white transition-colors">Advertise</a>
              <a href="#" className="hover:text-white transition-colors">Gift Cards</a>
              <a href="#" className="hover:text-white transition-colors">Help Center</a>
            </div>

            <div className="text-xs text-gray-500">
              © 2007-{currentYear} {APP_NAME}.com
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Payment Partners:</span>
              <div className="flex gap-2">
                <div className="bg-white px-2 py-1 rounded text-xs font-semibold text-gray-900">VISA</div>
                <div className="bg-white px-2 py-1 rounded text-xs font-semibold text-gray-900">MC</div>
                <div className="bg-white px-2 py-1 rounded text-xs font-semibold text-gray-900">UPI</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
