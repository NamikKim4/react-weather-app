import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Container } from "react-bootstrap";
import WeatherButton from "./component/WeatherButton";
import WeatherBox from "./component/WeatherBox";
import { ClipLoader } from "react-spinners";

const cities = ["tokyo", "paris", "new york", "seoul"];
const API_KEY = '6ccaeb23d523ffa58f71dff74916127a';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState(null); //이 city라는 state가 바뀔때마다 useEffect가 호출될것임!!!
  const [weather, setWeather] = useState(null); //weather에 날씨 정보가 담긴다.
  const [apiError, setAPIError] = useState("");


//현재위치정보를 알아냄과 동시에 현재 위치의 날씨정보를 setWeather에 세팅한다 .
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      getWeatherByCurrentLocation(latitude, longitude);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();

      setWeather(data);
      console.log("current data",data);
      setLoading(false);
    } catch (err) {
      setAPIError(err.message);
      setLoading(false);
    }
  };




//도시별 날씨 정보를 setWeather에 세팅하는 함수
  const getWeatherByCity = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();

      setWeather(data);
      console.log("city data",data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setAPIError(err.message);
      setLoading(false);
    }
  };


  //⭐순서를 정리해보자면) App에서 cities와 handleCityChange를 WeatherButton에 넘겨줌
  //WeatherButton에서 handleCityChange를 통해 city(혹은 current)를 App에 넘겨줌
  //그러면 App에서는 handleCityChange를 통해 setCity에 city 값을 담음
  //그러면 그 변경된 city(혹은 current)값에따라 useEffect가 호출되는데, 거기서 city(혹은 current) api가 호출됨
  //그러면 거기서 api를 호출시키는 함수에 setWeather이 포함되어있기 때문에
  //거기서 api를 setWeather에 세팅해놓음
  //===========여기까지가 App과 WeatherButton 사이

  //이제 그러면 setWeather에 세팅된 api를 갖고 WeatherBox에 날씨 정보가 세팅하겠지
  //setWhether에 호출된 api정보를 통해 weather를 통해 WheatherBox에 날씨 정보를 넘긴다.
  //===========여기까지가 App과 WeatherBox 사이

  // WheatherButton ==> App ==> WeatherBox

  useEffect(() => {
     if (city == null) {
      console.log("city😆",city);
       setLoading(true); //data가 fetch될때만 true(데이터가 나오기 전에만 잠깐 보이게끔)
       getCurrentLocation(); //현재 위치의 날씨정보를 setWeather에 세팅하는 함수(api호출)
     } else {
    setLoading(true);
    console.log("city😆",city);
    getWeatherByCity(); //도시별 날씨 정보를 setWeather에 세팅하는 함수(api호출)
     }
  }, [city]);


  //handleCityChange함수를 통해 WeatherButton에서 도시명 or current를 넘겨받음
  //handleCityChange함수를 통해 city를 null로 세팅함을 통해 현재위치의 날씨정보로 변경하는 이벤트를 설정
  //초반엔 setCity의 초기값이 null이기 때문에 그걸 활용한거임
  const handleCityChange = (city) => {
    if (city === "current") { 
      setCity(null); //사용자가 current를 누르면 setCity에 null이 담기고,
    } else {
      setCity(city); //사용자가 도시명을 누르면 그 도시명이 setCity에 담긴다.
    }
  };


  return (
    <>
      <Container className="vh-100">
        {loading ? ( //로딩이 true일때만 로딩스피너를 보여줌
          <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
            <ClipLoader color="black" size={150} loading={loading} />
          </div>
        ) : !apiError ? (
          <div class="main-container">
            <WeatherBox weather={weather} />
            <WeatherButton cities={cities} handleCityChange={handleCityChange} selectedCity={city} />
          </div>
        ) : (
          apiError
        )}
      </Container>
    </>
  );
};
export default App;