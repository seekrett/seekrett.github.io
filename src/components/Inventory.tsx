import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { inventory, itemCategories, type ItemCategory } from '../data/profile'
import { ItemIcon } from './ItemIcon'
import './Inventory.css'

/** Skills shown as an item bag: pick a pouch, then tap an item to read about it. */
export function Inventory() {
  const [filter, setFilter] = useState<ItemCategory | 'all'>('all')
  const items = filter === 'all' ? inventory : inventory.filter((i) => i.category === filter)
  const [selectedName, setSelectedName] = useState(inventory[0]?.name)
  const selected = items.find((i) => i.name === selectedName) ?? items[0]
  const catLabel = (id: ItemCategory) => itemCategories.find((c) => c.id === id)?.label.replace(/s$/, '')

  return (
    <div className="card inventory reveal">
      <div className="inv-head">
        <h3 className="about-h">Inventory</h3>
        <span className="inv-capacity">
          {items.length}/{inventory.length}
        </span>
      </div>

      <div className="inv-pouches" role="group" aria-label="Filter items">
        {[{ id: 'all' as const, label: 'All', icon: '✦' }, ...itemCategories].map((c) => (
          <button
            key={c.id}
            className={`inv-pouch cat-${c.id}${filter === c.id ? ' is-on' : ''}`}
            aria-pressed={filter === c.id}
            onClick={() => setFilter(c.id)}
          >
            <span aria-hidden="true">{c.icon}</span> {c.label}
          </button>
        ))}
      </div>

      <div className="inv-body">
        <ul className="inv-grid" aria-label="Items">
          {items.map((it, i) => (
            <li key={it.name} style={{ '--i': i } as React.CSSProperties}>
              <button
                className={`inv-tile cat-${it.category}${selected?.name === it.name ? ' is-selected' : ''}`}
                onClick={() => setSelectedName(it.name)}
                aria-pressed={selected?.name === it.name}
              >
                <span className="inv-art">
                  <ItemIcon shape={it.shape} mark={it.mark} size={58} />
                  <span className="inv-count" aria-label={`used in ${it.usedIn.length}`}>
                    ×{it.usedIn.length}
                  </span>
                </span>
                <span className="inv-name">{it.name}</span>
              </button>
            </li>
          ))}
        </ul>

        <AnimatePresence mode="wait">
          {selected && (
            <motion.aside
              key={selected.name}
              className={`inv-detail cat-${selected.category}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
              aria-live="polite"
            >
              <div className="inv-detail-top">
                <span className="inv-detail-art">
                  <ItemIcon shape={selected.shape} mark={selected.mark} size={84} />
                </span>
                <div>
                  <h4>{selected.name}</h4>
                  <span className="inv-type">{catLabel(selected.category)}</span>
                </div>
              </div>
              <p className="inv-flavor">{selected.flavor}</p>
              <p className="inv-used-label">Used in</p>
              <ul className="inv-used">
                {selected.usedIn.map((u) => (
                  <li key={u}>{u}</li>
                ))}
              </ul>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
