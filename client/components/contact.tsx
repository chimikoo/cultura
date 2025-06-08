import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Clock, Mail } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-20 bg-mocha-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Visit <span className="text-forest-200">Cultura</span>
          </h2>
          <p className="text-lg text-mocha-200 max-w-2xl mx-auto">
            Ready to embark on a culinary journey? Reserve your table or get in
            touch with us.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-semibold mb-8">Get in Touch</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-forest-300 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Location</h4>
                  <p className="text-mocha-200">
                    123 Culinary Street
                    <br />
                    Food District, FC 12345
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Phone className="h-6 w-6 text-forest-300 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Phone</h4>
                  <p className="text-mocha-200">(555) 123-FOOD</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Mail className="h-6 w-6 text-forest-300 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Email</h4>
                  <p className="text-mocha-200">hello@cultura-restaurant.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Clock className="h-6 w-6 text-forest-300 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Hours</h4>
                  <div className="text-mocha-200 space-y-1">
                    <p>Mon-Thu: 5:00 PM - 10:00 PM</p>
                    <p>Fri-Sat: 5:00 PM - 11:00 PM</p>
                    <p>Sun: 4:00 PM - 9:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-2xl font-semibold mb-8">Make a Reservation</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  placeholder="First Name"
                  required
                  className="bg-mocha-800 border-mocha-700 text-white placeholder:text-mocha-400"
                />
                <Input
                  placeholder="Last Name"
                  required
                  className="bg-mocha-800 border-mocha-700 text-white placeholder:text-mocha-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  type="email"
                  placeholder="Email"
                  required
                  className="bg-mocha-800 border-mocha-700 text-white placeholder:text-mocha-400"
                />
                <Input
                  type="tel"
                  placeholder="Phone"
                  required
                  className="bg-mocha-800 border-mocha-700 text-white placeholder:text-mocha-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  type="date"
                  required
                  className="bg-mocha-800 border-mocha-700 text-mocha-400 placeholder:text-mocha-400 [&::-webkit-calendar-picker-indicator]:invert"
                  style={{ color: "#ba9676" }}
                />
                <Input
                  type="time"
                  required
                  className="bg-mocha-800 border-mocha-700 text-mocha-400 placeholder:text-mocha-400 [&::-webkit-calendar-picker-indicator]:invert"
                  style={{ color: "#ba9676" }}
                />
              </div>

              <Input
                type="number"
                placeholder="Number of Guests"
                min="1"
                max="20"
                required
                className="bg-mocha-800 border-mocha-700 text-white placeholder:text-mocha-400"
              />

              <Textarea
                placeholder="Special requests or dietary restrictions..."
                className="bg-mocha-800 border-mocha-700 text-white placeholder:text-mocha-400"
                rows={4}
              />

              <Button className="w-full bg-burgundy-700 hover:bg-burgundy-800 text-lg py-3">
                Reserve Table
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-mocha-800 text-center">
          <p className="text-mocha-400">
            © 2025 Cultura Restaurant. All rights reserved. | Crafted with
            passion for food culture.
          </p>
        </div>
      </div>
    </section>
  );
}
