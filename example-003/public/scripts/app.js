(function app ($, ko, InputList, RecipeList, RecipeDetails) {

  var getRecipes = $.get('/recipes');

  $(function () {
    // register the custom component tag before
    // Knockout bindings are applied to the page
    ko.components.register('input-list', {
      template: {
        element: 'item-list-template'
      },
      viewModel: InputList.create
    });

    getRecipes.then(function (recipes) {
      var list = RecipeList.create(recipes);
      var details = RecipeDetails.create(list.selectedRecipe());

      list.selectedRecipe.subscribe(function (recipe) {
        details.update(recipe);
      });

      ko.applyBindings(list, document.querySelector('#recipe-list'));
      ko.applyBindings(details, document.querySelector('#recipe-details'));

    }).fail(function () {
      alert('No recipes for you!');
    });
  });

}(window.jQuery, window.ko,
  window.InputList, window.RecipeList,
  window.RecipeDetails));