import React, { useState } from "react";
import "../styles/MainPage.css";

function MainPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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

        <div className="search-bar">
          <input
            type="text"
            placeholder="ex) 줌공, 콘센트, 팀플..."
            className="search-input"
          />
        </div>
      </div>

      {/* Keywords Section */}
      <section className="keywords-section">
        <h2 className="keywords-title">테마별 추천 키워드</h2>
        <div className="keywords-container">
          <button className="keyword-button primary">과제</button>
          <button className="keyword-button">팀플</button>
          <button className="keyword-button">스터디</button>
          <button className="keyword-button">휴식</button>
          <button className="keyword-button">줌수업</button>
        </div>
        <div className="keywords-container">
          <button className="keyword-button">노트북</button>
          <button className="keyword-button">와이파이</button>
          <button className="keyword-button">콘센트</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">Sogang University</footer>
    </div>
  );
}

export default MainPage;
