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
      const date = ico.date
      const name = escapeHtml(ico.name)
      const url = escapeHtml(ico.url)
      const coin = escapeHtml(ico.coin)

      // @TODO: convert to promise
      $.get(apiUrl + '/' + coin + '/votes', (votes) => {

        let total, upvotes, pct
        if (votes.length > 0) {
          total = votes.length
          upvotes = votes.filter(vote => vote.upvote).length
          pct = (upvotes/total).toFixed(2)
        } else {
          total = 0
          upvotes = 0
          pct = 0
        }
        
        element.append(
          `<tr>
            <td>${moment(date, moment.ISO_8601).format('ll')}</td>
            <td>${moment(date, moment.ISO_8601).fromNow()}</td>
            <td>${coin}</td>
            <td><a href=\"${url}\" target=_blank>${name}</a></td>
            <td>
              <div class="progress">
              ${pct ? 
                `<div class="progress-bar bg-success" role="progressbar" style="width: ${pct*100}%" aria-valuenow="${pct*100}" aria-valuemin="0" aria-valuemax="100"></div>
                <div class="progress-bar bg-danger" role="progressbar" style="width: ${(1-pct)*100}%" aria-valuenow="${(1-pct)*100}" aria-valuemin="0" aria-valuemax="100"></div>` :
                `<div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>`
              }
              </div> ${pct*100}% (${total} ${total == 1 ? `vote` : `votes`})
            </td>
            <td>
              <button id="${coin}-upvote" class="btn btn-success" type="button"><i class="fa fa-thumbs-up"></i></button>
              <button id="${coin}-downvote" class="btn btn-danger" type="button"><i class="fa fa-thumbs-down"></i></button>
            </td>
          </tr>`
        )
        $('#'+coin+'-upvote').on('click', null, {coin: coin, vote: true}, voteCoin)
        $('#'+coin+'-downvote').on('click', null, {coin: coin, vote: false}, voteCoin)
        checkCoin(coin)

      }).done((res) => {$.bootstrapSortable({applyLast: true})})
    }
  }

  function voteCoin(e) {
    const coin = e.data.coin
    const vote = e.data.vote
    let url = apiUrl + '/' + coin + '/vote'
    $.ajax({
      type: 'post',
      url: url,
      data: {vote: vote}
    }).done((res) => checkCoin(coin))
      .fail((res) => console.log("Error: Could not vote"))
  }

  function checkCoin(coin) {
    let url = apiUrl + '/' + coin + '/vote'
    $.get(url, (vote) => {
      if (vote.upvote) {
        $('#'+coin+'-upvote').prop('disabled', true)
        $('#'+coin+'-downvote').prop('disabled', false)
      } else {
        $('#'+coin+'-upvote').prop('disabled', false)
        $('#'+coin+'-downvote').prop('disabled', true)
      }
    }).done()
      .fail((res) => {console.log("Error: Could note get vote for " + coin)})
  }

  return {
    onload: function() {
      init()
    }
  }
})()

window.onload = mainLoader.onload
