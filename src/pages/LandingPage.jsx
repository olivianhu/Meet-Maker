import { Link } from "react-router-dom";

export default function LandingPage() {
  return(
    <div className="w-full flex flex-col gap-12 h-[92vh] pt-60 pl-160" 
      style={{
        backgroundImage: "url('background.png')", 
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="text-white text-6xl text-left">
        Let’s find a time to <span className="text-[#5CC54A]">meet</span> ! <br/>
        Start building projects <br/>
        people remember.
      </div>
      <Link to={"/creation"} className="bg-[#5CC54A] w-60 px-3 py-4 rounded-full text-center text-white text-xl hover:bg-[#32AF1C]">
        Create a new event
      </Link>
    </div>
  )
}