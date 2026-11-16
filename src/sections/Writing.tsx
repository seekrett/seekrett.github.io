import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { books } from '../data/writing'
import { useReveal } from '../useReveal'
import './Writing.css'

/** "Library": a bookshelf of stories. Click a spine to open the book. */
export function Writing() {
  const ref = useReveal<HTMLElement>()
  const [open, setOpen] = useState(0)
  const book = books[open]

  return (
    <section id="writing" className="section" ref={ref}>
      <div className="section-head reveal">
        <span className="eyebrow">once upon a time…</span>
        <h2 className="section-title">The Library</h2>
        <p className="section-sub">I write stories online, mostly romance with too much yearning. Pick a book off the shelf.</p>
      </div>

      <div className="library reveal">
        <div className="shelf">
          <div className="shelf-books" role="tablist" aria-label="Books">
            {books.map((b, i) => (
              <button
                key={b.title}
                role="tab"
                aria-selected={i === open}
                className={`spine${i === open ? ' is-open' : ''}`}
                style={{ '--c': b.color, '--h': `${200 + ((i * 37) % 50)}px` } as React.CSSProperties}
                onClick={() => setOpen(i)}
              >
                <span className="spine-title">{b.title}</span>
                <span className="spine-deco" aria-hidden="true">
                  ✦
                </span>
              </button>
            ))}
            <span className="shelf-plant" aria-hidden="true">
              🌷
            </span>
          </div>
          <div className="shelf-board" />
        </div>

        <AnimatePresence mode="wait">
          {book && (
            <motion.article
              key={book.title}
              className="open-book"
              role="tabpanel"
              initial={{ opacity: 0, rotateY: -25, x: 30 }}
              animate={{ opacity: 1, rotateY: 0, x: 0 }}
              exit={{ opacity: 0, rotateY: 20, x: -20 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              <div className="page page-left" style={{ '--c': book.color } as React.CSSProperties}>
                <div className="cover">
                  <span className="cover-orn" aria-hidden="true">
                    ❦
                  </span>
                  <h3>{book.title}</h3>
                  <span className="cover-by">by Yuto</span>
                </div>
              </div>
              <div className="page page-right">
                <div className="book-meta">
                  <span className="chip">{book.genre}</span>
                  <span className={`chip status-${book.status.replace(' ', '-').toLowerCase()}`}>{book.status}</span>
                  {book.chapters ? <span className="chip">{book.chapters} chapters</span> : null}
                </div>
                <p className="book-synopsis">{book.synopsis}</p>
                {book.link ? (
                  <a className="btn btn-primary" href={book.link} target="_blank" rel="noreferrer">
                    Read on {book.platform ?? 'the web'} ↗
                  </a>
                ) : (
                  <p className="book-soon">{book.platform ? `Coming to ${book.platform} soon` : 'Still in my drafts folder ♡'}</p>
                )}
              </div>
            </motion.article>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
