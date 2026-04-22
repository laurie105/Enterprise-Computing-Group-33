'use client'
import { useState } from 'react'
import { Leaf, AlertTriangle } from 'lucide-react'

const menuItems = [
  { id: 1, name: 'Grilled Chicken Wrap', description: 'Grilled chicken, mixed leaves, tomato, mayo in a flour tortilla', price: 6.50, category: 'Mains', calories: 520, days: ['Monday','Tuesday','Wednesday','Thursday','Friday'], vegetarian: false, vegan: false, allergens: ['Gluten','Egg'] },
  { id: 2, name: 'Vegetable Curry & Rice', description: 'Mild vegetable curry served with steamed basmati rice', price: 5.80, category: 'Mains', calories: 480, days: ['Monday','Wednesday','Friday'], vegetarian: true, vegan: true, allergens: ['Celery'] },
  { id: 3, name: 'Beef Lasagne', description: 'Classic beef lasagne with garlic bread', price: 6.90, category: 'Mains', calories: 650, days: ['Tuesday','Thursday'], vegetarian: false, vegan: false, allergens: ['Gluten','Dairy','Egg'] },
  { id: 4, name: 'Soup of the Day', description: 'Homemade soup served with a bread roll', price: 3.50, category: 'Starters', calories: 220, days: ['Monday','Tuesday','Wednesday','Thursday','Friday'], vegetarian: true, vegan: false, allergens: ['Gluten','Dairy'] },
  { id: 5, name: 'Caesar Salad', description: 'Romaine lettuce, croutons, parmesan, Caesar dressing', price: 5.20, category: 'Salads', calories: 310, days: ['Monday','Tuesday','Wednesday','Thursday','Friday'], vegetarian: true, vegan: false, allergens: ['Gluten','Dairy','Egg','Fish'] },
  { id: 6, name: 'Chips', description: 'Crispy salted chips', price: 2.50, category: 'Sides', calories: 380, days: ['Monday','Tuesday','Wednesday','Thursday','Friday'], vegetarian: true, vegan: true, allergens: [] },
  { id: 7, name: 'Americano', description: 'Double shot espresso with hot water', price: 2.80, category: 'Hot Drinks', calories: 10, days: ['Monday','Tuesday','Wednesday','Thursday','Friday'], vegetarian: true, vegan: true, allergens: [] },
  { id: 8, name: 'Cappuccino', description: 'Espresso topped with steamed milk foam', price: 3.20, category: 'Hot Drinks', calories: 90, days: ['Monday','Tuesday','Wednesday','Thursday','Friday'], vegetarian: true, vegan: false, allergens: ['Dairy'] },
  { id: 9, name: 'Orange Juice', description: 'Freshly squeezed orange juice (250ml)', price: 2.20, category: 'Cold Drinks', calories: 115, days: ['Monday','Tuesday','Wednesday','Thursday','Friday'], vegetarian: true, vegan: true, allergens: [] },
  { id: 10, name: 'Chocolate Brownie', description: 'Warm chocolate brownie with cream', price: 2.80, category: 'Desserts', calories: 380, days: ['Monday','Wednesday','Friday'], vegetarian: true, vegan: false, allergens: ['Gluten','Dairy','Egg','Nuts'] },
  { id: 11, name: 'Vegan Falafel Wrap', description: 'Falafel, hummus, cucumber, red onion in a wholemeal wrap', price: 6.20, category: 'Mains', calories: 490, days: ['Monday','Tuesday','Wednesday','Thursday','Friday'], vegetarian: true, vegan: true, allergens: ['Gluten','Sesame'] },
  { id: 12, name: 'Toasted Panini', description: 'Cheese and ham toasted panini', price: 4.50, category: 'Snacks', calories: 420, days: ['Monday','Tuesday','Wednesday','Thursday','Friday'], vegetarian: false, vegan: false, allergens: ['Gluten','Dairy'] },
]

const categories = ['All', 'Mains', 'Starters', 'Salads', 'Sides', 'Snacks', 'Desserts', 'Hot Drinks', 'Cold Drinks']
const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

const allergenColors: Record<string, string> = {
  Gluten: '#fb8500', Dairy: '#0050c8', Egg: '#ffd60a', Fish: '#00b4d8',
  Nuts: '#ef233c', Celery: '#06d6a0', Sesame: '#8b5cf6',
}

export default function CanteenPage() {
  const today = new Date().toLocaleDateString('en-IE', { weekday: 'long' })
  const defaultDay = weekdays.includes(today) ? today : 'Monday'
  const [selectedDay, setSelectedDay] = useState(defaultDay)
  const [category, setCategory] = useState('All')
  const [veganOnly, setVeganOnly] = useState(false)
  const [vegOnly, setVegOnly] = useState(false)

  const filtered = menuItems.filter(item => {
    const onDay = item.days.includes(selectedDay)
    const matchCat = category === 'All' || item.category === category
    const matchVeg = !vegOnly || item.vegetarian
    const matchVegan = !veganOnly || item.vegan
    return onDay && matchCat && matchVeg && matchVegan
  })

  return (
    <div className="fade-in">
      {/* Day selector */}
      <div role="tablist" aria-label="Select day" style={{ display: 'flex', gap: '6px', marginBottom: '20px', overflowX: 'auto', paddingBottom: '4px' }}>
        {weekdays.map(day => (
          <button
            key={day}
            role="tab"
            aria-selected={selectedDay === day}
            onClick={() => setSelectedDay(day)}
            className={`btn btn-sm ${selectedDay === day ? 'btn-primary' : 'btn-secondary'}`}
            style={{ position: 'relative', whiteSpace: 'nowrap' }}
          >
            {day}
            {day === today && (
              <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--tud-green)', border: '2px solid var(--bg-card)' }} aria-label="today" />
            )}
          </button>
        ))}
      </div>

      {/* Filters row */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div>
          <label htmlFor="cat-filter" className="sr-only">Filter by category</label>
          <select id="cat-filter" className="select" style={{ width: 'auto' }} value={category} onChange={e => setCategory(e.target.value)}>
            {categories.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 500, cursor: 'pointer' }}>
          <input type="checkbox" checked={vegOnly} onChange={e => setVegOnly(e.target.checked)} aria-label="Vegetarian only" />
          <Leaf size={15} style={{ color: '#06d6a0' }} aria-hidden="true" />
          Vegetarian
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 500, cursor: 'pointer' }}>
          <input type="checkbox" checked={veganOnly} onChange={e => setVeganOnly(e.target.checked)} aria-label="Vegan only" />
          <Leaf size={15} style={{ color: '#003087' }} aria-hidden="true" />
          Vegan
        </label>
        <span style={{ fontSize: '13px', color: 'var(--text-muted)', marginLeft: 'auto' }}>{filtered.length} item{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Allergen key */}
      <div className="alert alert-info" role="note" aria-label="Allergen information">
        <AlertTriangle size={16} aria-hidden="true" />
        <span style={{ fontSize: '13px' }}>
          <strong>Allergen info:</strong> Always check with canteen staff if you have a food allergy. Allergen labels below are for reference only.
        </span>
      </div>

      {/* Menu grid */}
      {filtered.length === 0 ? (
        <div className="empty-state card card-padded">
          <h3>Nothing on the menu matches your filters</h3>
          <p>Try selecting a different day or removing dietary filters.</p>
        </div>
      ) : (
        <div className="grid-3" role="list" aria-label={`${selectedDay} canteen menu`}>
          {filtered.map(item => (
            <article key={item.id} className="card card-padded fade-in" role="listitem" aria-label={item.name} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span className="badge badge-gray">{item.category}</span>
                <span style={{ fontWeight: 700, fontSize: '16px', color: 'var(--tud-blue)' }}>€{item.price.toFixed(2)}</span>
              </div>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '4px' }}>{item.name}</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{item.description}</p>
              </div>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap', marginTop: 'auto' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{item.calories} kcal</span>
                {item.vegan && (
                  <span className="badge badge-green" style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <Leaf size={10} aria-hidden="true" /> Vegan
                  </span>
                )}
                {item.vegetarian && !item.vegan && (
                  <span className="badge badge-cyan" style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <Leaf size={10} aria-hidden="true" /> Veggie
                  </span>
                )}
              </div>
              {item.allergens.length > 0 && (
                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                  {item.allergens.map(a => (
                    <span
                      key={a}
                      style={{
                        fontSize: '10px', fontWeight: 600, padding: '2px 7px',
                        borderRadius: '100px',
                        background: `color-mix(in srgb, ${allergenColors[a] ?? '#888'} 12%, transparent)`,
                        color: allergenColors[a] ?? '#555',
                      }}
                      title={`Contains ${a}`}
                      aria-label={`Allergen: ${a}`}
                    >
                      {a}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
