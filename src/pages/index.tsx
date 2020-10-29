import { GetServerSideProps } from "next";
import { Title } from "~/styles/pages/Home";

interface IProduct {
  id: string;
  title: string;
}

interface HomeProps {
  recommendedProducts: IProduct[];
}

export default function Home({ recommendedProducts }: HomeProps) {
  async function handleSum() {
    const math = (await import('~/lib/math')).default
    const sum = math.sum(2, 5)
    console.log('sum: ', sum)
  } 

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

      <button onClick={handleSum}>Sum!</button>
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
