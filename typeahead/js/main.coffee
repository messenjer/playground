$ ->

  $team = $('.js-football-team-autocomplete .typeahead')

  $team.typeahead({
    name: 'team',
    prefetch: 'data/footballTeamList.json',
    template: [
        '<p class=""><img src="{{image}}" /> {{value}}</p>',
    ].join(''),
    engine: Hogan
  })

  $team.on( "typeahead:selected", (event, selectedDatum, datasetName) ->
      if selectedDatum.url
          window.location = selectedDatum.url
  )

$ ->

  $player = $('.js-football-player-autocomplete .typeahead')

  $player.typeahead({
    name: 'player',
    prefetch: 'data/footballPlayerList.json',
    template: [
        '<p class=""><img src="{{image}}" /> {{value}}</p>',
    ].join(''),
    engine: Hogan
  })

  $player.on( "typeahead:selected", (event, selectedDatum, datasetName) ->        
      if selectedDatum.url
          window.location = selectedDatum.url
  )

$ ->

  $all = $('.js-football-all-autocomplete .typeahead')

  $all.typeahead([{
    name: 'team',
    prefetch: 'data/footballTeamList.json',
    header: '<h3 class="">Equipes de football</h3>',
    template: [
        '<p class=""><img src="{{image}}" /> {{value}}</p>',
    ].join(''),
    engine: Hogan,
    limit: 3
  },
  {
    name: 'player',
    prefetch: 'data/footballPlayerList.json',
    header: '<h3 class="">Joueurs de football</h3>',
    template: [
        '<p class=""><img src="{{image}}" /> {{value}}</p>',
    ].join(''),
    engine: Hogan,
    limit: 3
  }])

  $all.on( "typeahead:selected", (event, selectedDatum, datasetName) ->        
      if selectedDatum.url
          window.location = selectedDatum.url
  )

