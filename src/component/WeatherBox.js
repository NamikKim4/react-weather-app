import React from "react";
import { Card } from "react-bootstrap";

const WeatherBox = ({ weather }) => { //weather에 api data가 담겨서 넘어옴
  //온도가 화씨로 넘어옴
  const temperatureC =
    weather && weather.main ? (weather.main.temp - 273.15).toFixed(2) : "";
  const temperatureF =
    weather && weather.main ? (((weather.main.temp - 273.15) * 9) / 5 + 32).toFixed(2) : "";

    // weather의 초기값은 null이다. useEffect는 UI가 전부 그려진 후에 작동한다.
    // 초기값이 null인상태로 들어왔기때문에 props에 데이터가 없으므로 바로 에러가뜬다. 
    // 그래서 처음에 물어봐줘야됨 null이면 아무것도 안띄우고 null이아닐시에 데이터를 띄우게끔
    // weather && weather.name / weather?.name으로도 쓸수 있음

  return (
    <Card className="weather-card">
      {/* <Card.Img src="holder.js/100px270" alt="Card image" /> */}
      <Card.ImgOverlay className="d-flex flex-column justify-content-center text-center">
        <Card.Title>{weather?.name || '날씨를 가져오는데 실패했습니다.'}</Card.Title>
        <Card.Text className="text-success h1">
          {`${temperatureC} °C / ${temperatureF} °F`}
        </Card.Text>
        <Card.Text className="text-info text-uppercase h2">
          "{weather && weather.weather[0]?.description}" 
          {/* 넘어온 data보면 weather이라는 애가 있음 거기서 첫번째 객체안에 descriptiond이있음  */}
        </Card.Text>
        <Card.Text className="text-info text-uppercase h2">
        humidity : {weather && weather.main.humidity} <br/>
        </Card.Text>
      </Card.ImgOverlay>
    </Card>
  );
};

export default WeatherBox;