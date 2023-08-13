import Link from "next/link"

export default function Header(){

return (
    <>
 


<div className="bg-neutral navbar text-neutral-content">
  <div className="navbar-start">
  
    <Link href="/" className=" normal-case text-xl ">3NP</Link> 
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li> <Link href="/"> Home </Link></li>
      
      <li> <Link href="aboutus"> About </Link></li>
    </ul>
  </div>
  <div className="navbar-end">
  <ul className="menu menu-horizontal px-1">
      <li> <Link className="" href="loginform" > Sign In </Link> </li>
      
      <li> <Link className="" href="registrationform" > Sign Up </Link></li>
    </ul>
 
  </div>
</div>


       </>
)

}