import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { MessageCircle, UserCircle2, Loader2, AlertCircle, Send, ImagePlus, X, Pin } from 'lucide-react';
import AOS from "aos";
import "aos/dist/aos.css";
import { supabase } from '../supabase';

/* ================= COMMENT CARD ================= */
const Comment = memo(({ comment, formatDate, isPinned = false }) => (
  <div
    className={`px-4 pt-4 pb-2 rounded-xl border transition-all group 
    hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(255,0,80,0.25)]
    ${
      isPinned
        ? 'bg-gradient-to-r from-red-500/10 to-pink-500/10 border-red-500/40'
        : 'bg-white/5 border-white/10 hover:border-red-500/40'
    }`}
  >
    {isPinned && (
      <div className="flex items-center gap-2 mb-3 text-red-400">
        <Pin className="w-4 h-4" />
        <span className="text-xs font-medium uppercase tracking-wide">
          Pinned Comment
        </span>
      </div>
    )}

    <div className="flex items-start gap-3">
      {comment.profile_image ? (
        <img
          src={comment.profile_image}
          alt={comment.user_name}
          className={`w-10 h-10 rounded-full object-cover border-2 ${
            isPinned ? 'border-red-500/60' : 'border-red-500/30'
          }`}
        />
      ) : (
        <div className={`p-2 rounded-full transition-colors 
          ${isPinned ? 'bg-red-500/30 text-red-300' : 'bg-red-500/20 text-red-400'}
        `}>
          <UserCircle2 className="w-5 h-5" />
        </div>
      )}

      <div className="flex-grow min-w-0">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <h4 className={`font-medium truncate ${
              isPinned ? 'text-red-200' : 'text-white'
            }`}>
              {comment.user_name}
            </h4>
            {isPinned && (
              <span className="px-2 py-0.5 text-xs bg-red-500/20 text-red-300 rounded-full">
                Admin
              </span>
            )}
          </div>
          <span className="text-xs text-gray-400">
            {formatDate(comment.created_at)}
          </span>
        </div>
        <p className="text-gray-300 text-sm leading-relaxed">
          {comment.content}
        </p>
      </div>
    </div>
  </div>
));

/* ================= FORM ================= */
const CommentForm = memo(({ onSubmit, isSubmitting }) => {
  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim() || !userName.trim()) return;
    onSubmit({ newComment, userName, imageFile });
    setNewComment('');
    setUserName('');
    setImagePreview(null);
    setImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="text-sm text-white">Name *</label>
        <input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          maxLength={15}
          className="w-full p-3 rounded-xl bg-white/5 border border-white/10
          text-white focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
        />
      </div>

      <div>
        <label className="text-sm text-white">Message *</label>
        <textarea
          ref={textareaRef}
          value={newComment}
          maxLength={200}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-4 min-h-[120px] rounded-xl bg-white/5 border border-white/10
          text-white resize-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
        />
      </div>

      <div>
        {imagePreview ? (
          <div className="flex items-center gap-4">
            <img src={imagePreview} className="w-16 h-16 rounded-full border-2 border-red-500/50" />
            <button
              type="button"
              onClick={() => {
                setImagePreview(null);
                setImageFile(null);
                if (fileInputRef.current) fileInputRef.current.value = '';
              }}
              className="px-4 py-2 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/30"
            >
              <X className="w-4 h-4 inline" /> Remove
            </button>
          </div>
        ) : (
          <>
            <input type="file" hidden ref={fileInputRef} />
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="w-full p-3 rounded-xl border border-dashed border-red-500/40
              bg-red-500/10 text-red-400 hover:bg-red-500/20"
            >
              <ImagePlus className="inline w-5 h-5 mr-2" />
              Choose Profile Photo
            </button>
          </>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="relative w-full h-12 rounded-xl font-medium text-white
        bg-gradient-to-r from-red-500 to-pink-500
        hover:shadow-[0_0_25px_rgba(255,0,80,0.5)] transition"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" /> Posting...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <Send className="w-4 h-4" /> Post Comment
          </span>
        )}
      </button>
    </form>
  );
});

/* ================= MAIN ================= */
const Komentar = () => {
  const [comments, setComments] = useState([]);
  const [pinnedComment, setPinnedComment] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    supabase.from('portfolio_comments')
      .select('*')
      .eq('is_pinned', true)
      .single()
      .then(({ data }) => setPinnedComment(data));
  }, []);

  useEffect(() => {
    supabase.from('portfolio_comments')
      .select('*')
      .eq('is_pinned', false)
      .order('created_at', { ascending: false })
      .then(({ data }) => setComments(data || []));
  }, []);

  const formatDate = (t) => new Date(t).toLocaleDateString();

  return (
    <div className="bg-white/5 rounded-2xl backdrop-blur-xl shadow-xl">
      <div className="p-6 border-b border-white/10 flex items-center gap-3">
        <div className="p-2 rounded-xl bg-red-500/20">
          <MessageCircle className="w-6 h-6 text-red-400" />
        </div>
        <h3 className="text-xl text-white font-semibold">
          Comments <span className="text-red-400">({comments.length + (pinnedComment ? 1 : 0)})</span>
        </h3>
      </div>

      <div className="p-6 space-y-6">
        <CommentForm
          isSubmitting={isSubmitting}
          onSubmit={() => {}}
        />

        <div className="space-y-4 max-h-[320px] overflow-y-auto custom-scrollbar">
          {pinnedComment && (
            <Comment comment={pinnedComment} formatDate={formatDate} isPinned />
          )}
          {comments.map(c => (
            <Comment key={c.id} comment={c} formatDate={formatDate} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 0, 80, 0.6);
          border-radius: 6px;
        }
      `}</style>
    </div>
  );
};

export default Komentar;
