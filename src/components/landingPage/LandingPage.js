import "./LandingPage.scss";
import { Link } from "react-router-dom";
import CulturalFacts from "../culturalFacts/CulturalFacts";

const LandingPage = () => {
  return (
    <div className="landingPage">
      <CulturalFacts />
      <div className="landingPage__featured">
        <h1>Featured Businesses</h1>
        <section>
          <div>
            <h4>Slutty Vegan, your go to place for plant-based vegan food!</h4>
            <Link to="/businesses/51">
              <img
                src="https://sluttyveganatl.com/wp-content/uploads/2020/03/SluttyVegan-DarkLogo.png"
                alt="slutty vegan restaurant"
              />
            </Link>
          </div>
          <div>
            <h4>Chelle's Hair Closet, an online boutique for luxury hair!</h4>
            <Link to="/">
              <img
                src="https://cdn.shopify.com/s/files/1/0582/8129/6044/products/IMG_6927.jpg?v=1680658083/project/avatar/3880238/Temp.png"
                alt="chelle's"
              />
            </Link>
          </div>
          <div>
            <h4>
              Bobby's, located In Queens Has Been Open For More Than 30 Years!
            </h4>
            <Link to="/">
              <img
                src="https://lh3.googleusercontent.com/p/AF1QipPxOuirfJ6-ThGsBmPt6x9x7GStuiyTKS0ZnrE=s1360-w1360-h1020"
                alt="bobby's restaurant"
              />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
