import React, { useState } from "react";
import "../styles/Findplace.css";

const FindPlaces = () => {
  const places = [
    {
      id: 1,
      name: "X433 랩실",
      time: "08:30 - 22:00",
      tags: ["노트북", "콘센트", "팀플", "작업"],
      img: "/images/X433.png",
      details: {
        title: "A&T LAB",
        description: `
          넓은 자리, 허리를 안정감 있게 받쳐주는 의자가 있는 공간입니다.
          콘센트가 넉넉하게 구비되어 있어 어디에도 앉아 작업을 원활하게 할 수 있습니다.
          아테커에게는 집과도 같은 공간입니다 :)
        `,
        features: [
          {
            title: "노트북 사용 가능",
            description: "노트북 작업에 최적화된 환경입니다.",
          },
          {
            title: "취식 가능",
            description:
              "혼자서 맛있는 걸 먹기에, 다 같이 작업하면서 대화하기 좋은 공간이에요.",
          },
          {
            title: "대화 가능",
            description:
              "학과 사람들과 소소하게 대화하면서 작업하기 좋은 공간입니다.",
          },
        ],
      },
    },
    {
      id: 2,
      name: "BW2F 그라찌에",
      time: "08:30 - 19:30",
      tags: ["노트북", "콘센트", "카페", "핫도그"],
      img: "/images/graziae.png",
      details: {
        title: "그라찌에",
        description: `
          아늑한 카페 분위기에서 작업과 휴식을 병행할 수 있는 공간입니다.
          콘센트가 적당히 구비되어 있으니 자리를 잘 선택해주세요!
        `,
        features: [
          {
            title: "노트북 사용 가능",
            description: "카페 분위기에서 작업 가능.",
          },
          {
            title: "취식 가능",
            description: "맛있는 핫도그와 음료를 즐길 수 있습니다.",
          },
          {
            title: "조용한 환경",
            description:
              "다른 사람들과 대화를 삼가고 조용히 작업하기 좋은 장소입니다.",
          },
        ],
      },
    },
  ];

  const [selectedPlace, setSelectedPlace] = useState(places[0]); // 기본적으로 첫 번째 장소 선택

  const handlePlaceClick = (place) => {
    setSelectedPlace(place); // 선택한 장소 업데이트
  };

  return (
    <div className="find-places-container">
      {/* 3:7 비율 레이아웃 */}
      <div className="layout">
        {/* 왼쪽: 장소 리스트 */}
        <div className="places-list">
          <h1>
            <span>서강이</span>님을 위한 장소예요!
          </h1>
          <p>
            선택하신 키워드와 비슷한 장소예요.
            <br />
            가장 많이 방문하실 수 있는 곳을 가져왔어요 :)
          </p>
          <h2>추천 장소 리스트</h2>
          {places.map((place) => (
            <div
              key={place.id}
              className={`place-item ${
                selectedPlace.id === place.id ? "active" : ""
              }`}
              onClick={() => handlePlaceClick(place)}
            >
              <h3>{place.name}</h3>
              <p className="time">{place.time}</p>
              <div className="tags">
                {place.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 오른쪽: 선택된 장소 상세 정보 */}
        <div className="place-details">
          <img
            src={selectedPlace.img}
            alt={selectedPlace.name}
            className="place-image"
          />
          <div className="details-header">
            <h2>{selectedPlace.name}</h2>
            <p className="subtitle">{selectedPlace.details.title}</p>
            <p className="time">{selectedPlace.time}</p>
          </div>
          <p className="description">{selectedPlace.details.description}</p>
          <div className="features">
            {selectedPlace.details.features.map((feature, index) => (
              <div key={index} className="feature-item">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindPlaces;
