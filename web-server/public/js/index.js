'use strict'

var mainLoader = (function() {
  const apiUrl = 'https://neoblockcha.in/api'
  const $shills = $('#shills')
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
    getShills()
    updateTime()
  }

  function updateTime() {
    let url = apiUrl + '/coin/btc'
    $.get(url, (coin) => {
      let lastUpdated = document.createTextNode("Last updated: " + moment(coin.last_updated, moment.ISO_8601).fromNow())
      $lastUpdated[0].appendChild(lastUpdated)
    }).fail((res) => console.log("Error: Could not get last updated"))
  }

  function getShills() {
    let url = apiUrl + '/shills'
    $.get(url, (shills) => {
      renderShills(shills, $shills)
    }).fail((res) => console.log("Error: Could not get shills"))
  }

  function renderShills(shills, element) {
    element.empty()
    element.off()

    // get Neo price
    // @TODO: refactor to promise
    let url = apiUrl + '/coin/neo'
    $.get(url, (neo) => {
      const neo_usd = neo.price_usd

      for (var i = 0, shill; i < shills.length; i++) {
        shill = shills[i]
        const pct = (shill.price_usd ? (shill.shill_price ? (shill.price_usd - shill.shill_price) / shill.shill_price * 100 : 0) : 0).toFixed(2)
        const neo_pct = (neo_usd ? (shill.neo_price ? (neo_usd - shill.neo_price) / shill.neo_price * 100 : 0) : 0).toFixed(2)
        element.append(
          `<tr>
            <td>${escapeHtml(shill.user)}</td>
            <td>${escapeHtml(shill.coin)}</td>
            <td>${shill.shill_date.substr(0,10)}</td>
            <td>$${shill.shill_price}</td>
            <td>$${shill.price_usd}</td>
            <td ${pct > 0 ? `class="table-success"` : (pct < 0 ? `class="table-danger"` : '')}>${pct}</td>
            <td>${neo_pct}</td>
            <td>${(pct - neo_pct).toFixed(2)}</td>
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
