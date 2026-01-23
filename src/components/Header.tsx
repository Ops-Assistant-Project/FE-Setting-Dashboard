import { Container } from "react-bootstrap";

const Header = () => {
  return (
    <header className="border-bottom bg-white" style={{ height: 56 }}>
      <Container
        fluid
        className="h-100 d-flex align-items-center justify-content-between px-4"
      >
        <div className="fw-bold fs-5">
          <span className="logo-text">Innoms</span>
        </div>

        <div className="text-secondary"></div>
      </Container>
    </header>
  );
};

export default Header;
