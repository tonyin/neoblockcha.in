'use strict'

var mainLoader = (function() {
  const apiUrl = 'https://neoblockcha.in/api'
  const $shits = $('#shits')
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
    getShits()
    updateTime()
  }

  function updateTime() {
    let url = apiUrl + '/coin/neo'
    $.get(url, (coin) => {
      let lastUpdated = document.createTextNode("Last updated: " + moment(coin.last_updated, moment.ISO_8601).fromNow())
      $lastUpdated[0].appendChild(lastUpdated)
    }).fail((res) => console.log("Error: Could not get last updated"))
  }

  function getShits() {
    let url = apiUrl + '/shits'
    $.get(url, (shits) => {
      renderShits(shits, $shits)
    }).fail((res) => console.log("Error: Could not get shits"))
  }

  function renderShits(shits, element) {
    element.empty()
    element.off()

    // get Neo price
    // @TODO: refactor to promise
    let url = apiUrl + '/coin/neo'
    $.get(url, (neo) => {
      const neo_usd = neo.price_usd

      for (var i = 0, shit; i < shits.length; i++) {
        shit = shits[i]
        const pct = (shit.price_usd ? (shit.shit_price ? (shit.price_usd - shit.shit_price) / shit.shit_price * 100 : 0) : 0).toFixed(2)
        const neo_pct = (neo_usd ? (shit.neo_price ? (neo_usd - shit.neo_price) / shit.neo_price * 100 : 0) : 0).toFixed(2)
        element.append(
          `<tr>
            <td>${escapeHtml(shit.coin)}</td>
            <td>${moment(shit.shit_date, moment.ISO_8601).fromNow()}</td>
            <td>$${shit.shit_price}</td>
            <td>$${shit.price_usd}</td>
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
