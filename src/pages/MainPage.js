import React, { useState } from "react";
import "../styles/MainPage.css";

function MainPage() {
  /* Modal open 관련  */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  /* Modal open 관련  */
  const [inputValue, setInputValue] = useState(""); // 입력값 상태
  const [tags, setTags] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      if (!tags.includes(inputValue)) {
        setTags([...tags, inputValue]); // 새로운 버튼 추가
      }
      setInputValue(""); // 입력창 초기화
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

  const keywordDetails = {
    과제: ["노트북", "Wi-Fi", "콘센트"],
    팀플: ["넓은", "대화가능", "노트북"],
    스터디: ["조용한", "책상", "Wi-Fi"],
    휴식: ["빈백", "침대", "음료"],
    줌수업: ["프라이빗", "헤드셋"],
  };

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
            <span className="checked">1</span>명,{" "}
            <span className="checked"> 지금 바로 </span>,{" "}
            <span className="checked">아무데서나 </span>
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
              <h2>Search Options</h2>
              <ul>
                <li>
                  <span className="checked">1</span>명
                </li>
                <li>
                  <span className="checked">지금 바로</span>
                </li>
                <li>
                  <span className="checked">아무데서나</span>
                </li>
              </ul>
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
        )}

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
          />
        </div>

        {/* 동적으로 생성된 버튼들 */}
        <div className="tags-container">
          {tags.map((tag, index) => (
            <button
              key={index}
              className="tag-button"
              onClick={() => handleRemoveTag(tag)} // 버튼 제거
            >
              {tag} <span className="remove-icon">⊗</span>
            </button>
          ))}
        </div>
      </div>

      {/* Keywords Section */}
      <section className="keywords-section">
        <div className="keywords-container">
          {/* 각 키워드 버튼 */}
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
                  {keywordDetails[keyword].map((detail) => (
                    <button key={detail} className="keyword-detail">
                      {detail} <span className="icon"> ⊕</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">Sogang University</footer>
    </div>
  );
}

export default MainPage;
