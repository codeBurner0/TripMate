import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Loader from '../components/Loader';
import Error from '../components/Error';
import Success from '../components/Success'

function RegisterScreen() {
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [cpassword, setcpassword] = useState('')

  const [loading, setloading] = useState(false);
  const [error, seterror] = useState()
  const [success, setsuccess] = useState()

  async function register() {
    if (password === cpassword) {
      const user = {
        name,
        email,
        password,
        cpassword
      }
      try {
        setloading(true)
        const result = (await axios.post('http://localhost:5000/api/users/register', user)).data;
        console.log(result)
        setloading(false)
        setsuccess(true)

        setname('')
        setemail('')
        setpassword('')
        setcpassword('')

      }
      catch (e) {

        console.log(e)
        setloading(false)
        seterror(true)
      }
    }
    else {
      alert('Password not matched')
    }
  }

  return (

      <div className='landing2' style={{marginRight:'0px' }}  >

        {loading && (<Loader />)}
        {error && (<Error />)}

        <div className="row justify-content-center ">
          <div className="col-md-5">
            {success && (<Success message='Registration success' />)}
            <div className='bs mt-5' >
              <p className='cee'>Register</p>
              <input type="text" className="form-control" placeholder="name" value={name} onChange={(e) => { setname(e.target.value) }} />
              <input type="text" className="form-control" placeholder="email" value={email} onChange={(e) => { setemail(e.target.value) }} />
              <input type="text" className="form-control" placeholder="password" value={password} onChange={(e) => { setpassword(e.target.value) }} />
              <input type="text" className="form-control" placeholder="confirm password" I value={cpassword} onChange={(e) => { setcpassword(e.target.value) }} />
              <div className='cee'>
                <button className='btn btn-primary mt-3' onClick={register}> Register </button>
              </div>
            </div>

          </div>
        </div>
      </div>

  )
}

export default RegisterScreen
