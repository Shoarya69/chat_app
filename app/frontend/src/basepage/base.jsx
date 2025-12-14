import Nav_bar from "./nav";
import Footer from "@/components/foter";
import basecss from "./basecss";
export default function Base_page(){
    return (
        <>
            <Nav_bar/>
            <div className={basecss.base_main}>
                {/* <img src="#" alt="#" /> */}
                <h2 className={basecss.gree} >Welcome, Sir</h2>
            </div>
            <Footer/>
        </>
    );
}