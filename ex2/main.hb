<script type="text/x-handlebars" data-template-name="Ex2-application">
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

<script type="text/x-handlebars" data-template-name="Ex2-index">
  {{#view Ex2.HeaderText}}<h2>Header goes here</h2>{{/view}}
  {{#view Ex2.AlertText}}This is an alert text{{/view}}
  {{#view Ex2.SizeButton}}Set large{{/view}}
  {{#view Ex2.TypeButton}}Set danger{{/view}}
  {{#view Ex2.ResetButton}}Reset{{/view}}
</script>
