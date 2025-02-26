import React, { useEffect , } from 'react'
import ProfileInfo from './ProfileInfo'
import NewDm from './NewDm'
import ContactStore from '@/store/ContactStore'
import ContactList from './ContactList'
import CreateChannel from '../ChannelComponens/CreateChannel'

function ContactContainer() {
 const {  GetContactsForDMListRequest ,setDirectMessageContacts, directMessageContacts}=ContactStore()
 useEffect(()=>{
    const getContacts= async()=>{
      const res= await  GetContactsForDMListRequest()
      if(res.status=="success"){
        setDirectMessageContacts(res.contacts)
      }
    }
    getContacts()
 },[directMessageContacts])

  return (
    <div className='relative md:w-[35w] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full'>
      <div className='pt-3'>
        <Logo/>
      </div>
      <div className='my-5 px-5'>
        <div className='flex  items-center justify-between pr-10'>
          <Title text={"Direct Message"}/>
          <NewDm/>
        </div>
        <div className='max-h-[38vh] overflow-y-auto scrollbar-hidden'>
           <ContactList contacts={directMessageContacts} />
        </div>
      </div>
      {/* <div className='my-5 px-5'>
        <div className='flex items-center justify-between pr-10'>
          <Title text={"Groups"}/>
          <CreateChannel/>
        </div>
      </div> */}
      <ProfileInfo/>
    </div>
  )
}

export default ContactContainer


const Logo =()=>{
  return(
    <div className='flex p-5 justify-start items-center gap-2'>
     <svg className="w-8 h-8 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17h6l3 3v-3h2V9h-2M4 4h11v8H9l-3 3v-3H4V4Z"/>
      </svg>
      <span className='font-semibold text-2xl'>ChatApp</span>

    </div>
  )
}

const Title =({text})=>{
  return(
    <h6 className='uppercase tracking-widest text-neutral-300 font-light text-opacity-90 text-sm'>
      {text}
    </h6>
  )
}