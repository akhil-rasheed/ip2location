import axios from "axios"
import { useState } from "react"

import "~style.css"

interface LocationData {
  country: string
  city: string
  flag: string
}

function IndexPopup() {
  const [isLoading, setLoading] = useState<boolean>(false)
  const [location, setLocation] = useState<LocationData | null>(null)

  async function fetchIpAddress(): Promise<string> {
    return axios.get("https://api64.ipify.org").then((response) => {
      return response.data
    })
  }

  async function fetchLocation(ipAddr: string) {
    const apiURL = `https://ipinfo.io/${ipAddr}?token=${process.env.PLASMO_PUBLIC_IPINFO_TOKEN}`
    console.log(apiURL)
    axios.get(apiURL).then((response) => {
      axios
        .get(`https://restcountries.com/v3.1/alpha/${response.data.country}`)
        .then((res) => {
          const locationData: LocationData = {
            country: res.data[0].name.common,
            city: response.data.city,
            flag: res.data[0].flags.png
          }
          console.log(locationData)
          setLocation(locationData)
        })
    })
  }

  async function updateInfo() {
    setLoading(true)
    try {
      const userIP = await fetchIpAddress()
      await fetchLocation(userIP)
    } catch (error) {
      console.error("Error fetching IP or location:", error)
    } finally {
      location ? setLoading(false) : null
    }
  }

  return (
    <div className="flex flex-col items-center  h-[500px] w-[500px] bg-[#0a1322]">
      {/* Display area */}
      <div className="w-full text-xl text-white">
        {/* Display text and gradient */}
        {!isLoading && location && (
          <div className=" text-4xl z-10 p-8 fixed h-[500px]  bg-gradient-to-l from-transparent stop to-black w-full">
            Your country is{" "}
            <span className="font-bold">{location.country}</span>, and city is{" "}
            <span className="font-bold">{location.city}</span>
          </div>
        )}
      </div>
      {/* Flag image */}
      {location && (
        <img
          src={location.flag}
          alt={location.country}
          className="w-full z-0"
          onLoad={() => setLoading(false)}
        />
      )}

      {/* Button */}
      <div className="z-10 h-full flex items-center justify-center ">
        <button
          onClick={() => updateInfo()}
          type="button"
          className="flex flex-row items-center h-10 w-44 justify-center rounded-lg transition-all border-none shadow-lg hover:shadow-md active:scale-105 bg-[#75fbf3] hover:bg-slate-100 text-slate-800 hover:text-slate-900 font-bold text-xl">
          {isLoading ? (
            <p className="flex flex-row items-center justify-center">
              {/* Loading svg */}
              <svg
                width="45"
                height="45"
                viewBox="0 0 45 45"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#000">
                <g
                  fill="none"
                  fillRule="evenodd"
                  transform="translate(1 1)"
                  strokeWidth="2">
                  <circle cx="22" cy="22" r="6" strokeOpacity="0">
                    <animate
                      attributeName="r"
                      begin="1.5s"
                      dur="3s"
                      values="6;22"
                      calcMode="linear"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="stroke-opacity"
                      begin="1.5s"
                      dur="3s"
                      values="1;0"
                      calcMode="linear"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="stroke-width"
                      begin="1.5s"
                      dur="3s"
                      values="2;0"
                      calcMode="linear"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle cx="22" cy="22" r="6" strokeOpacity="0">
                    <animate
                      attributeName="r"
                      begin="3s"
                      dur="3s"
                      values="6;22"
                      calcMode="linear"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="stroke-opacity"
                      begin="3s"
                      dur="3s"
                      values="1;0"
                      calcMode="linear"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="stroke-width"
                      begin="3s"
                      dur="3s"
                      values="2;0"
                      calcMode="linear"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle cx="22" cy="22" r="8">
                    <animate
                      attributeName="r"
                      begin="0s"
                      dur="1.5s"
                      values="6;1;2;3;4;5;6"
                      calcMode="linear"
                      repeatCount="indefinite"
                    />
                  </circle>
                </g>
              </svg>
              Loading...
            </p>
          ) : (
            <p>Show Location</p>
          )}
        </button>
      </div>
      {/* Footer */}
      <div className="w-full fixed bottom-0  text-white z-10 my-2 text-xs">
        <span className="float-right mx-4 font-bold ">
          <a href="https://www.github.com/akhil-rasheed/ip2location"> GitHub</a>
        </span>
      </div>
    </div>
  )
}

export default IndexPopup
