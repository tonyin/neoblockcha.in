'use strict'

var mainLoader = (function() {
  const apiUrl = 'https://neoblockcha.in/api'
  const $icos = $('#icos')
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
    getIcos()
    updateTime()
  }

  function updateTime() {
    let url = apiUrl + '/coin/neo'
    $.get(url, (coin) => {
      let lastUpdated = document.createTextNode("Last updated: " + moment(coin.last_updated, moment.ISO_8601).fromNow())
      $lastUpdated[0].appendChild(lastUpdated)
    }).fail((res) => console.log("Error: Could not get last updated"))
  }

  function getIcos() {
    let url = apiUrl + '/icos'
    $.get(url, (icos) => {
      renderIcos(icos, $icos)
    }).fail((res) => console.log("Error: Could not get icos"))
  }

  function renderIcos(icos, element) {
    element.empty()
    element.off()
    for (var i = 0, ico; i < icos.length; i++) {
      ico = icos[i]
      element.append(
        `<tr>
          <td>${moment(ico.date, moment.ISO_8601).format('ll')}</td>
          <td>${moment(ico.date, moment.ISO_8601).fromNow()}</td>
          <td>${ico.coin}</td>
          <td>${ico.name}</td>
          <td>${`pending`}</td>
        </tr>`
      )
    }
    $.bootstrapSortable({applyLast: true})
  }

  return {
    onload: function() {
      init()
    }
  }
})()

window.onload = mainLoader.onload
