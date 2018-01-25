'use strict'

var mainLoader = (function() {
  const apiUrl = 'https://neoblockcha.in/api'
  const $eats = $('#eats')
  const $lastUpdated = $('#last-updated')

  function escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
  }

  function init() {
    getEats()
    updateTime()
  }

  function updateTime() {
    let url = apiUrl + '/coin/btc'
    $.get(url, (coin) => {
      let lastUpdated = document.createTextNode("Last updated: " + moment(coin.last_updated, moment.ISO_8601).fromNow())
      $lastUpdated[0].appendChild(lastUpdated)
    }).fail((res) => console.log("Error: Could not get last updated"))
  }

  function getEats() {
    let url = apiUrl + '/eats'
    $.get(url, (eats) => {
      renderEats(eats, $eats)
    }).fail((res) => console.log("Error: Could not get eats"))
  }

  function renderEats(eats, element) {
    element.empty()
    element.off()

    // get Neo price
    // @TODO: refactor to promise
    let url = apiUrl + '/coin/neo'
    $.get(url, (neo) => {
      const neo_usd = neo.price_usd

      for (var i = 0, eat; i < eats.length; i++) {
        eat = eats[i]
        const diff = (eat.price - neo_usd).toFixed(2)
        element.append(
          `<tr>
            <td>${escapeHtml(eat.user)}</td>
            <td>${moment(eat.date, moment.ISO_8601).format('ll')}</td>
            <td>$${eat.price}</td>
            <td>$${neo_usd}</td>
            <td ${diff > 0 ? `class="table-danger"` : `class="table-danger"`}>$${diff}</td>
            <td>${escapeHtml((eat.eat ? eat.eat : ''))}</td>
            <td>${(eat.claim ? `<a href="/imgs/${eat.claim}"><img src="/imgs/${eat.claim}" width="30" height="30" /></a>` : '')}</td>
            <td>${escapeHtml((eat.proof ? eat.proof : ''))}</td>
          </tr>`
        )
      }
      $.bootstrapSortable({applyLast: true})

    })
  }

  return {
    onload: function() {
      init()
    }
  }
})()

window.onload = mainLoader.onload
