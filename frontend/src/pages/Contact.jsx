import { assets } from "../assets/assets.js"

export default function Contact() {
    return (
        <div>

            <div className="text-center text-2xl pt-10 text-gray-500">
                <p>CONTACT <span className="text-gray-700 font-semibold">US</span></p>
            </div>

            <div className="my-10 flex flex-col justify-center md:flex-row gap-10 md-28 text-sm">
                <img src={assets.contact_image} alt="" className="w-full md:max-w-[360px]" />
                <div className="flex flex-col justify-center items-start gap-6">
                    <p className="font-semibold text-lg text-gray-600">OUR OFFICE</p>
                    <p className="text-gray-500">789 XYZ STREET <br /> ABCDEF, GIJKLMNOP, QRST</p>
                    <p className="text-gray-500">Tel: +01-2345-6789 <br />Email: prescripto@mail.com</p>
                    <p className="font-semibold text-lg text-gray-600">CAREERS at PRESCRIPTO</p>
                    <p className="text-gray-500">Learn more about our teams and job openings.</p>
                    <button className="border border-black  px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500 cursor-pointer">
                        Explore Jobs
                    </button>
                </div>
            </div>

        </div>
    )
}


