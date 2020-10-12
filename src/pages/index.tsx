import { GetServerSideProps } from "next";
import { Title } from "../styles/pages/Home";

interface IProduct {
  id: string;
  title: string;
}

interface HomeProps {
  recommendedProducts: IProduct[];
}

export default function Home({ recommendedProducts }: HomeProps) {
  return (
    <div>
      <section>
        <Title>Products</Title>

        <ul>
          {recommendedProducts.map((product) => {
            return <li key={product.id}>{product.title}</li>;
          })}
        </ul>
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const data = await fetch("http://localhost:3333/recommended").then<
    IProduct[]
  >((response) => response.json());

  return {
    props: {
      recommendedProducts: data,
    },
  };
};
