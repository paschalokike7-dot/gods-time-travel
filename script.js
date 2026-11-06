const WHATSAPP = '2347045551626'

// CHANGE THESE to match your real price list
const ROUTES = [
  { name: 'ABUAD to Akure Airport', price: 25000 },
  { name: 'ABUAD to Akure Park', price: 20000 },
]

const naira = (n) => '₦' + n.toLocaleString('en-NG')

const cards = document.getElementById('route-cards')
const select = document.getElementById('route')
const seatsInput = document.getElementById('seats')
const totalEl = document.getElementById('total')

ROUTES.forEach((r, i) => {
  const card = document.createElement('article')
  card.className = 'card'
  card.innerHTML = `<h3>${r.name}</h3><p class="price">${naira(r.price)}<small> per seat</small></p>`
  cards.appendChild(card)

  const opt = document.createElement('option')
  opt.value = i
  opt.textContent = `${r.name} (${naira(r.price)})`
  select.appendChild(opt)
})

function updateTotal() {
  const route = ROUTES[select.value]
  const seats = Number(seatsInput.value) || 0
  totalEl.textContent = naira(route.price * seats)
}

select.addEventListener('change', updateTotal)
seatsInput.addEventListener('input', updateTotal)
updateTotal()

document.getElementById('booking').addEventListener('submit', (e) => {
  e.preventDefault()
  const name = document.getElementById('name').value.trim()
  const date = document.getElementById('date').value
  const route = ROUTES[select.value]
  const seats = Number(seatsInput.value)
  const total = naira(route.price * seats)
  const text =
    `Hello, I want to reserve ${seats} seat(s) on ${route.name} for ${date}. ` +
    `Name: ${name}. Total: ${total}.`
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank')
})
