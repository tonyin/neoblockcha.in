'use strict'

var mainLoader = (function() {
  // const apiUrl = 'https://neoblockcha.in/api'
  const apiUrl = 'http://localhost:6002/api'
  const $nep5s = $('#nep5')
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
    getNep5s()
    updateTime()
  }

  function updateTime() {
    let url = apiUrl + '/coin/neo'
    $.get(url, (coin) => {
      let lastUpdated = document.createTextNode("Last updated: " + moment(coin.last_updated, moment.ISO_8601).fromNow())
      $lastUpdated[0].appendChild(lastUpdated)
    }).fail((res) => console.log("Error: Could not get last updated"))
  }

  function getNep5s() {
    let url = apiUrl + '/nep5s'
    $.get(url, (nep5) => {
      renderNep5s(nep5, $nep5s)
    }).fail((res) => console.log("Error: Could not get nep5s"))
  }

  function renderNep5s(nep5s, element) {
    element.empty()
    element.off()

    // get Neo price
    // @TODO: refactor to promise
    let url = apiUrl + '/coin/neo'
    $.get(url, (neo) => {
      const neo_usd = neo.price_usd

      for (var i = 0, nep5; i < nep5s.length; i++) {
        nep5 = nep5s[i]
        const pct = (nep5.price_usd ? (nep5.ico_price ? (nep5.price_usd - nep5.ico_price) / nep5.ico_price * 100 : 0) : 0).toFixed(2)
        const neo_pct = (neo_usd ? (nep5.neo_price ? (neo_usd - nep5.neo_price) / nep5.neo_price * 100 : 0) : 0).toFixed(2)
        element.append(
          `<tr>
            <td>${escapeHtml(nep5.coin)}</td>
            <td>${moment(nep5.ico_date, moment.ISO_8601).fromNow()}</td>
            <td>$${nep5.ico_price}</td>
            <td>$${nep5.price_usd}</td>
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
