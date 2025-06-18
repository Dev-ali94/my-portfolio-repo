import React, { useState, useEffect } from 'react';

const CommentSection = ({ blogId }) => {
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [comments, setComments] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [replyName, setReplyName] = useState('');
  const [likedComments, setLikedComments] = useState(new Set());

  useEffect(() => {
    const savedComments = JSON.parse(localStorage.getItem(`comments-${blogId}`)) || [];
    setComments(savedComments);
    const savedLikes = new Set(JSON.parse(localStorage.getItem(`likedComments-${blogId}`)) || []);
    setLikedComments(savedLikes);
  }, [blogId]);

  const saveCommentsToLocalStorage = (updatedComments) => {
    setComments(updatedComments);
    localStorage.setItem(`comments-${blogId}`, JSON.stringify(updatedComments));
  };

  const getCurrentDateTime = () => new Date().toLocaleString();
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() && name.trim()) {
      const newComment = {
        id: Date.now(),
        author: name,
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${name}`,
        content: comment,
        date: getCurrentDateTime(),
        likes: 0,
        replies: [],
      };
      const updatedComments = [newComment, ...comments];
      saveCommentsToLocalStorage(updatedComments);
      setComment('');
      setName('');
    }
  };

  const handleReplySubmit = (commentId) => {
    if (replyText.trim() && replyName.trim()) {
      const updatedComments = comments.map((c) =>
        c.id === commentId
          ? {
            ...c,
            replies: [
              ...c.replies,
              {
                id: Date.now(),
                author: replyName,
                avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${replyName}`,
                content: replyText,
                date: getCurrentDateTime(),
                likes: 0,
              },
            ],
          }
          : c
      );
      saveCommentsToLocalStorage(updatedComments);
      setReplyingTo(null);
      setReplyText('');
      setReplyName('');
    }
  };


  return (
    <div className="mt-12 rounded-2xl p-4 sm:p-6 md:p-8 bg-gray-900">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 text-transparent bg-clip-text">
          Comments ({comments.length})
        </h3>
      </div>
      {/* Comment Form */}
      <form onSubmit={handleCommentSubmit} className="mb-8 bg-[#161B22] p-4 sm:p-6 rounded-2xl shadow-lg">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 sm:p-4 border border-gray-600 rounded-xl mb-4 bg-[#161B22]  text-white outline-none"
          placeholder="Your Name"
          required
        />
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-3 sm:p-4 border border-gray-600 rounded-xl mb-4 bg-[#161B22] text-white outline-none"
          rows={4}
          placeholder="Write your comment..."
          required
        ></textarea>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white px-5 sm:px-6 py-2 rounded-lg transition-all duration-300"
          >
            Submit
          </button>
        </div>
      </form>
      {/* Comments */}
      <div className="space-y-8">
        {comments.map((comment) => (
          <div key={comment.id} className="flex flex-col bg-[#161B22] p-4 sm:p-6 rounded-2xl shadow-lg">
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <img src={comment.avatar} alt={comment.author} className="w-12 h-12 rounded-full mb-4 sm:mb-0" />
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
                  <h4 className="font-medium text-white">{comment.author}</h4>
                  <span className="text-sm text-gray-400">{comment.date}</span>
                </div>
                <p className="text-gray-300 mb-3">{comment.content}</p>
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => setReplyingTo(comment.id)}
                    className="text-sm flex items-center text-gray-500 hover:text-orange-600 transition-colors duration-300"
                  >
                    <i className="far fa-comment mr-1"></i> Reply
                  </button>
                </div>
              </div>
            </div>
            {/* Reply form */}
            {replyingTo === comment.id && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleReplySubmit(comment.id);
                }}
                className="mt-4 bg-[#0F141A] p-4 rounded-xl"
              >
                <input
                  type="text"
                  value={replyName}
                  onChange={(e) => setReplyName(e.target.value)}
                  className="w-full p-2 border border-gray-600 rounded-lg mb-2 bg-[#161B22]  text-white outline-none"
                  placeholder="Your Name"
                  required
                />
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="w-full p-2 border border-gray-600 rounded-lg mb-2 bg-[#161B22]  text-white outline-none"
                  rows={2}
                  placeholder="Write your reply..."
                  required
                ></textarea>
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-all duration-300"
                >
                  Submit Reply
                </button>
              </form>
            )}
            {/* Replies */}
            {comment.replies.length > 0 && (
              <div className="mt-4 space-y-4 pl-4 sm:pl-10">
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="flex space-x-4 bg-gray-800 p-4 rounded-xl">
                    <img src={reply.avatar} alt={reply.author} className="w-10 h-10 rounded-full" />
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between mb-1">
                        <h5 className="font-medium text-sm text-white">{reply.author}</h5>
                        <span className="text-xs text-gray-400">{reply.date}</span>
                      </div>
                      <p className="text-gray-300 text-sm">{reply.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>

  );
};

export default CommentSection;