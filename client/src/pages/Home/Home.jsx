import Hero from "../../components/Hero/Hero";
import ShopByCategory from "../../components/ShopByCategory/ShopByCategory";
import FeaturedProduct from "../../components/FeaturedProduct/FeaturedProduct";
import Customer from "../../components/CustomerTestimonials/Customer";
import { useSelector } from "react-redux";
import Spinner from "../../components/Spinner/Spinner";
import { selectGlobalLoading } from "../../redux/slices/pageLoadingSlice";

function Home() {
  const isLoading = useSelector(selectGlobalLoading);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <Hero />
      <ShopByCategory />
      <FeaturedProduct />
      <Customer />
    </>
  );
}

export default Home;
