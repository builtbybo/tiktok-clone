import React, { Dispatch, SetStateAction } from 'react'
import Image from 'next/legacy/image'
import Link from 'next/link'
import { GoVerified } from 'react-icons/go'

import useAuthStore from '../store/authStore'
import NoResults from './NoResults'
import { IUser } from '../types'


interface IComment {
  comment: string;
  length?: number;
  _key: string;
  postedBy: { _ref: string; _id:string };
}


interface IProps {
  isPostingComment: Boolean,
  comment: string,
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: React.FormEvent)=> void;
  comments: IComment[];
}




const Comments = ({isPostingComment, setComment, addComment, comment, comments}: IProps) => {

  const textCaption = "No comments yet! Will you be the first?"
  const { userProfile, allUsers } = useAuthStore();

  return (
    <div className='border-t-2 border-gray-200 pt-4 px-10 bg-[#F8F8F8] border-b-2 lg:pb-0 pb-[100px]'>
      <div className='overflow-scroll lg:h-[475px]'>
        {comments?.length ? (
          <div>
            {comments.map( (comment, i) => (
              <>
                {allUsers.map( (user : IUser) => (
                  user._id === (comment.postedBy._id ||  comment.postedBy._ref) && (
                    <div className='p-2 items-center' key={i}>
                      <Link href={`/profile/${user._id}`}>

                        <div className='flex items-start gap-3'>
                          <div className='w-8 h-8'>
                            <Image 
                              src={user.image}
                              width={34}
                              height={34}
                              className="rounded-full"
                              layout='responsive'
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
                     <div className=''>
                        <p>
                          {comment.comment}
                        </p>

                     </div>

                    </div>
                  )
                ))}
              </>
            ))}
          </div>
        ) : (
          <NoResults text={textCaption} />
        )}
      </div>
      {userProfile && (
        <div className='absolute bottom-0 left-0 pb-6 px-2 md:px-10'>
            <form 
              onSubmit={addComment}
              className='flex gap-4'>
                  <input
                    value={comment}
                    placeholder='Add comment...'
                    onChange={ (e)=> { setComment(e.target.value)}}
                    className="bg-primary px-6 py-4 text-md font-medium border-2 w-[250px] md:w-[700px] lg:w-[350px] border-gray-50 focus:outline-none focus:border-gray-300 flex-1 rounded-lg"
                  />
                  <button 
                    onClick={addComment}
                    className='text-md text-gray-400'>
                    {isPostingComment ? 'Commenting...' : 'Comment'}
                  </button>
              </form>
        </div>
      ) }
    </div>
  )
}

export default Comments
