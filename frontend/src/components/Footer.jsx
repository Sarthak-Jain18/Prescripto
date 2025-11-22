import { assets } from "../assets/assets";

export default function Footer() {
    return (
        <div className="md:mx-10">

            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-1 my-10 mt-40 text-sm">

                {/* LEFT SECTION */}
                <div>
                    <img src={assets.logo} alt="" className="mb-5 w-40" />
                    <p className="w-full md:w-2/3 text-gray-600 leading-6">
                        Simply browse through our extensive list of trusted doctors, schedule your
                        appointment hassle-free. Book Appointment With 100+ Trusted Doctors.
                    </p>
                </div>

                {/* CENTER SECTION */}
                <div>
                    <p className="text-xl font-medium mb-5">COMPANY</p>
                    <ul className="flex flex-col gap-2 text-gray-600">
                        <li>Home</li>
                        <li>About us</li>
                        <li>Contact us</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>

                {/* RIGHT SECTION */}
                <div>
                    <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
                    <ul className="flex flex-col gap-2 text-gray-600">
                        <li>+01-2345-6789</li>
                        <li>prescripto@mail.com</li>
                    </ul>
                </div>

            </div>

            <div>
                <hr />
                <p className="py-5 text-sm text-center">
                    Copyright 2025 @ Prescripto - All Rights Reserved.
                </p>
            </div>

        </div>
    )
}
