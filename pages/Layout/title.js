import Head from "next/head";


export default function Title(props){

    return (
        <>
        <Head>
            <title>{props.page ?  props.page : <p>ok</p>  } - Page</title>
        </Head>
      
        </>
    )
    
    }