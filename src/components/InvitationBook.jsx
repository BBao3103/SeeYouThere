import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import HTMLFlipBook from 'react-pageflip';
import {  FaMapMarkerAlt, FaClock, FaPhoneAlt, FaGraduationCap, FaGift } from 'react-icons/fa';




const BookContainer = styled.div`
  width: 420px;
  height: 600px;
  min-height: 100vh;
  margin: 0 auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: none;
  @media (max-width: 768px) {
    width: 98vw;
    height: 70vw;
    min-width: 220px;
    min-height: 100vh;
    justify-content: center;
    padding-top: 0;
  }
  @media (max-width: 480px) {
    width: 95vw;
    height: 75vw;
    min-width: 200px;
    min-height: 100vh;
    justify-content: center;
    padding-top: 0;
  }
  @media (max-width: 360px) {
    width: 92vw;
    height: 80vw;
    min-width: 180px;
    min-height: 100vh;
    justify-content: center;
    padding-top: 0;
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
    padding: 32px 10vw 24px 10vw;
    border-radius: 10px;
    border: 1.5px solid ${props => props.theme.colors.frenchGray};
  }
  @media (max-width: 480px) {
    padding: 24px 7vw 16px 7vw;
    border-radius: 8px;
    border: 1px solid ${props => props.theme.colors.frenchGray};
  }
  @media (max-width: 360px) {
    padding: 16px 4vw 10px 4vw;
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
  padding: 0;
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
      font-size: 1.1rem;
      margin-bottom: 10px;
    }
    @media (max-width: 480px) {
      font-size: 1rem;
      margin-bottom: 10px;
    }
    @media (max-width: 360px) {
      font-size: 0.95rem;
      margin-bottom: 8px;
    }
  }
  @media (max-width: 768px) {
    padding: 0 2vw;
  }
  @media (max-width: 480px) {
    padding: 0 4vw;
  }
  @media (max-width: 360px) {
    padding: 0 2vw;
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
  margin-bottom: 80px;
  &:hover {
    transform: translateY(-3px);
    box-shadow: ${props => props.theme.shadows.strong};
  }
  @media (max-width: 768px) {
    padding: 12px 24px;
    font-size: 14px;
    margin-top: 15px;
    margin-bottom: 60px;
    border-radius: 20px;
  }
  @media (max-width: 480px) {
    padding: 10px 20px;
    font-size: 12px;
    margin-top: 12px;
    margin-bottom: 80px;
    border-radius: 18px;
  }
  @media (max-width: 360px) {
    padding: 8px 16px;
    font-size: 11px;
    margin-top: 10px;
    margin-bottom: 90px;
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
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 36px 0 0 0;
  position: static;
  z-index: 10;
  @media (max-width: 768px) {
    gap: 15px;
    margin: 48px 0 0 0;
  }
  @media (max-width: 480px) {
    gap: 12px;
    margin: 60px 0 0 0;
  }
  @media (max-width: 360px) {
    gap: 10px;
    margin: 70px 0 0 0;
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

// Trang trí thêm cho từng trang
const Ribbon = styled.div`
  width: 80px;
  height: 18px;
  background: linear-gradient(90deg, #f9d6da 0%, #d1cacf 100%);
  border-radius: 12px;
  color: #fff;
  font-size: 0.9rem;
  font-family: 'Poppins', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 10px auto;
  box-shadow: 0 2px 8px 0 #f9d6da33;
`;

const Flower = styled.div`
  position: absolute;
  top: 18px;
  right: 24px;
  font-size: 2.2rem;
  color: #f9d6da;
  opacity: 0.7;
  pointer-events: none;
`;

const Bow = styled.div`
  width: 38px;
  height: 24px;
  background: none;
  margin: 0 auto 8px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  &::before, &::after {
    content: '';
    display: block;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #f9d6da;
    position: relative;
    margin: 0 2px;
    opacity: 0.7;
  }
  &::before { left: 0; }
  &::after { right: 0; }
`;

const CapIcon = styled(FaGraduationCap)`
  color: #d94f6a;
  font-size: 2.2rem;
  margin-bottom: 8px;
`;

const GiftIcon = styled(FaGift)`
  color: #d1cacf;
  font-size: 2.2rem;
  margin-bottom: 8px;
`;

const PaginationDots = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-width: 60px;
`;
const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${props => props.active ? '#d94f6a' : '#d1cacf'};
  opacity: ${props => props.active ? 1 : 0.5};
  transition: background 0.2s, opacity 0.2s;
`;

const NameScript = styled.div`
  font-family: 'Dancing Script', cursive;
  font-size: 2.3rem;
  color: #d94f6a;
  font-weight: 700;
  margin-bottom: 8px;
  letter-spacing: 1px;
  text-shadow: 0 2px 8px #f9d6da55;
`;

// Lấy tên từ URL
function getGuestName() {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');
    return name ? decodeURIComponent(name) : 'Bạn';
  }
  return 'Bạn';
}

const NUM_PAGES = 6;

const InvitationBook = () => {
  const bookRef = useRef();
  const [currentPage, setCurrentPage] = useState(0);
  const guestName = getGuestName();
  const cardInviteUrl = `${import.meta.env.BASE_URL}card-invite.png`;
  const avatarUrl = `${import.meta.env.BASE_URL}avatar.jpg`;

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

  // Lắng nghe sự kiện lật trang
  const onFlip = (e) => {
    setCurrentPage(e.data);
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
        onFlip={onFlip}
      >
        {/* Trang 1: Lời mời */}
        <PageStyled>
          <Flower>🌸</Flower>
          <Ribbon>Mời bạn</Ribbon>
          <PageContent>
            <CapIcon />
            <h1>LỄ TỐT NGHIỆP</h1>
            <div className="desc">Thân mời bạn:</div>
            <div className="guest">{guestName}</div>
            <div className="desc">Hãy cùng mình lưu lại khoảnh khắc ý nghĩa này nhé!</div>
          </PageContent>
        </PageStyled>
        {/* Trang 2: Nhân vật */}
        <PageStyled>
          <Bow />
          <PageContent>
            <Avatar src={avatarUrl} alt="Hà Vụng Liên" onError={e => e.target.style.display='none'} />
            <NameScript>Hà Vụng Liên</NameScript>
            <div className="desc">Tốt nghiệp - Một hành trình khép lại, một hành trình mới bắt đầu!</div>
          </PageContent>
        </PageStyled>
        {/* Trang 3: Địa điểm */}
        <PageStyled>
          <PageContent>
            <FaMapMarkerAlt style={{ color: '#d94f6a', fontSize: '2rem', marginBottom: 8 }} />
            <h2>Địa điểm tổ chức</h2>
            <div className="desc">Trường Đại học Sư phạm TP. Hồ Chí Minh</div>
            <div className="desc">280 An Dương Vương, Phường 4, Quận 5</div>
            <div style={{ marginTop: 10, color: '#d94f6a', fontSize: 18 }}>🎈 Hẹn gặp bạn tại đây! 🎈</div>
          </PageContent>
        </PageStyled>
        {/* Trang 4: Thời gian */}
        <PageStyled>
          <PageContent>
            <FaClock style={{ color: '#d94f6a', fontSize: '2rem', marginBottom: 8 }} />
            <h2>Thời gian</h2>
            <div className="desc">9h sáng, Thứ ba</div>
            <div className="desc">15/07/2025</div>
            <div style={{ marginTop: 10, color: '#d94f6a', fontSize: 18 }}>⏳ Đừng quên lưu lịch nhé!</div>
          </PageContent>
        </PageStyled>
        {/* Trang 5: Liên hệ */}
        <PageStyled>
          <PageContent>
            <FaPhoneAlt style={{ color: '#d94f6a', fontSize: '2rem', marginBottom: 8 }} />
            <h2>Liên hệ</h2>
            <div className="desc">Nếu cần hỗ trợ, hãy gọi cho mình nhé!</div>
            <div className="desc" style={{ fontWeight: 600, fontSize: 18 }}>0902 473 441</div>
            <div style={{ marginTop: 10, color: '#d94f6a', fontSize: 16, fontWeight: 600 }}>💬 Rất mong được gặp bạn!</div>
          </PageContent>
        </PageStyled>
        {/* Trang 6: Quà tặng/Ảnh */}
        <PageStyled>
          <PageContent>
            <InviteImage src={cardInviteUrl} alt="Thiệp mời tốt nghiệp" />
            <DownloadButton onClick={() => {
              const link = document.createElement('a');
              link.href = cardInviteUrl;
              link.download = 'card-invite.png';
              link.click();
            }}>
              🎁 Tải thư mời về máy
            </DownloadButton>
          </PageContent>
        </PageStyled>
      </HTMLFlipBook>
      <NavigationContainer>
        <NavButton onClick={goToPrevPage} title="Trang trước">
          ◀
        </NavButton>
        <PaginationDots>
          {Array.from({ length: NUM_PAGES }).map((_, idx) => (
            <Dot key={idx} active={currentPage === idx} />
          ))}
        </PaginationDots>
        <NavButton onClick={goToNextPage} title="Trang sau">
          ▶
        </NavButton>
      </NavigationContainer>
    </BookContainer>
  );
};

export default InvitationBook;