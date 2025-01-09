import React from 'react'

const Login = () => {
  return (
    <div className='bg-gradient-to-r from-cyan-500 to-blue-500 min-w-[100vw] min-h-[100vh] flex items-center justify-center'>
        <div className='backdrop-blur-sm bg-white/30 w-[350px] h-[45px] rounded-[10px]'>
            <div className='flex items-center gap-[2px]'>
                <div className='flex-1 border-b-[2px] border-b-[#000]'>
                    <p className='text-center'>Login</p>
                </div>
                <div className='flex-1 border-b-[2px] border-b-[#000]'><p>Register</p></div>
            </div>
        </div>
    </div>
  )
}

export default Login