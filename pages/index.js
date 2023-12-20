import { useEffect } from "react";
import Navigation from "../components/navigation";
import SalesPages from "../components/salesPages";
import { useRouter } from "next/router";
import HeadName from "../components/headName";
import Footer from "../components/footer";

export default function Home() {
  const router = useRouter();
  const checkToken = async () => {
    const token = sessionStorage.getItem("token");
    try {
      if (!token) {
        router.push("/login");
      } else {
        console.log("authorized");
      }
    } catch (error) {
      console.log("masuk ke error");
      router.push("/login");
    }
  };

  useEffect(() => {
    checkToken();
  }, []);
  return (
    <div>
      <HeadName title="sales records" />
      <Navigation />
      <SalesPages />
      <Footer />
    </div>
  );
}
