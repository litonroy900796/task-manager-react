import Footer from "./Footer";
import Header from "./Header";
import HeroSection from "./HeroSection";
import TaskBoard from "./task/TaskBoard";
export default function App() {
    return (
        <>
            <Header />
            <div className="flex flex-col justify-center items-center bg-[#191D26] font-[Inter] text-white">
                <HeroSection />
                <TaskBoard />
            </div>
            <Footer />
        </>
    );
}
