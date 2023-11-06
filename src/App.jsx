import { useEffect, useState } from "react";
import Clock from "./Components/Clock";
import Quote from "./Components/Quote";
import backgroundDay from "./assets/desktop/bg-image-daytime.jpg";

export default function App() {
  const [hideQuote, setHideQuote] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    async function getIpData() {
      const response = await fetch(
        `https://ipgeolocation.abstractapi.com/v1?api_key=${
          import.meta.env.VITE_IPGEOLOCATION_API
        }`
      );
      const data = await response.json();
      console.log(data.timezone);
      setUserInfo(data);
    }

    getIpData();
  }, []);

  return (
    <div
      className='h-screen overflow-hidden bg-cover bg-no-repeat flex items-center justify-center'
      style={{ backgroundImage: `url(${backgroundDay})` }}
    >
      <div className='flex flex-col gap-5'>
        {!hideQuote && <Quote />}
        {userInfo && (
          <Clock
            userInfo={userInfo}
            hideQuote={hideQuote}
            setHideQuote={setHideQuote}
          />
        )}
      </div>
    </div>
  );
}
