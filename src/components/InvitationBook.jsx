import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import HTMLFlipBook from 'react-pageflip';

// Theme colors và fonts
const theme = {
  colors: {
    seasalt: '#FAF9F9',
    seasalt2: '#FAFAFB',
    frenchGray: '#D1CACF',
    mimiPink: '#F9D6DA',
    wenge: '#7B6670',
  },
  fonts: {
    primary: "'Playfair Display', serif",
    secondary: "'Poppins', sans-serif",
  },
  shadows: {
    soft: '0 4px 20px rgba(123, 102, 112, 0.1)',
    medium: '0 8px 30px rgba(123, 102, 112, 0.15)',
    strong: '0 12px 40px rgba(123, 102, 112, 0.2)',
  }
};

// CSS cho HTMLFlipBook - giả lập
const flipBookStyles = `
  .invitation-flipbook {
    position: relative !important;
    width: 100% !important;
    height: 100% !important;
    overflow: visible !important;
  }
  .invitation-flipbook .page {
    position: absolute !important;
    width: 100% !important;
    height: 100% !important;
    top: 0 !important;
    left: 0 !important;
    background: transparent !important;
    z-index: 1;
    box-sizing: border-box;
  }
`;

const BookContainer = styled.div`
  width: 420px;
  height: 600px;
  margin: 0 auto;
  position: relative;
  @media (max-width: 768px) {
    width: 98vw;
    height: 70vw;
    min-width: 220px;
    min-height: 320px;
  }
  @media (max-width: 480px) {
    width: 95vw;
    height: 75vw;
    min-width: 200px;
    min-height: 280px;
  }
  @media (max-width: 360px) {
    width: 92vw;
    height: 80vw;
    min-width: 180px;
    min-height: 250px;
  }
`;

const PageStyled = styled.div`
  width: 100%;
  height: 100%;
  background: ${props => props.theme.colors.seasalt};
  border-radius: 18px;
  box-shadow: 0 4px 32px 0 rgba(249,214,218,0.10), 0 2px 8px 0 rgba(123,102,112,0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 32px 32px 32px;
  text-align: center;
  border: 2px solid ${props => props.theme.colors.frenchGray};
  position: relative;
  @media (max-width: 768px) {
    padding: 18px 6vw 12px 6vw;
    border-radius: 10px;
    border: 1.5px solid ${props => props.theme.colors.frenchGray};
  }
  @media (max-width: 480px) {
    padding: 12px 4vw 8px 4vw;
    border-radius: 8px;
    border: 1px solid ${props => props.theme.colors.frenchGray};
  }
  @media (max-width: 360px) {
    padding: 8px 3vw 6px 3vw;
    border-radius: 6px;
  }
`;

const PageContent = styled.div`
  width: 100%;
  font-family: ${props => props.theme.fonts.primary};
  color: ${props => props.theme.colors.wenge};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h1 {
    font-size: 2.2rem;
    margin-bottom: 12px;
    color: #d94f6a;
    font-family: 'Playfair Display', serif;
    font-weight: 700;
    letter-spacing: 1px;
    @media (max-width: 768px) {
      font-size: 1.8rem;
      margin-bottom: 10px;
      letter-spacing: 0.5px;
    }
    @media (max-width: 480px) {
      font-size: 1.5rem;
      margin-bottom: 8px;
    }
    @media (max-width: 360px) {
      font-size: 1.3rem;
      margin-bottom: 6px;
    }
  }
  h2 {
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: #d94f6a;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    @media (max-width: 768px) {
      font-size: 1.3rem;
      margin-bottom: 8px;
    }
    @media (max-width: 480px) {
      font-size: 1.1rem;
      margin-bottom: 6px;
    }
    @media (max-width: 360px) {
      font-size: 1rem;
      margin-bottom: 5px;
    }
  }
  .guest {
    color: #d94f6a;
    font-size: 1.3rem;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    margin-bottom: 8px;
    @media (max-width: 768px) {
      font-size: 1.1rem;
      margin-bottom: 6px;
    }
    @media (max-width: 480px) {
      font-size: 1rem;
      margin-bottom: 5px;
    }
    @media (max-width: 360px) {
      font-size: 0.9rem;
      margin-bottom: 4px;
    }
  }
  .script {
    font-family: 'Dancing Script', cursive;
    font-size: 2.1rem;
    color: #d94f6a;
    margin-bottom: 8px;
    font-weight: 700;
    @media (max-width: 768px) {
      font-size: 1.8rem;
      margin-bottom: 6px;
    }
    @media (max-width: 480px) {
      font-size: 1.5rem;
      margin-bottom: 5px;
    }
    @media (max-width: 360px) {
      font-size: 1.3rem;
      margin-bottom: 4px;
    }
  }
  .desc {
    font-size: 1.1rem;
    color: #7B6670;
    margin-bottom: 8px;
    @media (max-width: 768px) {
      font-size: 0.95rem;
      margin-bottom: 6px;
    }
    @media (max-width: 480px) {
      font-size: 0.85rem;
      margin-bottom: 5px;
    }
    @media (max-width: 360px) {
      font-size: 0.8rem;
      margin-bottom: 4px;
    }
  }
`;

const Avatar = styled.img`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  object-fit: cover;
  border: 5px solid #F9D6DA;
  margin-bottom: 18px;
  box-shadow: 0 2px 12px 0 #f9d6da55;
  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
    border: 4px solid #F9D6DA;
    margin-bottom: 12px;
  }
  @media (max-width: 480px) {
    width: 80px;
    height: 80px;
    border: 3px solid #F9D6DA;
    margin-bottom: 10px;
  }
  @media (max-width: 360px) {
    width: 70px;
    height: 70px;
    border: 2px solid #F9D6DA;
    margin-bottom: 8px;
  }
`;

const DownloadButton = styled.button`
  background: linear-gradient(135deg, ${props => props.theme.colors.mimiPink}, ${props => props.theme.colors.frenchGray});
  border: none;
  border-radius: 25px;
  padding: 15px 30px;
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 16px;
  font-weight: bold;
  color: ${props => props.theme.colors.wenge};
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${props => props.theme.shadows.medium};
  margin-top: 20px;
  &:hover {
    transform: translateY(-3px);
    box-shadow: ${props => props.theme.shadows.strong};
  }
  @media (max-width: 768px) {
    padding: 12px 24px;
    font-size: 14px;
    margin-top: 15px;
    border-radius: 20px;
  }
  @media (max-width: 480px) {
    padding: 10px 20px;
    font-size: 12px;
    margin-top: 12px;
    border-radius: 18px;
  }
  @media (max-width: 360px) {
    padding: 8px 16px;
    font-size: 11px;
    margin-top: 10px;
    border-radius: 15px;
  }
`;

const InviteImage = styled.img`
  width: 90%;
  max-width: 420px;
  border-radius: 18px;
  margin: 0 auto 18px auto;
  box-shadow: 0 4px 32px 0 #f9d6da33;
  border: 2px solid #F9D6DA;
  @media (max-width: 768px) {
    border-radius: 12px;
    margin: 0 auto 12px auto;
    border: 1.5px solid #F9D6DA;
  }
  @media (max-width: 480px) {
    border-radius: 10px;
    margin: 0 auto 10px auto;
    border: 1px solid #F9D6DA;
  }
  @media (max-width: 360px) {
    border-radius: 8px;
    margin: 0 auto 8px auto;
  }
`;

const NavigationContainer = styled.div`
  position: absolute;
  bottom: -60px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 20px;
  z-index: 10;
  @media (max-width: 768px) {
    bottom: -50px;
    gap: 15px;
  }
  @media (max-width: 480px) {
    bottom: -45px;
    gap: 12px;
  }
  @media (max-width: 360px) {
    bottom: -40px;
    gap: 10px;
  }
`;

const NavButton = styled.button`
  background: linear-gradient(135deg, ${props => props.theme.colors.mimiPink}, ${props => props.theme.colors.frenchGray});
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${props => props.theme.shadows.medium};
  color: ${props => props.theme.colors.wenge};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.strong};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
  
  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
    font-size: 18px;
  }
  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    font-size: 16px;
  }
  @media (max-width: 360px) {
    width: 35px;
    height: 35px;
    font-size: 14px;
  }
`;

const iconHeart = '💖';
const iconMap = '📍';
const iconClock = '⏰';
const iconPhone = '📱';
const iconMail = '✉️';
const iconZalo = '💬';

const InvitationBook = () => {
  const bookRef = useRef();
  
  const goToPrevPage = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipPrev();
    }
  };

  const goToNextPage = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipNext();
    }
  };

  return (
    <BookContainer>
      <HTMLFlipBook
        width={400}
        height={500}
        minWidth={320}
        minHeight={400}
        maxWidth={600}
        maxHeight={800}
        size="stretch"
        maxShadowOpacity={0.3}
        showCover={false}
        mobileScrollSupport={true}
        ref={bookRef}
        style={{ margin: '0 auto', borderRadius: 18 }}
        className="invitation-flipbook"
      >
        {/* Trang 1 */}
        <PageStyled>
          <PageContent>
            <span className="icon">{iconHeart}</span>
            <h1>LỄ TỐT NGHIỆP</h1>
            <div className="desc">Thân mời bạn:</div>
            <div className="guest">Bảo Bùi</div>
            <div className="desc">đến tham dự buổi lễ tốt nghiệp cùng chúng mình!</div>
          </PageContent>
        </PageStyled>
        {/* Trang 2 */}
        <PageStyled>
          <PageContent>
            <Avatar src="/avatar.jpg" alt="Hà Vụng Liên" onError={e => e.target.style.display='none'} />
            <div className="script">Hà Vụng Liên</div>
            <div className="desc">Sinh viên tốt nghiệp</div>
          </PageContent>
        </PageStyled>
        {/* Trang 3 */}
        <PageStyled>
          <PageContent>
            <span className="icon">{iconMap}</span>
            <h2>Địa điểm</h2>
            <div className="desc">Trường Đại học Sư phạm TP. Hồ Chí Minh</div>
            <div className="desc">280 An Dương Vương, Phường 4, Quận 5</div>
          </PageContent>
        </PageStyled>
        {/* Trang 4 */}
        <PageStyled>
          <PageContent>
            <span className="icon">{iconClock}</span>
            <h2>Thời gian</h2>
            <div className="desc">9h sáng, Thứ ba</div>
            <div className="desc">15/07/2025</div>
          </PageContent>
        </PageStyled>
        {/* Trang 5 */}
        <PageStyled>
          <PageContent>
            <span className="icon">{iconPhone}</span>
            <h2>Liên hệ</h2>
            <div className="desc">SĐT: 0902 473 441</div>
            <div className="desc">Zalo: havuonglien</div>
            <div className="desc">Email: havuonglien@example.com</div>
          </PageContent>
        </PageStyled>
        {/* Trang 6 - card-invite.jpg */}
        <PageStyled>
          <PageContent>
            <InviteImage src="/card-invite.jpg" alt="Thiệp mời tốt nghiệp" />
            <DownloadButton onClick={() => {
              const link = document.createElement('a');
              link.href = '/card-invite.jpg';
              link.download = 'card-invite.jpg';
              link.click();
            }}>
              📥 Tải thư mời
            </DownloadButton>
          </PageContent>
        </PageStyled>
      </HTMLFlipBook>
      
      <NavigationContainer>
        <NavButton onClick={goToPrevPage} title="Trang trước">
          ◀
        </NavButton>
        <NavButton onClick={goToNextPage} title="Trang sau">
          ▶
        </NavButton>
      </NavigationContainer>
    </BookContainer>
  );
};

export default InvitationBook;