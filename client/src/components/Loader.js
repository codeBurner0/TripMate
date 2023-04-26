import React,{ useState } from 'react'
import HashLoader from "react-spinners/HashLoader";

function Loader() {

    let [loading, setLoading] = useState(true);
    
      
  return (
    <div style={{marginTop:'20px',marginLeft:'50%',marginRight:'40%'}}>
     <div >
      <HashLoader
        color='#000'
        loading={loading}
        cssOverride=''
        size={80}
        cont
        // aria-label="Loading Spinner"
        // data-testid="loader"
      />
    </div>
    </div>
  )
}

export default Loader
