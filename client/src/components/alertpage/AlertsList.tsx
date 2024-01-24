import React from 'react';
import CommentAlert from './CommentAlert';
import FollowAlert from './FollowAlert';
import MonotalkAlert from './MonotalkAlert';
import PostAlert from './PostAlert';

import '../../styles/AlertPageAlertsList.scss';

function AlertsList() {


    return ( 
        <>
            <div className='alertslist-container'>
                <CommentAlert/>
                <FollowAlert/>
                <MonotalkAlert/>
                <PostAlert/>
            </div>
        </>
     );
}

export default AlertsList;