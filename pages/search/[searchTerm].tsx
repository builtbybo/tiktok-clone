import React, {useState} from 'react'
import { BASE_URL } from '../../utils'
import axios from 'axios'

import Link from 'next/link'
import Image from 'next/legacy/image'

import { useRouter } from 'next/router'

import { GoVerified } from "react-icons/go";

import VideoCard from "../../components/VideoCard";
import NoResults from "../../components/NoResults";
import { IUser, Video} from "../../types";
import { userAgent } from "next/server";
import useAuthStore from '../../store/authStore'



const Search = ({videos}: {videos: Video[]}) => {

  const [isAccounts, setIsAccounts] = useState(false);
  const router = useRouter()
  const { searchTerm }: any = router.query;
  const { allUsers } = useAuthStore();

  const accounts = isAccounts ? 'border-b-2 border-black' : 'text-gray-400';
  const isVideos = !isAccounts ? 'border-b-2 border-black' : 'text-gray-400';
  const searchedAccounts = allUsers.filter((user: IUser) => user.userName.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className='w-full'>
        <div className="flex gap-10 my-10 border-b-2 border-gray-200 bg-white w-full">
            <p className={`text-xl font-semibold cursor-pointer mt-2 ${accounts}`} onClick={()=> setIsAccounts(true)}>Accounts</p>
            <p className={`text-xl font-semibold cursor-pointer mt-2 ${isVideos}`} onClick={ ()=> setIsAccounts(false)}>Videos</p> 
        </div>
        {isAccounts ? (
            <div className='md:mt-16'>
                {searchedAccounts.length > 0 ? (
                    searchedAccounts.map((user: IUser, i)=> (
                        <Link href={`/profile/${user._id}`} key={i}>

                        <div className='flex p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200 gap-3'>
                          <div>
                            <Image 
                              src={user.image}
                              width={50}
                              height={50}
                              className="rounded-full"
                              alt='user profile'
                            />
                          </div>
                            <div className='hidden xl:block'>
                              <p className='flex gap-1 items-center text-md font-bold text-primary lowercase'>{user.userName.replace(' ', '')}
                              <GoVerified className='text-blue-400' />
                              </p>
                              <p className='capitalize text-xs text-gray-400'>
                              {user.userName}
                              </p>
                            </div> 
                              </div>
                     </Link> 
                    ))
                ) : <NoResults text={`No video results for ${searchTerm}`} />}
            </div>
        ): (
            <div className='md:mt-16 flex flex-wrap gap-6 md:justify-start'>
                {videos.length 
                ? (videos.map( (video:Video, i) => (
                    <VideoCard post={video} key={i} />
                ))) 
                : <NoResults text={`No video results for ${searchTerm}`} /> }
            </div>
        )}
    </div>
  )
}

export const getServerSideProps = async ({
    params: { searchTerm } 
}:{
    params: { searchTerm: string }
}) => {
    const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`)

    return {
        props: {video: res.data }
    }
}

export default Search