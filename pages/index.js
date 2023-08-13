import Link from "next/link";
import dynamic from "next/dynamic";
const Layout = dynamic(() => import('./Layout/layout'), {
  ssr: false,
})
const Title = dynamic(() => import('./Layout/title'), {
  ssr: false,
})



export default function Home( ) {
  return (
    <>
    
    <Title page="Home"> </Title>
<Layout>

    <br></br>
    <br></br>
<h1> Hello world</h1>

<div className="bg-neutral text-white p-10">
 This is my component!
 </div>
 <br></br>
    <br></br>
    </Layout>
    </>
  )
}





