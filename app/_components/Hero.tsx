"use client"

import { Button } from '@/components/ui/button'
import { SignInButton, useUser } from '@clerk/nextjs';
import axios from 'axios';
import { ArrowUp, HomeIcon, ImagePlus, Key, LayoutDashboard, Loader2Icon, User } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

const suggestion = [
  {
    label: 'Dashboard',
    prompt: 'Create an analytics dashboard to track customers and revenue data for a SaaS',
    icon: LayoutDashboard
  },
  {
    label: 'SignUp Form',
    prompt: 'Create a modern sign up form with email/password fields, Google and Github login options, and terms checkbox',
    icon: Key
  },
  {
    label: 'Hero',
    prompt: 'Create a modern header and centered hero section for a productivity SaaS. Include a badge for feature announcement, a title with a subtle gradient effect, subtitle, CTA, small social proof and an image.',
    icon: HomeIcon
  },
  {
    label: 'User Profile Card',
    prompt: 'Create a modern user profile card component for a social media website',
    icon: User
  }
];


const Hero = () => {
    const [userInput, setUserInput] = useState<string>();
    const {user} = useUser();
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const CreateNewProject = async() => {
      setLoading(true);
      const projectId = uuidv4();
      const frameId = generateRandomFrameNumber();
      //const router = useRouter();
      const messages = [
        {
          role: 'user',
          content: userInput,
        }
        ]
      try {
        const result = await axios.post('/api/projects', {
          projectId: projectId,
          frameId: frameId,
          messages: messages,
        });
        console.log(result);
        toast.success('Project Created Successfully');
        router.push(`/playground/${projectId}?frame=${frameId}`);
        setLoading(false);
      } catch (error) {
        toast.error('Internal Server Error');
        setLoading(false);
      }
    }
  return (
    <div className='flex flex-col items-center justify-center h-[80vh]'>
    <div className='text-center'>
        <h2 className='font-bold text-6xl'>What should we Design?</h2>
        <p className='mt-2 text-xl text-gray-500'>Generate, Edit and Explore design with AI, Export code as well</p>
    </div>


<div className='w-full max-w-2xl p-5 border mt-5 rounded-2xl'>
    <textarea onChange={(e)=>setUserInput(e.target.value)} value={userInput} placeholder='Describe your page design' className='w-full h-24 focus:outline-none focus:ring-0 resize-none'></textarea>
    <div className='flex items-center justify-between'>
    <Button variant={'ghost'}><ImagePlus /></Button>
    {!user ?
    <SignInButton mode='modal' forceRedirectUrl={'/workspace'}>
    <Button disabled={!userInput}><ArrowUp /></Button>
    </SignInButton>
    :
    <Button onClick={CreateNewProject} disabled={!userInput || loading}>{loading ? <Loader2Icon className='animate-spin' /> : <ArrowUp />}</Button>
}
</div>
</div>

<div className='mt-4 flex gap-3'>
    {suggestion.map((suggestion, index) => (
        <Button onClick={()=>setUserInput(suggestion.prompt)} key={index} variant={'outline'}><suggestion.icon /> {suggestion.label}</Button>
    ))}
</div>

   </div> 
  )
}

export default Hero

const generateRandomFrameNumber = () => {
  const num = Math.floor(Math.random() * 10000);
  return num;
}