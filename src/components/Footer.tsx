
import React from 'react';
import { GraduationCap, Phone, Mail, Shield, Copyright } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold">Algot Academy</h3>
            </div>
            
            {/* Instructor Profile */}
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                AN
              </div>
              <div>
                <h4 className="text-xl font-semibold text-blue-400">A. Naveen</h4>
                <p className="text-gray-400">Founder & Chief Educator</p>
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <span>Cell: 9494719306</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <span>algotnaveen@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Legal Information */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-blue-400 flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Legal & Security</span>
            </h4>
            
            <div className="space-y-4 text-sm text-gray-300">
              <div className="bg-red-900/20 p-4 rounded-lg border-l-4 border-red-500">
                <h5 className="font-semibold text-red-400 mb-2">⚠️ STRICTLY PROHIBITED</h5>
                <ul className="space-y-1">
                  <li>• Taking screenshots of video content</li>
                  <li>• Screen recording or video capture</li>
                  <li>• Unauthorized distribution of materials</li>
                  <li>• Sharing login credentials</li>
                </ul>
              </div>
              
              <div className="bg-yellow-900/20 p-4 rounded-lg border-l-4 border-yellow-500">
                <h5 className="font-semibold text-yellow-400 mb-2">📱 Mobile Security</h5>
                <p>Advanced protection systems prevent unauthorized capture on mobile devices.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-sm">
              <Copyright className="w-4 h-4" />
              <span>2024 Algot Academy. All Rights Reserved.</span>
            </div>
            
            <div className="text-sm text-gray-400 text-center md:text-right">
              <p>Educational content is protected by copyright law.</p>
              <p>Unauthorized use, reproduction, or distribution is strictly prohibited.</p>
            </div>
          </div>
        </div>

        {/* Additional Legal Text */}
        <div className="mt-6 text-xs text-gray-500 text-center">
          <p>
            This platform and its content are protected by intellectual property laws. 
            Any violation of these terms may result in immediate account termination and legal action.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
