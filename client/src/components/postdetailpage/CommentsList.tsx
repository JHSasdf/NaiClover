
import React from 'react';
import Comment from './Comment';

const comments = [
    {
        name: '이시윤1',
        content: '안녕하세요2',
    },
    {
        name: '이시윤2',
        content: '안녕하세요2',
    },
    {
        name: '이시윤3',
        content: '안녕하세요3',
    },
]

function CommentsList(props:any) {

    return ( 
        <>
            <div>
                {comments.map((comment) => {
                    return(
                        <Comment name={comment.name} content={comment.content}/>
                    );
                })}
            </div>
        </>
     );
}

export default CommentsList;