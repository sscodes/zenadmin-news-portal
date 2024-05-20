import he from 'he';
import { useState } from 'react';
import Images from '../../Assets';
import './Comment.css';

const Comment = ({ data, limit }) => {
  const [showReply, setShowReply] = useState(false);
  const [showId, setShowId] = useState<number>(0);

  const handleShowReply = (id: number) => {
    if (id === showId || showId === 0) setShowReply((e) => !e);
    setShowId(id);
  };

  const createMarkup = (html) => {
    return { __html: html };
  };

  return data.slice(0, limit).map((data) => (
    <div
      className={`comment-card ${
        data.parent_id ? 'child-comment' : 'parent-comment'
      }`}
      key={data.id}
    >
      <div className='comment-card__username'>
        <div className='card__username'>
          <img src={Images.Profile} alt='profile-placeholder' width={47} />
        </div>
        <div>{data.author}</div>
      </div>
      <div
        className='comment-card__comment'
        dangerouslySetInnerHTML={createMarkup(he.decode(data.text))}
      />
      {data.children && data.children.length && (
        <div
          className='comment-card__show-more'
          onClick={() => handleShowReply(data.id)}
        >
          {showReply && showId === data.id ? 'Hide' : 'Show'}{' '}
          {data.children.length > 1
            ? `${data.children.length} replies`
            : `${data.children.length} reply`}
        </div>
      )}
      {data.children &&
        data.children.length > 0 &&
        showReply &&
        showId === data.id && (
          <Comment data={data.children} limit={data.children.length} />
        )}
    </div>
  ));
};

export default Comment;
