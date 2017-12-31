'use strict'

var mainLoader = (function() {
  const apiUrl = 'http://localhost:3002/api'
  const $shills = $('#shills')

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
  }

  function getShills() {
    let url = apiUrl + '/shills'
    $.get(url, (shills) => {
      renderShills(shills, $shills)
    }).fail((res) => console.log("Error: Could not get shillz"))
  }

  function renderShills(shills, element) {
    element.empty()
    element.off()
    for (var i = 0, shill; i < shills.length; i++) {
      shill = shills[i]
      element.append(
        `<tr>
          <td>${escapeHtml(shill.user)}</td>
          <td>${escapeHtml(shill.token)}</td>
          <td>${shill.shill_date.substr(0,10)}</td>
          <td>$${shill.shill_price}</td>
          <td></td>
          <td>${shill.price ? (shill.shill_price ? (shill.price - shill.shill_price) / shill.shill_price * 100 : '') : ''}%</td>
        </tr>`
      )
    }
  }

  return {
    onload: function() {
      init()
    }
  }
})()

window.onload = mainLoader.onload
