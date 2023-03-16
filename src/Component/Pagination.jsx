
import React from 'react';

const Pagination = ({totalPost , postsPerpage , setCurrentpage}) => {
let pages = []

for(let i = 1;i<=Math.ceil(totalPost/postsPerpage);i++){
  pages.push(i)
}

// console.log(pages)
return (
  <div style={{display:"flex",gap:"10px",justifyContent:"center"}}>
    {pages.map((page,index)=>{
return <button key={index} onClick={()=>setCurrentpage(page)}>{page}</button>
    })}
  </div>
)
}

export default Pagination;