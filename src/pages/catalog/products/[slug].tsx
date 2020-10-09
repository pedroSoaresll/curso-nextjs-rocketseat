import { useRouter } from "next/router";

// import { Container } from './styles';

export default function Product() {
  const router = useRouter();

  return <h1>{router.query.slug}</h1>;
}
