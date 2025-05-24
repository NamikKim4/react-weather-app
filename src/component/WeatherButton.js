import React from "react";
import { Button } from "react-bootstrap";

const WeatherButton = ({ cities, selectedCity, handleCityChange }) => {
  return (
    <div class="menu-container">
      <Button
        variant={`${selectedCity == null ? "outline-primary" : "primary"}`}
        onClick={() => handleCityChange("current")}
      >
        Current Location
      </Button>

      {cities.map((city) => (//cities라는 배열을 부모로부터 넘겨받아서 map으로 하나씩 꺼내서 버튼으로 나열
        <Button
          variant={`${selectedCity == city ? "outline-primary" : "primary"}`}
          onClick={() => handleCityChange(city)} //handleCityChange에 선택된 도시이름을 setCity에 담음
        >
          {city}
        </Button>
      ))}
    </div>
  );
};

export default WeatherButton;