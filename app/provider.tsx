"use client"
import React, { use, useEffect, useState } from 'react'
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import { User } from 'lucide-react';
import { UserDetailContext } from '@/context/UserDetailContext';

const Provider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const {user} = useUser();
  const [userDetails, setUserDetails] = useState<any>();
  useEffect(()=>{
    user && CreateNewUser();
  },[ user ])
  const CreateNewUser = async() => {
    const result = await axios.post('/api/users', {});
    setUserDetails(result.data?.user);
  }
  return (
    <div>
      <UserDetailContext.Provider value={{userDetails, setUserDetails}}>
      {children}
      </UserDetailContext.Provider>
    </div>
  )
}

export default Provider