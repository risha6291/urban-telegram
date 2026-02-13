import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Bookmark } from 'lucide-react';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onClick: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, isFavorite, onToggleFavorite, onClick }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92 }}
      onClick={() => onClick(movie)}
      className="relative cursor-pointer card-lift"
      style={{
        aspectRatio: '2/3',
        borderRadius: '14px',
        overflow: 'hidden',
        background: '#111114',
        boxShadow: '0 4px 8px rgba(0,0,0,0.5), 0 12px 32px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.05) inset',
      }}
    >
      <img
        src={movie.thumbnail}
        alt={movie.title}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center top',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.45s ease',
        }}
      />
      {!loaded && <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,#1a1a1e,#111114)' }} />}

      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 30%, rgba(0,0,0,0.08) 55%, transparent 75%)',
        zIndex: 1,
      }} />

      {/* Icons */}
      <div style={{ position: 'absolute', top: 8, left: 8, right: 8, display: 'flex', justifyContent: 'space-between', zIndex: 10 }}>
        <button onClick={(e) => { e.stopPropagation(); onToggleFavorite(movie.id); }}
          style={{ width: 26, height: 26, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: isFavorite ? 'rgba(239,68,68,0.8)' : 'rgba(0,0,0,0.38)', backdropFilter: 'blur(10px)', border: 'none', cursor: 'pointer' }}>
          <Heart size={11} style={{ color: '#fff', fill: isFavorite ? '#fff' : 'none' }} />
        </button>
        <div style={{ width: 26, height: 26, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.38)', backdropFilter: 'blur(10px)' }}>
          <Bookmark size={11} style={{ color: isFavorite ? '#FFD700' : 'rgba(255,255,255,0.7)', fill: isFavorite ? '#FFD700' : 'none' }} />
        </div>
      </div>

      {(movie.isExclusive || movie.category === 'Exclusive') && !movie.isUpcoming && (
        <div style={{ position: 'absolute', left: 0, bottom: 58, zIndex: 10 }}>
          <div style={{ background: 'linear-gradient(90deg,#D97706,#FBBF24)', borderRadius: '0 12px 12px 0', padding: '3px 9px 3px 7px', boxShadow: '0 2px 10px rgba(217,119,6,0.5)' }}>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '8.5px', fontWeight: 800, color: '#000', letterSpacing: '0.12em', textTransform: 'uppercase' }}>EXCL</span>
          </div>
        </div>
      )}

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '10px', zIndex: 10 }}>
        <h3 style={{ fontFamily: "'Outfit',sans-serif", fontSize: '13.5px', fontWeight: 700, color: '#fff', lineHeight: '1.25', marginBottom: '4px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', textShadow: '0 1px 8px rgba(0,0,0,1)', letterSpacing: '-0.01em' }}>
          {movie.title}
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ color: '#FFD700', fontSize: '10px' }}>★</span>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '10.5px', fontWeight: 700, color: '#fff' }}>{movie.rating}</span>
          <span style={{ color: 'rgba(255,255,255,0.28)', fontSize: '9px' }}>•</span>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '9.5px', color: 'rgba(255,255,255,0.48)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '65%' }}>
            {movie.category === 'Korean Drama' ? 'K-Drama' : movie.category}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;
