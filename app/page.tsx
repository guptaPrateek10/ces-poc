import Image from "next/image";
import Container from "./components/container/page";
import Heading from "./components/heading/page";
import ProductTable from "./components/ProductTable";

export default function Home() {
  return (
    <Container>
      <Heading title={"Product Table"} />
      <ProductTable/>
    </Container>
  );
}
