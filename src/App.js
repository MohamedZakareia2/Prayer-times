import { useState } from "react";
import { useEffect } from "react";
import Prayer from "./components/prayer";

export default function App(){

  const [prayerTimes , setprayerTimes] = useState({})
  const [dateTime , setdateTime] = useState("")
  const [city , setcity] = useState("cairo")


    const cities = [
      {name : "القاهرة" , value : "Cairo"},
      {name : "الاسكندرية" , value : "Alexandria"},
      {name : "الجيزة" , value : "Giza"},
      {name : "المنصورة" , value : "Aswan"},
      {name : "الأقصر" , value : "Luxor"},
      {name : "أسوان" , value : "Mansoura"},
    ]


      useEffect(()=>{
        const fetchprayertimes = async () =>{
          try{

            const response = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=Eg&country=${city}`)
            const dataprayer = await response.json()

            setprayerTimes(dataprayer.data.timings)

            setdateTime(dataprayer.data.date.gregorian.date)

            console.log(dataprayer.data.date.gregorian.date)

          } catch(error){
            console.error(error)
          }


        }

        fetchprayertimes()

      },[city])

      const formattimes = (time)=>{
        if(!time){
           return "00:00";
        }

        let [hours , minutes] = time.split(":").map(Number)
          const perd = hours >= 12 ? "PM" : "AM" ;
          hours = hours %12 || 12
          return `${hours}:${minutes < 10 ? "0" + minutes : minutes}${perd}` 

      }


  return (
      <section>
        <div className="container">
          <div className="top-sec">
            <div className="city">
            <h3>المدينة</h3>
            <select name="" id="" onChange={(e)=> setcity(e.target.value)} >
              {cities.map((city_obj)=>(
                <option key={city_obj.value} value={city_obj.value} >
                  {city_obj.name}
                  </option>
              ))}
            </select>


            </div>


            <div className="date">
              <h3>التاريخ</h3>
              <h2>{dateTime}</h2>
            </div>
            

          </div>
          <Prayer name = "الفجر" time = {formattimes(prayerTimes.Fajr)} />
          <Prayer name = "الظهر" time = {formattimes(prayerTimes.Dhuhr)}/>
          <Prayer name = "العصر" time = {formattimes(prayerTimes.Asr)}/>
          <Prayer name = "المغرب" time ={formattimes(prayerTimes.Maghrib)} />
          <Prayer name = "العشاء" time ={formattimes(prayerTimes.Isha)} />

        </div>
      </section>
  )
};