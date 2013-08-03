$ ->

  $team = $('.js-team-autocomplete .typeahead')

  $team.typeahead({
    name: 'team',
    prefetch: 'data/footballTeamList.json',
    template: [
        '<p class=""><img src="{{image}}" /> {{value}}</p>',
    ].join(''),
    engine: Hogan
  });

  $team.on( "typeahead:selected", (event, data) ->        
      if data.url
          window.location = data.url
  )

  $player = $('.js-player-autocomplete .typeahead')

  $player.typeahead({
    name: 'player',
    prefetch: 'data/footballPlayerList.json',
    template: [
        '<p class=""><img src="{{image}}" /> {{value}}</p>',
    ].join(''),
    engine: Hogan
  });

  $player.on( "typeahead:selected", (event, data) ->        
      if data.url
          window.location = data.url
  )
