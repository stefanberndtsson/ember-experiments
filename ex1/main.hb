<script type="text/x-handlebars" data-template-name="Ex1-application">
  <nav class="navbar navbar-default">
    <div class="navbar-header">
      {{#link-to 'index' queryParams=false classNames="navbar-brand"}}{{appName}}{{/link-to}}
      <ul class="nav navbar-nav">
	<li class="visible-xs"><a href="#">XS</a></li>
	<li class="visible-sm"><a href="#">SM</a></li>
	<li class="visible-md"><a href="#">MD</a></li>
	<li class="visible-lg"><a href="#">LG</a></li>
      </ul>
    </div>
  </nav>
  {{outlet}}
</script>

<script type="text/x-handlebars" data-template-name="Ex1-index">
  <form class="form-horizontal" role="form">
    <div class="form-group">
      <div class="col-xs-8 col-xs-offset-1">
        {{input type="text" value=queryString action="search" classNames="form-control"}}
      </div>
      <button type="submit" {{action "search" queryString}} class="btn btn-default col-xs-2">Search</button>
    </div>
  </form>

  <div class="row">
    <div class="col-xs-offset-1 col-xs-1">
      <label>{{fromYear}} - {{toYear}}</label>
    </div>
    <div class="col-xs-8">
      <div id="slider-range"></div>
    </div>
  </div>

  <div class="row">&nbsp;</div>

  <div class="row">
    <div class="col-xs-offset-2 col-xs-8">
    <ul class="list-group">
      {{#each movie in model}}
      <li class="list-group-item">
	{{movie.full_title}}
      </li>
      {{/each}}
    </ul>
    </div>
  </div>
</script>
