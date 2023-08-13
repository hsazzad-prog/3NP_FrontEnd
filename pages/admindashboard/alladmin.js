import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import NavBar from "../Layout/navbar";
import dynamic from 'next/dynamic'
const Layout = dynamic(() => import('../Layout/layout'), {
  ssr: false,
})
const Title = dynamic(() => import('../Layout/title'), {
  ssr: false,
})

export default function AllAdmin() {
    const [jsonData, setJsonData] = useState(null);
    
    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
             const response = await axios.get(process.env.NEXT_PUBLIC_API_ENDPOINT + "/admin/index",
             { 
             withCredentials: true
                   }
             );
            const jsonData = response.data;
            console.log(jsonData)
            setJsonData(jsonData);
        } catch (error) {
            console.error(error);
        }
    }

    const printArray = (jsonData) => {
        return (
            jsonData.map((item, index) => {
                return (

                    <div key={index}>
                        <Link href={"adminprofile/"+ item.id}>
                        <h3 className='text-ellipsis text-cyan-700'>
                                {item.name}
                                </h3>
                                </Link>
                    </div>
                );

            })
        );
    }

    return (

        <>
 <Title page="ALL Admin"> </Title>
  <Layout>
    <NavBar/>
   All Addmin Data lIsted below
            {jsonData != null &&
         
                  printArray(jsonData)
          
            }
</Layout>
        </>
    );
}

