import Button from "../components/Button";

const Subscribe = () => {
  return (
    <section className="max-container flex justify-between items-center max-lg:flex-col gap-10" id="contact-us">
      <h3 className="text-4xl leading-[68px] lg:max-w-md font-palanquin font-bold">Contact<span className="text-coral-red"> Us</span> </h3>
      <div className="lg:max-w-[40%] w-full flex items-center max-sm:flex-col gap-5 p-2 sm:border sm:border-slate-gray rounded">
        <input type="text" placeholder="Get in touch with us!" className="input" style={{background:"none"}} />
        <div className="flex max-sm:justify-end items-center max-sm:w-full">
          <Button label="Contact Us" fullWidth />
        </div>
      </div>
    </section>
  )
}

export default Subscribe;