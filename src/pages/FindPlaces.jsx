import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Findplace.css";

const FindPlaces = () => {
  const navigate = useNavigate();
  const places = [
    {
      id: 1,
      name: "A&T LAB",
      place: "X433",
      time: "08:30 - 22:00",
      tags: ["노트북", "콘센트", "팀플", "작업"],
      img: "/images/X433.png",
      details: {
        title: "A&T LAB",
        description: `
          하비에르관 X433에 있는 공간입니다. 조용하고 아늑한 분위기로 학업이나 개인 프로젝트에 집중하기에 최적의 장소입니다.
        `,
        features: [
          {
            title: "노트북 사용 가능",
            description: `
          넓은 자리, 허리를 안정감 있게 받쳐주는 의자가 있는 공간입니다.\n
          콘센트가 넉넉하게 구비되어 있어 어디에도 앉아 작업을 원활하게 할 수 있습니다.\n
          아테커에게는 집과도 같은 공간이랍니다 :).
        `,
          },
          {
            title: "취식 가능",
            description: `혼자서 맛있는 걸 먹기에, 큰 책상에서 다같이 맛있는 걸 먹기 좋은 장소에요!\n
              다만 사람이 많은 경우, 너무 냄새가 나는 음식은 주의해주세요:) `,
          },
          {
            title: "대화 가능",
            description: `학과 사람들과 소소하게 대화하면서 작업하기 좋은 공간이에요. 함께 작업하는 사람들이 있으니 능률도 올라간답니다!
              \n팀플에도 좋은 공간이에요. 그렇지만 사람이 많이 있다면 크게 말하는 것은 삼가해주세요:)`,
          },
        ],
      },
    },
    {
      id: 2,
      name: "Grazie",
      place: "BW 2F",
      time: "08:30 - 19:30",
      tags: ["노트북", "콘센트", "카페", "핫도그"],
      img: "/images/graziae.png",
      details: {
        title: "Grazie",
        description: `
          아늑한 카페 분위기에서 작업과 휴식을 병행할 수 있는 공간입니다.
          콘센트가 적당히 구비되어 있으니 자리를 잘 선택해주세요!
        `,
        features: [
          {
            title: "노트북 사용 가능",
            description: `독서실과 같은 분위기의 좌석과 친구들과 다같이 공부할 수 있는 좌석까지!\n
            콘센트가 넉넉하게 구비되어 있어서 공부하기에 좋은 장소입니다:)`,
          },
          {
            title: "취식 가능",
            description: `카페 라운지 공간으로 먹고 싶은 음료수, 핫도그와 함께 공부할 수 있는 공간입니다.\n
            학교 안에서 공부하고 있지만 카공을 하는 기분이 든답니다 !`,
          },
          {
            title: "외부음식 금지",
            description: ` 넓고 자유로운 공부 공간이지만, 다만 카페다 보니 외부음식 반입은 안된다는 점 명심하세요 !!`,
          },
        ],
      },
    },
  ];

  const [selectedPlace, setSelectedPlace] = useState(places[0]);

  const handlePlaceClick = (place) => {
    setSelectedPlace(place); // 선택한 장소 업데이트
  };

  return (
    <div className="find-places-container">
      {/* 3:7 비율 레이아웃 */}
      <div className="layout">
        {/* 왼쪽: 장소 리스트 */}
        <div className="places-list">
          <img
            src="/images/arrow_back_24px.png"
            alt="back-arrow"
            className="back-arrow"
            onClick={() => navigate("/")}
          />
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
                  <span
                    key={index}
                    className={`tag ${
                      tag === "노트북" || tag === "콘센트" ? "highlight" : ""
                    }`}
                  >
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
            <p className="detail-place">{selectedPlace.place}</p>
            <h2>{selectedPlace.name}</h2>
            <p className="time">{selectedPlace.time}</p>
          </div>
          <div className="details-contents">
            <p className="description">{selectedPlace.details.description}</p>
            <div className="features">
              {selectedPlace.details.features.map((feature, index) => (
                <div key={index} className="feature-item">
                  {/* Title에서 특정 단어 강조 */}
                  <h3>
                    {feature.title
                      .split(/(노트북|취식|대화|외부음식)/)
                      .map((part, idx) => {
                        if (
                          part === "노트북" ||
                          part === "취식" ||
                          part === "대화" ||
                          part === "외부음식"
                        ) {
                          return (
                            <span key={idx} className="highlight">
                              {part}
                            </span>
                          );
                        }
                        return <span key={idx}>{part}</span>;
                      })}
                  </h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindPlaces;
