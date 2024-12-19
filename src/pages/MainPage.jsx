import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MainPage.css";
import Modal from "./Modal";

function MainPage() {
  const navigate = useNavigate();
  const keywordDetails = {
    과제: ["노트북", "Wi-Fi", "콘센트"],
    팀플: ["넓은", "대화가능", "노트북"],
    스터디: ["조용한", "책상", "Wi-Fi"],
    휴식: ["빈백", "침대", "음료"],
    줌수업: ["프라이빗", "헤드셋"],
  };
  /* Modal 관련  */
  /* -------------------modal open-------------------- */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [selectedHour, setSelectedHour] = useState("12");
  const [selectedMinute, setSelectedMinute] = useState("0");
  const [selectedPeriod, setSelectedPeriod] = useState("AM");

  /* -------------------modal time-------------------- */

  const formattedTime = `${selectedPeriod} ${selectedHour}시 ${selectedMinute}분`;

  const handleHourChange = (e) => setSelectedHour(e.target.value);
  const handleMinuteChange = (e) => setSelectedMinute(e.target.value);
  const handlePeriodChange = (e) => setSelectedPeriod(e.target.value);

  /* -------------------input창-------------------- */
  const [inputValue, setInputValue] = useState(""); // 입력값 상태
  const [tags, setTags] = useState([]);
  const [activeKeywordDetails, setActiveKeywordDetails] =
    useState(keywordDetails);
  const [animatingDetail, setAnimatingDetail] = useState(null); // 애니메이션 상태

  // 키워드 버튼 클릭 시 태그로 이동
  const handleKeywordDetailClick = (detail) => {
    // 태그에 추가
    if (!tags.includes(detail)) {
      setTags((prevTags) => [...prevTags, detail]);
    }

    // 키워드 상세에서 제거
    setActiveKeywordDetails((prevDetails) => {
      const updatedDetails = { ...prevDetails };
      for (const key in updatedDetails) {
        updatedDetails[key] = updatedDetails[key].filter(
          (item) => item !== detail
        );
      }
      return updatedDetails;
    });
  };

  // 태그 X 버튼 클릭 시 다시 키워드로 이동
  const handleTagRemove = (tag) => {
    setTags((prevTags) => prevTags.filter((t) => t !== tag)); // 태그에서 제거

    // 키워드 상세로 복원
    setActiveKeywordDetails((prevDetails) => {
      const updatedDetails = { ...prevDetails };
      for (const key in keywordDetails) {
        if (keywordDetails[key].includes(tag)) {
          updatedDetails[key] = [...updatedDetails[key], tag];
        }
      }
      return updatedDetails;
    });
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      event.preventDefault(); // 기본 동작 방지

      // 중복 값 검사
      if (!tags.includes(inputValue.trim())) {
        setTags((prevTags) => [...prevTags, inputValue.trim()]); // 새로운 버튼 추가
      }

      setInputValue(""); // 입력값 초기화
    }
  };

  const handleRemoveTag = (tag) => {
    setTags(tags.filter((t) => t !== tag)); // 해당 버튼 제거
  };

  /* Active 관련  */
  const [activeKeyword, setActiveKeyword] = useState("과제");
  const handleKeywordClick = (keyword) => {
    setActiveKeyword(keyword);
  };

  const [selectedPeople, setSelectedPeople] = useState("1명");
  const [selectedTime, setSelectedTime] = useState("지금 바로");
  const [selectedLocation, setSelectedLocation] = useState("아무데서나");

  /* Modal에서 변경된 값 핸들링 */
  const handlePeopleChange = (value) => setSelectedPeople(value);
  const handleTimeChange = (value) => setSelectedTime(value);
  const handleLocationChange = (value) => setSelectedLocation(value);

  /* -------------------searching-------------------- */
  const [searching, setSearching] = useState(false); // 검색 중인지 여부
  const [loadingVisible, setLoadingVisible] = useState(false);

  const handleSearchClick = () => {
    setSearching(true); // 검색 상태로 전환
    setTimeout(() => {
      setLoadingVisible(true);
      setTimeout(() => {
        navigate("/finding-place"); // 'finding-place' 경로로 이동
      }, 3000);
    }, 50);
  };

  /* ------------------------------------------------------------------------  
  ---------------------------------------------------------------------------
  */

  return (
    <div className="main-container">
      {/* Background sogangUniv img */}
      <div className="sogang-background"></div>
      {/* Header */}
      <header className="header">
        <h1 className="welcome">
          <span>서강이</span>님,<br></br>
          오늘은 어떤 장소를 찾으시나요?
        </h1>
      </header>

      {/* Search Input */}
      <div className="search-section">
        <div className="place-search-bar" onClick={openModal}>
          <p className="search-placeholder">
            <span className="checked">{selectedPeople}</span> 이서,{" "}
            <span className="checked"> {formattedTime}</span> 이후에,{" "}
            <span className="checked">{selectedLocation}</span>{" "}
            {selectedLocation === "아무데서나" ? "" : ` 주변에서`}
          </p>
          <img
            src="/images/arrow-down.png"
            alt="Dropdown Arrow"
            className="dropdown-image"
          />
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              {/* 인원 섹션 */}
              <div className="modal-section">
                <h3>인원</h3>
                <div className="modal-options">
                  <button
                    className={`option-button ${
                      selectedPeople === "1명" ? "active" : ""
                    }`}
                    onClick={() => handlePeopleChange("1명")}
                  >
                    1명
                  </button>

                  <button
                    className={`option-button ${
                      selectedPeople === "2명" ? "active" : ""
                    }`}
                    onClick={() => handlePeopleChange("2명")}
                  >
                    2명
                  </button>
                  <button
                    className={`option-button ${
                      selectedPeople === "3명" ? "active" : ""
                    }`}
                    onClick={() => handlePeopleChange("3명")}
                  >
                    3명
                  </button>
                  <button
                    className={`option-button ${
                      selectedPeople === "4명" ? "active" : ""
                    }`}
                    onClick={() => handlePeopleChange("4명")}
                  >
                    4명
                  </button>
                  <button
                    className={`option-button ${
                      selectedPeople === "5명 이상" ? "active" : ""
                    }`}
                    onClick={() => handlePeopleChange("5명 이상")}
                  >
                    5명 이상
                  </button>
                </div>
              </div>

              {/* 시각 섹션 */}
              <div className="modal-section">
                <h3>시각</h3>
                <div className="time-selection">
                  <select
                    className="time-dropdown"
                    value={selectedHour} // 상태와 바인딩
                    onChange={handleHourChange}
                  >
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                  시
                  <select
                    className="time-dropdown"
                    value={selectedMinute} // 상태와 바인딩
                    onChange={handleMinuteChange}
                  >
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i} value={i * 5}>
                        {i * 5}
                      </option>
                    ))}
                  </select>
                  분
                  <select
                    className="time-dropdown"
                    value={selectedPeriod} // 상태와 바인딩
                    onChange={handlePeriodChange}
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>
              </div>

              {/* 출발 위치 섹션 */}
              <div className="modal-section">
                <h3>출발 위치</h3>
                <div className="location-selection">
                  <select
                    className="location-dropdown"
                    value={selectedLocation} // 상태와 바인딩
                    onChange={(e) => handleLocationChange(e.target.value)}
                  >
                    <option value="아무데서나">아무데서나</option>
                    <option value="게페르트 남덕우 경제관(GN관)">
                      게페르트 남덕우 경제관(GN관)
                    </option>
                    <option value="곤자가 국제학사(GH)">
                      곤자가 국제학사(GH)
                    </option>
                    <option value="하비에르관(X관)">하비에르관(X관)</option>
                    <option value="김대건관(K관)">김대건관(K관)</option>
                    <option value="떼이야르관(TE관)">떼이야르관(TE관)</option>
                    <option value="가브리엘관(GA관)">가브리엘관(GA관)</option>
                    <option value="마태오관(MA관)">마태오관(MA관)</option>
                    <option value="바오로 경영관(MA관)">
                      바오로 경영관(MA관)
                    </option>
                    <option value="정하상관(J관)">정하상관(J관)</option>
                    <option value="다산관(D관)">다산관(J관)</option>
                    <option value="리찌과학관(R관)">리찌과학관(R관)</option>
                    <option value="리찌별관(RA관)">리찌별관(RA관)</option>
                    <option value="아담샬관(AS관)">아담샬관(AS관)</option>
                  </select>
                </div>
              </div>

              {/* 저장하기 버튼 */}
              <button
                className="save-button"
                onClick={() => {
                  closeModal(); // 모달 닫기
                  // 선택한 값 상태는 유지되므로 별도로 초기화하지 않음
                }}
              >
                저장하기
              </button>
            </div>
          </div>
        )}

        {!searching && (
          <div className="keyword-search-bar">
            <input
              type="text"
              placeholder="ex) 줌공, 콘센트, 팀플..."
              className="search-input"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <img
              src="/images/search.png"
              alt="search-image"
              className="search-image"
              onClick={handleSearchClick} // 돋보기 클릭 이벤트
            />
          </div>
        )}

        {/* 동적으로 생성된 버튼들 */}
        <div className="tags-container">
          {tags.map((tag, index) => (
            <button
              key={index}
              className="tag-button"
              onClick={() => handleTagRemove(tag)} // 태그 제거
            >
              {tag} <span className="remove-icon">⊗</span>
            </button>
          ))}
        </div>
      </div>

      {/* Keywords Section */}
      {!searching && (
        <section className="keywords-section">
          <div className="keywords-container">
            {["과제", "팀플", "스터디", "휴식", "줌수업"].map((keyword) => (
              <div key={keyword} className="keyword-wrapper">
                <button
                  className={`keyword-button ${
                    activeKeyword === keyword ? "primary" : ""
                  }`}
                  onClick={() => handleKeywordClick(keyword)}
                >
                  {keyword}
                </button>

                {activeKeyword === keyword && (
                  <div className="keyword-detail-button">
                    <div className="corner-dashed-line"></div>
                    {activeKeywordDetails[keyword].map((detail) => (
                      <button
                        key={detail}
                        className="keyword-detail"
                        onClick={() => handleKeywordDetailClick(detail)} // 태그로 이동
                      >
                        {detail} <span className="icon"> ⊕</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {searching && (
        <div className={`search-loading ${loadingVisible ? "show" : ""}`}>
          <p>
            키워드에 해당하는 장소를
            <br />
            찾아보는 중이에요...
          </p>
          <div className="spinner"></div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">Sogang University</footer>
    </div>
  );
}

export default MainPage;
