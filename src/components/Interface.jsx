import Main from "./Main"; //check not pulling in wrong main file
import Header from "./Header";
import Footer from "./Footer";

const Interface = () => {
  //   console.log(practitionerData);

  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Main />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Interface;
