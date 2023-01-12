import { useState, useEffect } from "react";
import Image from "next/legacy/image";
import { GoVerified } from "react-icons/go";
import axios from 'axios'

import VideoCard from "../../components/VideoCard";
import NoResults from "../../components/NoResults";
import { IUser, Video} from "../../types";
import { BASE_URL } from "../../utils";
import { userAgent } from "next/server";

interface IProps {
    data: {
        user: IUser,
        userVideos: Video[],
        userLikedVideos: Video[]
    }
}
const Profile = ({ data }: IProps ) => {
    const [showUserVideos, setShowUserVideos] = useState(true);
    const [videosList, setVideosList] = useState<Video[]>([]);
    const { user, userVideos, userLikedVideos } = data;
    
    const videos = showUserVideos ? 'border-b-2 border-black' : 'text-gray-400';
    const like = !showUserVideos ? 'border-b-2 border-black' : 'text-gray-400';

    useEffect( ()=> {
        if(showUserVideos) {
            setVideosList(userVideos);
        } else {
            setVideosList(userLikedVideos);
        }
    }, [showUserVideos, userLikedVideos, userVideos])
    return (
        <div className="w-full">
            <div className="flex gap-6 md:gap-10 mb-4 bg-white w-full md:w-32 md:h-32">
                <div className='w-16 h-16'>
                        <Image 
                        src={user?.image}
                        width={120}
                        height={120}
                        className="rounded-full"
                        layout='responsive'
                        alt='user profile'
                        />
                    </div>
                    <div className="flex flex-col justify-center">
                    <p className='flex gap-1 items-center text-md  md:text-2xl tracking-wider font-bold text-primary lowercase justify-center'>
                    {user?.userName.replace(' ', '')}
                    <GoVerified className='text-blue-400' />
                    </p>
                    <p className='capitalize text-xs text-gray-400 md:text-xl'>
                        {user?.userName}
                    </p>
                    </div>
            </div>

            <div className="">
                <div className="flex gap-10 my-10 border-b-2 border-gray-200 bg-white w-full">
                    <p className={`text-xl font-semibold cursor-pointer mt-2`} onClick={()=> setShowUserVideos(true)}>Videos</p>
                    <p className={`text-xl font-semibold cursor-pointer mt-2`} onClick={ ()=> setShowUserVideos(false)}>Liked</p> 
                </div>
                <div className="flex gap-6 flex-wrap md:justify-start">
                    {videosList.length > 0 ? (
                        videosList.map( (post: Video, i: number)=> (
                            <VideoCard post={post} key={i} />
                        ))
                        ): (<NoResults text={`No ${showUserVideos ? '': 'liked'} videos yet`} />)}
                </div>
            </div>
        </div>
    )
};

export const getServerSideProps = async ({
    params: {id} 
}:{
    params: { id: string }
}) => {
    const res = await axios.get(`${BASE_URL}/api/profile/${id}`)

    return {
        props: {data: res.data }
    }
}

export default Profile;