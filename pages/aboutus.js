import Link from "next/link";
import Layout from "./Layout/layout";
import Title from "./Layout/title";
export default function About() {
    return (
      <>
          <Title page="About"> </Title>
      <Layout>
   About
   <br></br>
   <Link href="/">Home</Link>


   <br></br>
    <br></br>
    <a href="/">Home</a>
    </Layout>
      </>
    )
  }
  