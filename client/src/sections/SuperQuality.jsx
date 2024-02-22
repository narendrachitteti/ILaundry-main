import { shoe8 } from "../assets/images"
import Button from "../components/Button"

const SuperQuality = () => {
  return (
    <section id="about-us" className="flex justify-between items-center max-lg:flex-col gap-10 w-full max-container">
      <div className="flex flex-1 flex-col">
        <h2 className="font-palanquin text-4xl capitalize font-bold lg:max-w-lg">
          We Provide You <span className="text-coral-red">Super</span> <span className="text-coral-red">Quality</span> Services
        </h2>

        <p className="mt-4 lg:max-w-lg info-text">Effortless Freshness, Tailored to You – Where Clean and Simple Unite, Every Wash, Every Fold.".</p>
        <p className="mt-6 lg:max-w-lg info-text">Our dedication to detail and excellence ensures your satisfaction</p>

        {/* <div className="mt-11">
          <Button label="View details" />
        </div> */}
      </div>

      <div className="flex-1 flex justify-center items-center">
        <img src="https://static.wixstatic.com/media/433ab0_8aded375e81e42c49e59ee7a5de3cedd~mv2.png/v1/crop/x_0,y_17,w_685,h_510/fill/w_569,h_425,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/b9df27b01a8a843c7a645ab7cf122cb3.png" alt="shoe8" width={570} height={522} className="object-contain" />
      </div>
    </section>
  )
}

export default SuperQuality;