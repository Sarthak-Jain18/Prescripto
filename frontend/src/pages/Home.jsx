import Header from "../components/Header.jsx";
import SpecialityMenu from "../components/SpecialityMenu.jsx";
import TopDoctors from "../components/TopDoctors.jsx";
import Banner from "../components/Banner.jsx";

export default function Home() {
    return (
        <div>
            <Header />
            <SpecialityMenu />
            <TopDoctors />
            <Banner />
        </div>
    )
}